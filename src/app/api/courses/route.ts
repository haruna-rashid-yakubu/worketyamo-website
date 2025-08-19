import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/courses';

export async function GET() {
  try {
    console.log('API: Starting to fetch courses');
    const courses = await getCourses();
    console.log('API: Successfully fetched', courses.length, 'courses');
    
    return NextResponse.json({ 
      success: true,
      courses,
      count: courses.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API: Error fetching courses:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}