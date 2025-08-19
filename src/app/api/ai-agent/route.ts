import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { PrismaClient } from '@/generated/prisma'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'Service temporairement indisponible' },
        { status: 503 }
      )
    }

    const { message, courseId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get course data for context
    let courseContext = ''
    if (courseId) {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          details: {
            include: {
              modules: true,
              instructors: true,
              skills: true,
              testimonials: true,
            },
          },
        },
      })

      if (course) {
        courseContext = `
Course Context:
- Course: ${course.label}
- Description: ${course.description}
${course.details ? `
- Full Title: ${course.details.fullTitle}
- Subtitle: ${course.details.subtitle}
- Level: ${course.details.level || 'Non spécifié'}
- Experience Required: ${course.details.experienceRequired || 'Non spécifié'}
- Schedule: ${course.details.schedule || 'Non spécifié'}
- Duration: ${course.details.scheduleDuration || 'Non spécifié'}
- Flexibility: ${course.details.scheduleFlexibility || 'Non spécifié'}
- Enrollment Count: ${course.details.enrollmentCount || 0}
- Rating: ${course.details.rating || 'Non noté'}
- Review Count: ${course.details.reviewCount || 0}

Modules (${course.details.modules.length}):
${course.details.modules.map(m => `- ${m.title}: ${m.description}`).join('\n')}

Skills Taught:
${course.details.skills.map(s => `- ${s.name}`).join('\n')}

Instructors:
${course.details.instructors.map(i => `- ${i.name} (${i.title})`).join('\n')}
` : ''}
        `
      }
    } else {
      // Get all courses for general queries
      const courses = await prisma.course.findMany({
        include: {
          details: true,
        },
      })

      courseContext = `
Available Courses at Worketyamo:
${courses.map(course => `
- ${course.label}: ${course.description}
${course.details ? `  Level: ${course.details.level || 'Non spécifié'}` : ''}
`).join('')}
      `
    }

    const systemPrompt = `Tu es l'assistant IA de Worketyamo, un accélérateur de talents tech français. Tu es un expert en formation technologique et tu aides les étudiants potentiels à comprendre nos programmes.

À propos de Worketyamo:
- Nous sommes un accélérateur de talents tech français
- Nous proposons des bootcamps et formations techniques intensives
- Notre mission est de former les talents tech de demain
- Nous couvrons des domaines comme AWS, UX/UI, DevOps, IA, Cybersécurité, et plus
- Nos formations sont reconnues par l'industrie et orientées pratique

${courseContext}

Instructions:
1. Réponds toujours en français de manière professionnelle et bienveillante
2. Utilise les informations des cours disponibles pour répondre précisément
3. Si tu ne connais pas une information spécifique, recommande de contacter l'équipe Worketyamo
4. Encourage l'inscription et mets en avant les bénéfices de nos formations
5. Adapte ton niveau de détail selon la question posée
6. Sois enthousiaste concernant les opportunités tech et l'apprentissage

Réponds de façon naturelle et engageante, comme un conseiller pédagogique expert.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu traiter votre demande.'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI Agent Error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}