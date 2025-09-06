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

// Course Comparison Tool
export const compareCoursesTool: AgentTool = {
  name: 'compare_courses',
  description: 'Compares two or more courses to help users make informed decisions',
  parameters: {
    type: 'object',
    properties: {
      courseIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of course IDs to compare'
      },
      criteria: {
        type: 'array',
        items: { type: 'string' },
        description: 'Comparison criteria (duration, level, skills, etc.)'
      }
    },
    required: ['courseIds']
  },
  handler: async ({ courseIds, criteria = [] }: { courseIds: string[]; criteria?: string[] }) => {
    try {
      const courses = await Promise.all(
        courseIds.map(async (id) => {
          try {
            return await getCourseInfoTool.handler({ courseId: id });
          } catch {
            return null;
          }
        })
      );

      const validCourses = courses.filter(Boolean);
      
      if (validCourses.length < 2) {
        throw new Error('Insufficient courses found for comparison');
      }

      return {
        courses: validCourses,
        comparison: {
          duration: validCourses.map(c => ({ course: c.label, duration: c.duration })),
          level: validCourses.map(c => ({ course: c.label, level: c.level })),
          skills: validCourses.map(c => ({ course: c.label, skillsCount: c.skills.length })),
          modules: validCourses.map(c => ({ course: c.label, moduleCount: c.modules.length })),
          instructors: validCourses.map(c => ({ course: c.label, instructorCount: c.instructors.length }))
        },
        recommendations: generateComparisonRecommendations(validCourses)
      };
    } catch (error) {
      console.error('Error comparing courses:', error);
      throw new Error(`Failed to compare courses: ${error}`);
    }
  }
};

// Career Path Recommendation Tool
export const careerPathTool: AgentTool = {
  name: 'recommend_career_path',
  description: 'Provides personalized career path recommendations based on user goals and current course',
  parameters: {
    type: 'object',
    properties: {
      currentCourseId: {
        type: 'string',
        description: 'The course the user is currently viewing'
      },
      careerGoals: {
        type: 'string',
        description: 'User description of their career goals and aspirations'
      },
      experience: {
        type: 'string',
        description: 'User current experience level and background'
      }
    },
    required: ['currentCourseId', 'careerGoals']
  },
  handler: async ({ currentCourseId, careerGoals, experience = '' }: {
    currentCourseId: string;
    careerGoals: string;
    experience?: string;
  }) => {
    try {
      const currentCourse = await getCourseInfoTool.handler({ courseId: currentCourseId });
      const allCourses = await getAllCoursesTool.handler({});
      
      // Analyze career goals and recommend learning path
      const goals = careerGoals.toLowerCase();
      const exp = experience.toLowerCase();
      
      let recommendedPath: string[] = [];
      let timeEstimate = '6-12 mois';
      let careerOutcomes: string[] = [];
      
      // AI-powered path recommendations based on goals
      if (goals.includes('développeur') || goals.includes('programmeur')) {
        recommendedPath = ['python', 'github', 'aws'];
        careerOutcomes = ['Développeur Full-Stack', 'DevOps Engineer', 'Cloud Developer'];
        timeEstimate = '8-12 mois';
      } else if (goals.includes('design') || goals.includes('ux')) {
        recommendedPath = ['ux-ui', 'ai'];
        careerOutcomes = ['UX/UI Designer', 'Product Designer', 'AI-Enhanced Designer'];
        timeEstimate = '6-9 mois';
      } else if (goals.includes('sécurité') || goals.includes('cybersécurité')) {
        recommendedPath = ['burp-suite', 'aws', 'docker'];
        careerOutcomes = ['Security Analyst', 'Penetration Tester', 'Cloud Security Specialist'];
        timeEstimate = '10-15 mois';
      } else if (goals.includes('devops') || goals.includes('infrastructure')) {
        recommendedPath = ['docker', 'terraform', 'aws', 'github'];
        careerOutcomes = ['DevOps Engineer', 'Cloud Architect', 'Infrastructure Engineer'];
        timeEstimate = '12-18 mois';
      }
      
      return {
        currentCourse: currentCourse.label,
        recommendedLearningPath: recommendedPath,
        timeEstimate,
        careerOutcomes,
        nextSteps: generateNextSteps(currentCourse, recommendedPath),
        salaryEstimates: getSalaryEstimates(careerOutcomes)
      };
    } catch (error) {
      console.error('Error generating career path:', error);
      throw new Error(`Failed to generate career path: ${error}`);
    }
  }
};

// Helper functions
function generateComparisonRecommendations(courses: any[]): string[] {
  const recommendations = [];
  
  // Level-based recommendations
  const beginnerCourses = courses.filter(c => c.level?.includes('Débutant'));
  const advancedCourses = courses.filter(c => c.level?.includes('Avancé'));
  
  if (beginnerCourses.length > 0 && advancedCourses.length > 0) {
    recommendations.push('Commencez par les formations débutant avant de progresser vers les niveaux avancés');
  }
  
  // Duration-based recommendations
  const shortCourses = courses.filter(c => c.duration?.includes('semaines') || c.duration?.includes('week'));
  if (shortCourses.length > 0) {
    recommendations.push('Les formations courtes permettent une montée en compétences rapide');
  }
  
  return recommendations;
}

function generateNextSteps(currentCourse: any, recommendedPath: string[]): string[] {
  const steps = [`Terminer ${currentCourse.label} avec succès`];
  
  recommendedPath.forEach((courseId, index) => {
    if (index < 2) { // Only show next 2 steps
      steps.push(`Étape ${index + 2}: Formation ${courseId.toUpperCase()}`);
    }
  });
  
  steps.push('Construire un portfolio avec projets pratiques');
  steps.push('Recherche active d\'opportunités professionnelles');
  
  return steps;
}

function getSalaryEstimates(careerOutcomes: string[]): { [key: string]: string } {
  const salaryMap: { [key: string]: string } = {
    'Développeur Full-Stack': '45-65K€',
    'DevOps Engineer': '50-75K€',
    'Cloud Developer': '48-70K€',
    'UX/UI Designer': '40-60K€',
    'Product Designer': '45-68K€',
    'Security Analyst': '48-70K€',
    'Penetration Tester': '55-80K€',
    'Cloud Architect': '65-90K€'
  };
  
  const estimates: { [key: string]: string } = {};
  careerOutcomes.forEach(career => {
    if (salaryMap[career]) {
      estimates[career] = salaryMap[career];
    }
  });
  
  return estimates;
}

// Export all tools
export const agentTools: AgentTool[] = [
  getCourseInfoTool,
  getAllCoursesTool,
  searchCoursesTool,
  createRegistrationTool,
  checkPrerequisitesTool,
  compareCoursesTool,
  careerPathTool
];