import { prisma } from './prisma';

export interface CourseWithTranslations {
  id: string;
  backgroundColor?: string | null;
  iconUrl?: string | null;
  label: string;
  description: string;
}

export interface CourseDetailWithTranslations {
  id: string;
  label: string;
  description: string;
  backgroundColor?: string | null;
  iconUrl?: string | null;
  backgroundGradient?: string | null;
  enrollmentCount?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  level?: string | null;
  experienceRequired?: string | null;
  schedule?: string | null;
  scheduleDuration?: string | null;
  scheduleFlexibility?: string | null;
  shareable: boolean;
  industryRecognized: boolean;
  fullTitle: string;
  subtitle: string;
  shareableText?: string | null;
  industryRecognizedText?: string | null;
  modules: CourseModuleWithTranslations[];
  instructors: CourseInstructorData[];
  skills: CourseSkillWithTranslations[];
  testimonials: CourseTestimonialData[];
  languages: string[];
}

export interface CourseModuleWithTranslations {
  id: string;
  order: number;
  title: string;
  description: string;
  detailedContent?: string | null;
  topics: string[];
}

export interface CourseSkillWithTranslations {
  id: string;
  order: number;
  iconUrl?: string | null;
  name: string;
}

export interface CourseInstructorData {
  id: string;
  name: string;
  title: string;
  imageUrl?: string | null;
  courses?: number | null;
  learners?: number | null;
}

export interface CourseTestimonialData {
  id: string;
  name: string;
  role?: string | null;
  imageUrl?: string | null;
  text: string;
  stars?: number | null;
}

export async function getCourses(): Promise<CourseWithTranslations[]> {
  const courses = await prisma.course.findMany();

  return courses.map(course => ({
    id: course.id,
    backgroundColor: course.backgroundColor,
    iconUrl: course.iconUrl,
    label: course.label,
    description: course.description,
  }));
}

export async function getCourseDetailById(courseId: string): Promise<CourseDetailWithTranslations | null> {
  const courseDetail = await prisma.courseDetail.findUnique({
    where: { id: courseId },
    include: {
      course: true, // Include the basic course information
      modules: {
        orderBy: { order: 'asc' },
      },
      instructors: true,
      skills: {
        orderBy: { order: 'asc' },
      },
      testimonials: true,
    },
  });

  if (!courseDetail) {
    return null;
  }

  return {
    id: courseDetail.id,
    label: courseDetail.course.label,
    description: courseDetail.course.description,
    backgroundColor: courseDetail.course.backgroundColor,
    iconUrl: courseDetail.course.iconUrl,
    backgroundGradient: courseDetail.backgroundGradient,
    enrollmentCount: courseDetail.enrollmentCount,
    rating: courseDetail.rating,
    reviewCount: courseDetail.reviewCount,
    level: courseDetail.level,
    experienceRequired: courseDetail.experienceRequired,
    schedule: courseDetail.schedule,
    scheduleDuration: courseDetail.scheduleDuration,
    scheduleFlexibility: courseDetail.scheduleFlexibility,
    shareable: courseDetail.shareable,
    industryRecognized: courseDetail.industryRecognized,
    fullTitle: courseDetail.fullTitle,
    subtitle: courseDetail.subtitle,
    shareableText: courseDetail.shareableText,
    industryRecognizedText: courseDetail.industryRecognizedText,
    modules: courseDetail.modules.map(module => ({
      id: module.id,
      order: module.order,
      title: module.title,
      description: module.description,
      detailedContent: module.detailedContent,
      topics: module.topics ? JSON.parse(module.topics) : [],
    })),
    instructors: courseDetail.instructors,
    skills: courseDetail.skills.map(skill => ({
      id: skill.id,
      order: skill.order,
      iconUrl: skill.iconUrl,
      name: skill.name,
    })),
    testimonials: courseDetail.testimonials,
    languages: ['Français'], // Static for now
  };
}