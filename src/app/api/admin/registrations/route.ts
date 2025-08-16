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

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des inscriptions' },
      { status: 500 }
    );
  }
}