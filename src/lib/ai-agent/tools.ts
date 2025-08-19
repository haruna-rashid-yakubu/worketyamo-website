// AI Agent Tools for database operations and course assistance
import { prisma } from '@/lib/prisma';
import { AgentTool, CourseData } from './types';

// Course Information Tool
export const getCourseInfoTool: AgentTool = {
  name: 'get_course_info',
  description: 'Retrieves detailed information about a specific course including modules, instructors, and requirements',
  parameters: {
    type: 'object',
    properties: {
      courseId: {
        type: 'string',
        description: 'The ID of the course to retrieve information for'
      }
    },
    required: ['courseId']
  },
  handler: async ({ courseId }: { courseId: string }) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          details: {
            include: {
              modules: {
                orderBy: { order: 'asc' }
              },
              instructors: true,
              skills: {
                orderBy: { order: 'asc' }
              },
              testimonials: true
            }
          }
        }
      });

      if (!course || !course.details) {
        throw new Error(`Course with ID ${courseId} not found`);
      }

      const courseData: CourseData = {
        id: course.id,
        label: course.label,
        fullTitle: course.details.fullTitle,
        description: course.description,
        level: course.details.level || undefined,
        duration: course.details.scheduleDuration || undefined,
        schedule: course.details.schedule || undefined,
        modules: course.details.modules.map(module => ({
          title: module.title,
          description: module.description,
          topics: module.topics ? JSON.parse(module.topics) : []
        })),
        instructors: course.details.instructors.map(instructor => ({
          name: instructor.name,
          title: instructor.title,
          experience: `${instructor.courses || 0} courses, ${instructor.learners || 0} students`
        })),
        skills: course.details.skills.map(skill => ({
          name: skill.name,
          category: 'technical' // Default category
        })),
        testimonials: course.details.testimonials.map(testimonial => ({
          name: testimonial.name,
          text: testimonial.text,
          rating: testimonial.stars || 5
        })),
        certifications: [
          ...(course.details.shareable ? [{
            name: 'Certificat LinkedIn',
            type: 'professional',
            provider: 'Worketyamo'
          }] : []),
          ...(course.details.industryRecognized ? [{
            name: 'Certification Industrie',
            type: 'industry',
            provider: 'Industry Partners'
          }] : [])
        ]
      };

      return courseData;
    } catch (error) {
      console.error('Error fetching course info:', error);
      throw new Error(`Failed to retrieve course information: ${error}`);
    }
  }
};

// All Courses Tool
export const getAllCoursesTool: AgentTool = {
  name: 'get_all_courses',
  description: 'Retrieves a list of all available courses with basic information',
  parameters: {
    type: 'object',
    properties: {},
    required: []
  },
  handler: async () => {
    try {
      const courses = await prisma.course.findMany({
        include: {
          details: true
        }
      });

      return courses.map(course => ({
        id: course.id,
        label: course.label,
        description: course.description,
        level: course.details?.level,
        duration: course.details?.scheduleDuration,
        enrollmentCount: course.details?.enrollmentCount,
        rating: course.details?.rating
      }));
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw new Error(`Failed to retrieve courses list: ${error}`);
    }
  }
};

// Search Courses Tool
export const searchCoursesTool: AgentTool = {
  name: 'search_courses',
  description: 'Searches for courses based on keywords, skills, or topics',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query - can be keywords, technology names, or topics'
      },
      level: {
        type: 'string',
        description: 'Filter by difficulty level (beginner, intermediate, advanced)',
        enum: ['beginner', 'intermediate', 'advanced']
      }
    },
    required: ['query']
  },
  handler: async ({ query, level }: { query: string; level?: string }) => {
    try {
      const courses = await prisma.course.findMany({
        where: {
          OR: [
            { label: { contains: query } },
            { description: { contains: query } },
            {
              details: {
                OR: [
                  { fullTitle: { contains: query } },
                  { subtitle: { contains: query } },
                  ...(level ? [{ level: { contains: level } }] : [])
                ]
              }
            }
          ]
        },
        include: {
          details: {
            include: {
              skills: true,
              modules: true
            }
          }
        }
      });

      return courses.map(course => ({
        id: course.id,
        label: course.label,
        description: course.description,
        relevanceScore: calculateRelevance(course, query),
        matchedSkills: course.details?.skills
          .filter(skill => skill.name.toLowerCase().includes(query.toLowerCase()))
          .map(skill => skill.name) || []
      }));
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error(`Failed to search courses: ${error}`);
    }
  }
};

