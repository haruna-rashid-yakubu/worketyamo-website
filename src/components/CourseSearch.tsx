'use client';

import React, { useState, useRef, useEffect } from 'react';
import { courses, Course } from '../data/courses';
import { Command } from 'cmdk';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CourseSearch() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  const filteredCourses = searchQuery 
    ? courses.filter(course => 
        course.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : courses;

  // Prevent scrolling when search dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    }
  }, [open]);

  // Handle keyboard shortcuts (⌘K to open, Escape to close)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Close with Escape key
      if (e.key === 'Escape') setOpen(false);
      
      // Open with Command+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        setOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setOpen]);

  const handleCourseClick = (course: Course) => {
    // Close search dialog
    setOpen(false);
    // Navigation will be handled by Next.js Link component
  };

  return (
    <div className="w-full max-w-screen md:max-w-full md:mx-auto relative">
      {/* Search Trigger Button */}
      {!open && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full px-4 py-3 bg-[#333333] text-white rounded-md focus:outline-none cursor-pointer font-body flex items-center"
          >
            <span className="flex-1 text-left">Recherche de cours...</span>
            <span className="text-gray-400">⌘K</span>
          </button>
        </motion.div>
      )}

      {/* Course Buttons (when not in search mode) */}
      {!open && (
        <div className="flex w-full flex-wrap md:items-center md:justify-center gap-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="w-fit sm:w-1/2 md:w-auto"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, // Longer delay between items for more noticeable effect
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <Link 
                href={`/course/${course.id}`}
                className="flex w-full md:w-auto items-center text-sm md:text-base gap-2 px-2 py-1.5 rounded-md text-white transition-all font-heading justify-start"
                style={{ backgroundColor: course.backgroundColor || '#333333' }}
              >
                {/* Icon placeholder - you'll insert your own logos here */}
                <div className="w-6 h-6 flex-shrink-0 bg-transparent flex items-center justify-center rounded-sm overflow-hidden">
                  {course.iconUrl ? (
                    <img 
                      src={course.iconUrl} 
                      alt={`${course.label} icon`} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded bg-white/20 flex items-center justify-center text-white text-xs">
                      {course.label.charAt(0)}
                    </div>
                  )}
                </div>
                <span>{course.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* CMDK Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/70 backdrop-blur-3xl"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Dialog */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div 
                className="relative z-20 bg-[#21262D] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#333]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, type: "spring", damping: 20 }}
              >
                <Command 
                  className="overflow-hidden"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  filter={(value, search, keywords) => {
                    // Don't filter when no search query - show all courses
                    if (!search) return 1
                    
                    // Otherwise use default filtering
                    const label = value.toLowerCase()
                    const query = search.toLowerCase()
                    return label.includes(query) ? 1 : 0
                  }}
                >
                  <div className="p-4 flex items-center justify-between relative h-16">
                    <Command.Input 
                      placeholder="Search course"
                      className="w-full pl-2 pr-10 py-2 bg-transparent text-white border-none focus:outline-none font-body text-lg"
                      autoFocus
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white flex items-center justify-center"
                      onClick={() => setOpen(false)}
                      aria-label="Close dialog"
                    >
                      <X className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>

                  <Command.List className="max-h-[60vh] overflow-y-auto px-2 pb-2">
                    {loading && <Command.Loading>Loading courses...</Command.Loading>}

                    <Command.Empty className="p-6 text-center text-gray-400 font-body">
                      No courses found for "{searchQuery}"
                    </Command.Empty>
                    
                    <div className="pl-4 pr-0 py-2 text-sm text-gray-400 font-body text-left">
                      Suggestion
                    </div>

                    <Command.Group className="mb-2">
                      {/* Debug courses count */}
                      {/* <div className="text-white">Courses: {filteredCourses.length}</div> */}
                      {courses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.03,
                            duration: 0.2
                          }}
                        >
                          <Command.Item
                            value={course.id}
                            className="px-4 py-2 hover:bg-[#333] rounded-sm flex items-center justify-between cursor-pointer my-1 aria-selected:bg-[#333]"
                            onSelect={() => {
                              setOpen(false);
                              window.location.href = `/course/${course.id}`;
                            }}
                          >
                            <div className="text-white font-heading text-sm md:text-lg">{course.label}</div>
                            <div className="flex items-center justify-center w-8 h-8 rounded overflow-hidden">
                              {course.iconUrl ? (
                                <img 
                                  src={course.iconUrl} 
                                  alt={`${course.label} icon`} 
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs">
                                  {course.label.charAt(0)}
                                </div>
                              )}
                            </div>
                          </Command.Item>
                        </motion.div>
                      ))}
                    </Command.Group>
                  </Command.List>
                </Command>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
