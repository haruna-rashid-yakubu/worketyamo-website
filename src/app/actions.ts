'use server';

import { getCourses, getCourseDetailById } from '@/lib/courses';
import { prisma } from '@/lib/prisma';

export async function getCoursesAction() {
  return await getCourses();
}

export async function getCourseDetailAction(courseId: string) {
  return await getCourseDetailById(courseId);
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