import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/auth-check';

export async function GET() {
  const authError = await checkAdminAuth();
  if (authError) return authError;

  try {
    const courses = await prisma.course.findMany({
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

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des cours' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await checkAdminAuth();
  if (authError) return authError;

  try {
    const data = await request.json();
    
    const course = await prisma.course.create({
      data: {
        id: data.id,
        label: data.label,
        description: data.description,
        backgroundColor: data.backgroundColor,
        iconUrl: data.iconUrl,
        details: data.details ? {
          create: {
            id: data.id,
            fullTitle: data.details.fullTitle,
            subtitle: data.details.subtitle,
            backgroundGradient: data.details.backgroundGradient,
            enrollmentCount: data.details.enrollmentCount,
            rating: data.details.rating,
            reviewCount: data.details.reviewCount,
            level: data.details.level,
            experienceRequired: data.details.experienceRequired,
            schedule: data.details.schedule,
            scheduleDuration: data.details.scheduleDuration,
            scheduleFlexibility: data.details.scheduleFlexibility,
            shareable: data.details.shareable ?? false,
            shareableText: data.details.shareableText,
            industryRecognized: data.details.industryRecognized ?? false,
            industryRecognizedText: data.details.industryRecognizedText,
            modules: data.details.modules ? {
              create: data.details.modules.map((module: any, index: number) => ({
                order: index,
                title: module.title,
                description: module.description,
                detailedContent: module.detailedContent,
                topics: module.topics ? JSON.stringify(module.topics) : null,
              }))
            } : undefined,
            instructors: data.details.instructors ? {
              create: data.details.instructors.map((instructor: any) => ({
                name: instructor.name,
                title: instructor.title,
                imageUrl: instructor.imageUrl,
                courses: instructor.courses,
                learners: instructor.learners,
              }))
            } : undefined,
            skills: data.details.skills ? {
              create: data.details.skills.map((skill: any, index: number) => ({
                order: index,
                name: skill.name,
                iconUrl: skill.iconUrl,
              }))
            } : undefined,
            testimonials: data.details.testimonials ? {
              create: data.details.testimonials.map((testimonial: any) => ({
                name: testimonial.name,
                role: testimonial.role,
                imageUrl: testimonial.imageUrl,
                text: testimonial.text,
                stars: testimonial.stars,
              }))
            } : undefined,
          }
        } : undefined
      },
      include: {
        details: {
          include: {
            modules: { orderBy: { order: 'asc' } },
            instructors: true,
            skills: { orderBy: { order: 'asc' } },
            testimonials: true
          }
        }
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du cours' },
      { status: 500 }
    );
  }
}