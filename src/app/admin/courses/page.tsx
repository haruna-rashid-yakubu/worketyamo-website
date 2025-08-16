'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react';

interface Course {
  id: string;
  label: string;
  description: string;
  backgroundColor?: string;
  iconUrl?: string;
  details?: {
    fullTitle: string;
    enrollmentCount?: number;
    rating?: number;
  };
}

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id));
      } else {
        alert('Erreur lors de la suppression du cours');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression du cours');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des cours</h1>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau cours
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscrits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {course.iconUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={course.iconUrl}
                          alt={course.label}
                          className="h-8 w-8 mr-3 rounded"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {course.label}
                        </div>
                        {course.details?.fullTitle && (
                          <div className="text-sm text-gray-600">
                            {course.details.fullTitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {course.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.details?.enrollmentCount ? `${course.details.enrollmentCount} étudiants` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.details?.rating ? `${course.details.rating}/5` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/course/${course.id}`}
                        className="text-blue-700 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
                        title="Voir le cours"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-50 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        disabled={deleting === course.id}
                        className="text-red-700 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Aucun cours trouvé</div>
            <Link
              href="/admin/courses/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer le premier cours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}