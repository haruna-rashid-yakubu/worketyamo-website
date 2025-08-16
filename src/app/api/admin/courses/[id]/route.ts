import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
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

    if (!course) {
      return NextResponse.json(
        { error: 'Cours non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du cours' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // First, delete existing related data if updating details
    if (data.details) {
      await prisma.courseTestimonial.deleteMany({
        where: { courseDetailId: params.id }
      });
      await prisma.courseSkill.deleteMany({
        where: { courseDetailId: params.id }
      });
      await prisma.courseInstructor.deleteMany({
        where: { courseDetailId: params.id }
      });
      await prisma.courseModule.deleteMany({
        where: { courseDetailId: params.id }
      });
    }

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        label: data.label,
        description: data.description,
        backgroundColor: data.backgroundColor,
        iconUrl: data.iconUrl,
        details: data.details ? {
          upsert: {
            create: {
              id: params.id,
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
            },
            update: {
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
            }
          }
        } : undefined
      },
      include: {
        details: true
      }
    });

    // Recreate related data
    if (data.details) {
      if (data.details.modules) {
        await prisma.courseModule.createMany({
          data: data.details.modules.map((module: any, index: number) => ({
            courseDetailId: params.id,
            order: index,
            title: module.title,
            description: module.description,
            detailedContent: module.detailedContent,
            topics: module.topics ? JSON.stringify(module.topics) : null,
          }))
        });
      }

      if (data.details.instructors) {
        await prisma.courseInstructor.createMany({
          data: data.details.instructors.map((instructor: any) => ({
            courseDetailId: params.id,
            name: instructor.name,
            title: instructor.title,
            imageUrl: instructor.imageUrl,
            courses: instructor.courses,
            learners: instructor.learners,
          }))
        });
      }

      if (data.details.skills) {
        await prisma.courseSkill.createMany({
          data: data.details.skills.map((skill: any, index: number) => ({
            courseDetailId: params.id,
            order: index,
            name: skill.name,
            iconUrl: skill.iconUrl,
          }))
        });
      }

      if (data.details.testimonials) {
        await prisma.courseTestimonial.createMany({
          data: data.details.testimonials.map((testimonial: any) => ({
            courseDetailId: params.id,
            name: testimonial.name,
            role: testimonial.role,
            imageUrl: testimonial.imageUrl,
            text: testimonial.text,
            stars: testimonial.stars,
          }))
        });
      }
    }

    // Fetch updated course with all relations
    const updatedCourse = await prisma.course.findUnique({
      where: { id: params.id },
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

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du cours' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du cours' },
      { status: 500 }
    );
  }
}