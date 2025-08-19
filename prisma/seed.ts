import { PrismaClient } from '@prisma/client';
import { courses } from '../src/data/courses';
import { courseDetails } from '../src/data/detail';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.courseTestimonial.deleteMany();
  await prisma.courseSkill.deleteMany();
  await prisma.courseInstructor.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.courseDetail.deleteMany();
  await prisma.course.deleteMany();

  // Seed courses
  for (const course of courses) {
    await prisma.course.create({
      data: {
        id: course.id,
        label: course.label,
        description: course.description,
        backgroundColor: course.backgroundColor,
        iconUrl: course.iconUrl,
      }
    });
  }

  // Seed course details
  for (const [courseId, detail] of Object.entries(courseDetails)) {
    await prisma.courseDetail.create({
      data: {
        id: detail.id,
        fullTitle: detail.fullTitle,
        subtitle: detail.subtitle,
        backgroundGradient: detail.backgroundGradient,
        enrollmentCount: detail.enrollmentCount,
        rating: detail.rating,
        reviewCount: detail.reviewCount,
        level: detail.level,
        experienceRequired: detail.experienceRequired,
        schedule: detail.schedule,
        scheduleDuration: detail.scheduleDuration,
        scheduleFlexibility: detail.scheduleFlexibility,
        shareable: detail.shareable ?? false,
        shareableText: detail.shareableText,
        industryRecognized: detail.industryRecognized ?? false,
        industryRecognizedText: detail.industryRecognizedText,
      }
    });

    // Create modules
    for (const [moduleIndex, module] of detail.modules.entries()) {
      await prisma.courseModule.create({
        data: {
          courseDetailId: detail.id,
          order: moduleIndex,
          title: module.title,
          description: module.description,
          detailedContent: module.detailedContent,
          topics: module.topics ? JSON.stringify(module.topics) : null,
        }
      });
    }

    // Create instructors
    if (detail.instructors) {
      await prisma.courseInstructor.createMany({
        data: detail.instructors.map(instructor => ({
          courseDetailId: detail.id,
          name: instructor.name,
          title: instructor.title,
          imageUrl: instructor.imageUrl,
          courses: instructor.courses,
          learners: instructor.learners,
        }))
      });
    }

    // Create skills
    for (const [skillIndex, skill] of detail.skills.entries()) {
      await prisma.courseSkill.create({
        data: {
          courseDetailId: detail.id,
          order: skillIndex,
          name: skill.name,
          iconUrl: skill.iconUrl,
        }
      });
    }

    // Create testimonials
    if (detail.testimonials) {
      await prisma.courseTestimonial.createMany({
        data: detail.testimonials.map(testimonial => ({
          courseDetailId: detail.id,
          name: testimonial.name,
          role: testimonial.role,
          imageUrl: testimonial.imageUrl,
          text: testimonial.text,
          stars: testimonial.stars,
        }))
      });
    }

  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });