'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CourseForm from '@/components/admin/CourseForm';

export default function EditCoursePage() {
  const params = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
    }
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        
        // Transform the data to match the form structure
        const formattedData = {
          id: data.id,
          label: data.label,
          description: data.description,
          backgroundColor: data.backgroundColor,
          iconUrl: data.iconUrl,
          details: data.details ? {
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
            shareable: data.details.shareable,
            shareableText: data.details.shareableText,
            industryRecognized: data.details.industryRecognized,
            industryRecognizedText: data.details.industryRecognizedText,
            modules: data.details.modules?.map((module: any) => ({
              title: module.title,
              description: module.description,
              detailedContent: module.detailedContent,
              topics: module.topics ? JSON.parse(module.topics) : []
            })) || [],
            instructors: data.details.instructors?.map((instructor: any) => ({
              name: instructor.name,
              title: instructor.title,
              imageUrl: instructor.imageUrl,
              courses: instructor.courses,
              learners: instructor.learners
            })) || [],
            skills: data.details.skills?.map((skill: any) => ({
              name: skill.name,
              iconUrl: skill.iconUrl
            })) || [],
            testimonials: data.details.testimonials?.map((testimonial: any) => ({
              name: testimonial.name,
              role: testimonial.role,
              imageUrl: testimonial.imageUrl,
              text: testimonial.text,
              stars: testimonial.stars
            })) || []
          } : undefined
        };
        
        setCourseData(formattedData);
      } else {
        setError('Cours non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du cours:', error);
      setError('Erreur lors du chargement du cours');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <a
            href="/admin/courses"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retour à la liste des cours
          </a>
        </div>
      </div>
    );
  }

  return courseData ? <CourseForm initialData={courseData} isEdit={true} /> : null;
}