// Registration Tool
export const createRegistrationTool: AgentTool = {
  name: 'create_registration',
  description: 'Creates a new course registration for a user',
  parameters: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        description: 'User first name'
      },
      lastName: {
        type: 'string',
        description: 'User last name'
      },
      email: {
        type: 'string',
        description: 'User email address'
      },
      phone: {
        type: 'string',
        description: 'User phone number'
      },
      courseId: {
        type: 'string',
        description: 'ID of the course to register for'
      },
      whatsapp: {
        type: 'string',
        description: 'WhatsApp number (optional)'
      }
    },
    required: ['firstName', 'lastName', 'email', 'phone', 'courseId']
  },
  handler: async (params: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    courseId: string;
    whatsapp?: string;
  }) => {
    try {
      // First verify the course exists
      const course = await prisma.course.findUnique({
        where: { id: params.courseId }
      });

      if (!course) {
        throw new Error(`Course with ID ${params.courseId} not found`);
      }

      const registration = await prisma.registration.create({
        data: {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          phone: params.phone,
          whatsapp: params.whatsapp,
          courseId: params.courseId,
          courseTitle: course.label
        }
      });

      return {
        success: true,
        registrationId: registration.id,
        message: `Registration successful for ${course.label}`,
        courseTitle: course.label
      };
    } catch (error) {
      console.error('Error creating registration:', error);
      throw new Error(`Failed to create registration: ${error}`);
    }
  }
};

// Prerequisites Check Tool
export const checkPrerequisitesTool: AgentTool = {
  name: 'check_prerequisites',
  description: 'Analyzes user background and recommends if they meet course prerequisites',
  parameters: {
    type: 'object',
    properties: {
      courseId: {
        type: 'string',
        description: 'Course ID to check prerequisites for'
      },
      userExperience: {
        type: 'string',
        description: 'User description of their background and experience'
      },
      currentSkills: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of user current skills'
      }
    },
    required: ['courseId', 'userExperience']
  },
  handler: async ({ courseId, userExperience, currentSkills = [] }: {
    courseId: string;
    userExperience: string;
    currentSkills?: string[];
  }) => {
    try {
      const course = await getCourseInfoTool.handler({ courseId });
      
      // Simple prerequisite analysis based on course level and user experience
      const experience = userExperience.toLowerCase();
      const hasRelevantExperience = currentSkills.some(skill => 
        course.skills.some((courseSkill: any) => 
          courseSkill.name.toLowerCase().includes(skill.toLowerCase())
        )
      );

      let recommendation = 'suitable';
      let confidence = 0.8;
      let notes: string[] = [];

      if (course.level === 'Débutant' || course.level?.includes('Beginner')) {
        recommendation = 'excellent_fit';
        confidence = 0.95;
        notes.push('Ce cours est parfait pour débuter dans ce domaine');
      } else if (course.level === 'Avancé' || course.level?.includes('Advanced')) {
        if (!hasRelevantExperience && !experience.includes('expérience') && !experience.includes('ans')) {
          recommendation = 'challenging';
          confidence = 0.6;
          notes.push('Ce cours avancé pourrait être difficile sans expérience préalable');
        }
      }

      if (hasRelevantExperience) {
        confidence += 0.1;
        notes.push('Vos compétences actuelles sont pertinentes pour ce cours');
      }

      return {
        courseId,
        recommendation,
        confidence: Math.min(confidence, 1.0),
        notes,
        suggestedPreparation: course.level === 'Avancé' && !hasRelevantExperience 
          ? ['Acquérir des bases dans le domaine', 'Consulter la documentation officielle']
          : []
      };
    } catch (error) {
      console.error('Error checking prerequisites:', error);
      throw new Error(`Failed to check prerequisites: ${error}`);
    }
  }
};

// Helper function to calculate course relevance
function calculateRelevance(course: any, query: string): number {
  const queryLower = query.toLowerCase();
  let score = 0;

  // Label match (highest weight)
  if (course.label.toLowerCase().includes(queryLower)) score += 10;
  
  // Description match
  if (course.description.toLowerCase().includes(queryLower)) score += 5;
  
  // Skills match
  const skillMatches = course.details?.skills?.filter((skill: any) => 
    skill.name.toLowerCase().includes(queryLower)
  ).length || 0;
  score += skillMatches * 3;

  // Module content match
  const moduleMatches = course.details?.modules?.filter((module: any) => 
    module.title.toLowerCase().includes(queryLower) ||
    module.description.toLowerCase().includes(queryLower)
  ).length || 0;
  score += moduleMatches * 2;

  return score;
}

// Export all tools
export const agentTools: AgentTool[] = [
  getCourseInfoTool,
  getAllCoursesTool,
  searchCoursesTool,
  createRegistrationTool,
  checkPrerequisitesTool
];