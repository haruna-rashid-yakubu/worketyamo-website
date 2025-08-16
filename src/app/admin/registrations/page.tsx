'use client';

import { useState, useEffect } from 'react';
import { Download, Search, Filter, Calendar, Users, Mail, Phone, MessageCircle } from 'lucide-react';

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  courseId: string;
  courseTitle: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: string;
  label: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({
    courseId: '',
    startDate: '',
    endDate: '',
    search: ''
  });

  useEffect(() => {
    fetchCourses();
    fetchRegistrations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRegistrations();
  }, [filters.courseId, filters.startDate, filters.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.courseId) params.append('courseId', filters.courseId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await fetch(`/api/admin/registrations?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (filters.courseId) params.append('courseId', filters.courseId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await fetch(`/api/admin/registrations/export?${params.toString()}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inscriptions_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Erreur lors de l\'export');
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      reg.firstName.toLowerCase().includes(searchLower) ||
      reg.lastName.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.courseTitle.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inscriptions</h1>
          <p className="text-gray-600 mt-1">
            {filteredRegistrations.length} inscription{filteredRegistrations.length !== 1 ? 's' : ''}
            {filters.courseId || filters.startDate || filters.endDate || filters.search ? ' (filtrées)' : ''}
          </p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={exporting || filteredRegistrations.length === 0}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4 mr-2" />
          {exporting ? 'Export...' : 'Exporter CSV'}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{registrations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Aujourd&apos;hui</p>
              <p className="text-2xl font-semibold text-gray-900">
                {registrations.filter(r => new Date(r.createdAt).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avec email</p>
              <p className="text-2xl font-semibold text-gray-900">
                {registrations.filter(r => r.email).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avec WhatsApp</p>
              <p className="text-2xl font-semibold text-gray-900">
                {registrations.filter(r => r.whatsapp).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-800">Filtres:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={filters.courseId}
            onChange={(e) => setFilters(prev => ({ ...prev, courseId: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les cours</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.label}</option>
            ))}
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Date début"
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Date fin"
          />

          {(filters.courseId || filters.startDate || filters.endDate || filters.search) && (
            <button
              onClick={() => setFilters({ courseId: '', startDate: '', endDate: '', search: '' })}
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 underline font-medium"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d&apos;inscription
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {registration.firstName} {registration.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        ID: {registration.id.substring(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`mailto:${registration.email}`} className="hover:text-blue-700 underline">
                          {registration.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${registration.phone}`} className="hover:text-blue-700 underline">
                          {registration.phone}
                        </a>
                      </div>
                      {registration.whatsapp && (
                        <div className="flex items-center text-sm text-gray-900">
                          <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                          <a 
                            href={`https://wa.me/${registration.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-700 underline"
                          >
                            {registration.whatsapp}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {registration.courseTitle}
                      </div>
                      <div className="text-sm text-gray-600">
                        {registration.courseId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(registration.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRegistrations.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-2">
              {filters.search || filters.courseId || filters.startDate || filters.endDate
                ? 'Aucune inscription ne correspond aux filtres'
                : 'Aucune inscription trouvée'
              }
            </div>
            {(filters.search || filters.courseId || filters.startDate || filters.endDate) && (
              <button
                onClick={() => setFilters({ courseId: '', startDate: '', endDate: '', search: '' })}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}