'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface CourseFormData {
  id: string;
  label: string;
  description: string;
  backgroundColor?: string;
  iconUrl?: string;
  details?: {
    fullTitle: string;
    subtitle: string;
    backgroundGradient?: string;
    enrollmentCount?: number;
    rating?: number;
    reviewCount?: number;
    level?: string;
    experienceRequired?: string;
    schedule?: string;
    scheduleDuration?: string;
    scheduleFlexibility?: string;
    shareable?: boolean;
    shareableText?: string;
    industryRecognized?: boolean;
    industryRecognizedText?: string;
    modules: Array<{
      title: string;
      description: string;
      detailedContent?: string;
      topics?: string[];
    }>;
    instructors: Array<{
      name: string;
      title: string;
      imageUrl?: string;
      courses?: number;
      learners?: number;
    }>;
    skills: Array<{
      name: string;
      iconUrl?: string;
    }>;
    testimonials: Array<{
      name: string;
      role?: string;
      imageUrl?: string;
      text: string;
      stars?: number;
    }>;
  };
}

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  isEdit?: boolean;
}

export default function CourseForm({ initialData, isEdit = false }: CourseFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    id: initialData?.id || '',
    label: initialData?.label || '',
    description: initialData?.description || '',
    backgroundColor: initialData?.backgroundColor || '#3B82F6',
    iconUrl: initialData?.iconUrl || '',
    details: {
      fullTitle: initialData?.details?.fullTitle || '',
      subtitle: initialData?.details?.subtitle || '',
      backgroundGradient: initialData?.details?.backgroundGradient || 'from-blue-600 to-purple-600',
      enrollmentCount: initialData?.details?.enrollmentCount || 0,
      rating: initialData?.details?.rating || 5,
      reviewCount: initialData?.details?.reviewCount || 0,
      level: initialData?.details?.level || 'Débutant',
      experienceRequired: initialData?.details?.experienceRequired || 'Aucune',
      schedule: initialData?.details?.schedule || '3 mois',
      scheduleDuration: initialData?.details?.scheduleDuration || '20h/semaine',
      scheduleFlexibility: initialData?.details?.scheduleFlexibility || 'Flexible',
      shareable: initialData?.details?.shareable || false,
      shareableText: initialData?.details?.shareableText || '',
      industryRecognized: initialData?.details?.industryRecognized || false,
      industryRecognizedText: initialData?.details?.industryRecognizedText || '',
      modules: initialData?.details?.modules || [{ title: '', description: '', detailedContent: '', topics: [] }],
      instructors: initialData?.details?.instructors || [{ name: '', title: '', imageUrl: '', courses: 0, learners: 0 }],
      skills: initialData?.details?.skills || [{ name: '', iconUrl: '' }],
      testimonials: initialData?.details?.testimonials || [{ name: '', role: '', imageUrl: '', text: '', stars: 5 }],
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/admin/courses/${formData.id}` : '/api/admin/courses';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/courses');
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du cours');
    } finally {
      setSaving(false);
    }
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        modules: [...prev.details!.modules, { title: '', description: '', detailedContent: '', topics: [] }]
      }
    }));
  };

  const removeModule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        modules: prev.details!.modules.filter((_, i) => i !== index)
      }
    }));
  };

  const addInstructor = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        instructors: [...prev.details!.instructors, { name: '', title: '', imageUrl: '', courses: 0, learners: 0 }]
      }
    }));
  };

  const removeInstructor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        instructors: prev.details!.instructors.filter((_, i) => i !== index)
      }
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        skills: [...prev.details!.skills, { name: '', iconUrl: '' }]
      }
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        skills: prev.details!.skills.filter((_, i) => i !== index)
      }
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        testimonials: [...prev.details!.testimonials, { name: '', role: '', imageUrl: '', text: '', stars: 5 }]
      }
    }));
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details!,
        testimonials: prev.details!.testimonials.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Modifier le cours' : 'Nouveau cours'}
        </h1>
        <button
          type="button"
          onClick={() => router.push('/admin/courses')}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Info */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Informations de base</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID du cours *
              </label>
              <input
                type="text"
                required
                disabled={isEdit}
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du cours *
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur de fond
              </label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l&apos;icône
              </label>
              <input
                type="url"
                value={formData.iconUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Détails du cours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre complet
              </label>
              <input
                type="text"
                value={formData.details?.fullTitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, fullTitle: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sous-titre
              </label>
              <input
                type="text"
                value={formData.details?.subtitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre d&apos;inscrits
              </label>
              <input
                type="number"
                value={formData.details?.enrollmentCount}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, enrollmentCount: parseInt(e.target.value) || 0 }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note (sur 5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.details?.rating}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, rating: parseFloat(e.target.value) || 0 }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niveau
              </label>
              <select
                value={formData.details?.level}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, level: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <input
                type="text"
                value={formData.details?.schedule}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  details: { ...prev.details!, schedule: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Modules</h2>
            <button
              type="button"
              onClick={addModule}
              className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </button>
          </div>
          {formData.details?.modules.map((module, index) => (
            <div key={index} className="border rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Module {index + 1}</h3>
                {formData.details!.modules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="text-red-700 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => {
                      const newModules = [...formData.details!.modules];
                      newModules[index].title = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        details: { ...prev.details!, modules: newModules }
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={module.description}
                    onChange={(e) => {
                      const newModules = [...formData.details!.modules];
                      newModules[index].description = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        details: { ...prev.details!, modules: newModules }
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push('/admin/courses')}
            className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
}