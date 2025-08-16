import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/auth-check';

export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let whereClause: any = {};

    if (courseId) {
      whereClause.courseId = courseId;
    }

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(endDate + 'T23:59:59.999Z');
      }
    }

    const registrations = await prisma.registration.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert to CSV format
    const headers = ['Prénom', 'Nom', 'Email', 'Téléphone', 'WhatsApp', 'Cours ID', 'Titre du cours', 'Date d\'inscription', 'Dernière mise à jour'];
    
    const csvData = [
      headers.join(','),
      ...registrations.map(reg => [
        `"${reg.firstName}"`,
        `"${reg.lastName}"`,
        `"${reg.email}"`,
        `"${reg.phone}"`,
        `"${reg.whatsapp || ''}"`,
        `"${reg.courseId}"`,
        `"${reg.courseTitle}"`,
        `"${reg.createdAt.toISOString()}"`,
        `"${reg.updatedAt.toISOString()}"`
      ].join(','))
    ].join('\n');

    const response = new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="inscriptions_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error exporting registrations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'export des inscriptions' },
      { status: 500 }
    );
  }
}