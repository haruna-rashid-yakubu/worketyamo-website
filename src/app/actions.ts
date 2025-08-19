'use server';

import { getCourses, getCourseDetailById } from '@/lib/courses';
import { prisma } from '@/lib/prisma';

export async function getCoursesAction() {
  try {
    console.log('getCoursesAction: Starting to fetch courses');
    const courses = await getCourses();
    console.log('getCoursesAction: Successfully fetched', courses.length, 'courses');
    return courses;
  } catch (error) {
    console.error('getCoursesAction: Error fetching courses:', error);
    // Return empty array instead of throwing to prevent 500 error
    return [];
  }
}

export async function getCourseDetailAction(courseId: string) {
  try {
    console.log('getCourseDetailAction: Fetching course detail for ID:', courseId);
    const courseDetail = await getCourseDetailById(courseId);
    console.log('getCourseDetailAction: Successfully fetched course detail:', courseDetail?.id);
    return courseDetail;
  } catch (error) {
    console.error('getCourseDetailAction: Error fetching course detail:', error);
    return null;
  }
}

export async function createRegistrationAction(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  courseId: string;
  courseTitle: string;
}) {
  try {
    const registration = await prisma.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        courseId: data.courseId,
        courseTitle: data.courseTitle,
      },
    });
    
    return { success: true, registration };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' 
    };
  }
}