'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCourseDetailById } from '@/data/detail';
import { courses } from '@/data/courses';
import { useParams } from 'next/navigation';
import { ArrowLeft, Images, Linkedin, Languages } from 'lucide-react';
import backsquare from '../../../../public/Images/icons/back-square.svg'

// Ensure we're exporting a proper React component

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  const courseDetail = getCourseDetailById(courseId);
  const course = courses.find(c => c.id === courseId);
  
  if (!courseDetail || !course) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4" 
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' }}
      >
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-8 rounded-lg max-w-lg text-center">
          <h1 className="text-2xl font-heading text-white mb-4">Cours introuvable</h1>
          <p className="text-gray-300 mb-6 font-body">Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-heading inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero section with simple background styling */}
      <div className="">
      <div 
        className="min-h-screen py-8 " 
        style={{ 
          background: courseDetail.backgroundGradient || 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' // Use course gradient or default
        }}
      >
        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-4">
              {/* Navigation */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors bg-[#2D2A2A]/70 px-2 py-2 rounded-md"
          >
            <Image alt="Back square" src={backsquare} width={24} height={24} className="mr-2 h-5 w-5" />
            <span className="font-body">Retour</span>
          </Link>
          <Image 
                   src="/Images/worketyamo.svg" 
                   alt="Worketyamo logo" 
                   width={200} 
                   height={40}
                   className='mb-20' 
                   priority
                 />
          </div>
        

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col items-start gap-8 max-w-full md:max-w-2xl">
              <div className="w-24 h-24">
                {course.iconUrl && (
                  <Image 
                    src={course.iconUrl} 
                    alt={course.label} 
                    width={96} 
                    height={96} 
                    className="w-full h-full object-contain"
                    priority
                  />
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading">{courseDetail.fullTitle}</h1>
                <p className="text-[#E9E9E9] mt-2 font-body">{courseDetail.subtitle}</p>
                
                <div className="mt-4">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-heading">
                    S'inscrire
                  </button>
                  <p className="text-sm text-[#E9E9E9] mt-2 font-body">{courseDetail.enrollmentCount?.toLocaleString()} déjà inscrits</p>
                </div>
              </div>
            </div>
          </header>

          {/* Course Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 bg-[#1a1a1a] p-4 md:px-12 md:py-6 rounded-lg ">

          <div className="bg-[#1a1a1a]/70 backdrop-blur-md  rounded-lg">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.schedule}</h1>
              <p className="text-sm text-gray-400 font-body">{courseDetail.scheduleDuration}</p>
              <p className="text-sm text-gray-400 font-body">{courseDetail.scheduleFlexibility}</p>
            </div>
            <div className="bg-[#1a1a1a]/70 backdrop-blur-md  rounded-lg">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.rating}</h1>
              <p className="text-sm text-gray-400 font-body">({courseDetail.reviewCount?.toLocaleString()} reviews)</p>
            </div>
            
            <div className="bg-[#1a1a1a]/70 backdrop-blur-md  rounded-lg">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.level}</h1>
              <p className="text-sm text-gray-400 font-body">{courseDetail.experienceRequired}</p>
            </div>
            
           
            
            <div className="bg-[#1a1a1a]/70 backdrop-blur-md  rounded-lg">
              <h1 className="mb-1 text-base text-gray-300 font-heading">Langues</h1>
              <p className="text-sm text-gray-400 font-body">
                {courseDetail.languages?.join(', ') || 'English'}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
     

      {/* Main content area (non-hero sections) */}
      <div className="bg-[#141415] py-20">
        <div className="container mx-auto px-4">
          {/* What you'll learn */}
          <section className="pb-20 flex flex-col gap-5 md:flex-row justify-between ">
            <div>

            <h2 className="text-2xl font-heading mb-6">Ce que vous apprendrez</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-3xl max-w-full">
              {courseDetail.modules.map((module, index) => (
                <div key={index} className="max-w-full md:max-xs bg-[#1a1a1a] backdrop-blur-md py-4 px-6 rounded-lg">
                  <h3 className="text-lg font-heading">{module.title}</h3>
                  <p className="text-[#C3C3C3] text-sm font-body">{module.description}</p>
                </div>
              ))}
            </div>
            </div>

            {/* Instructors */}
          {courseDetail.instructors && courseDetail.instructors.length > 0 && (
            <section className="">
              <h2 className="text-2xl font-heading mb-6">Formateurs</h2>
              <div className="flex flex-col gap-6">
                {courseDetail.instructors.map((instructor, index) => (
                  <div key={index} className="flex items-start gap-4 bg-[#1a1a1a]/70 backdrop-blur-md p-5 rounded-lg">
                    {instructor.imageUrl ? (
                      <Image 
                        src={instructor.imageUrl} 
                        alt={instructor.name} 
                        width={64} 
                        height={64} 
                        className="rounded-full w-16 h-16 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                        {instructor.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading text-lg">{instructor.name}</h3>
                      <p className="text-gray-300 text-sm mb-2 font-body">{instructor.title}</p>
                      {(instructor.courses || instructor.learners) && (
                        <p className="text-gray-400 text-sm font-body">
                          {instructor.courses && `${instructor.courses} Courses • `}
                          {instructor.learners && `${instructor.learners.toLocaleString()} learners`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          </section>
          
          
          
          {/* Skills you'll gain */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading mb-6">Compétences à acquérir</h2>
            <div className="flex flex-wrap gap-3 max-w-2xl">
              {courseDetail.skills.map((skill, index) => (
                <div key={index} className="bg-[#343434] py-2 px-4 rounded-lg text-sm font-body">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>

          {/* Details to know */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading mb-6">Détails importants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Shareable certificate */}
              {courseDetail.shareable && (
                <div className="flex flex-col items-start space-y-2 ">
                  <div className="bg-[#343434] p-2 rounded-md">
                   <Linkedin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading">Certificat partageable</h3>
                    <p className="text-[#C3C3C3] text-sm font-body">
                      {courseDetail.shareableText || 'Add to your LinkedIn profile'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Industry certification */}
              {courseDetail.industryRecognized && (
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-[#343434] p-2 rounded-md">
                    <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading">Certification industrielle</h3>
                    <p className="text-[#C3C3C3] text-sm font-body">
                      {courseDetail.industryRecognizedText || 'Learn more'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Languages */}
              {courseDetail.languages && courseDetail.languages.length > 0 && (
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-[#343434] p-2 rounded-md">
                    <Languages className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading">Enseigné en</h3>
                    <p className="text-[#C3C3C3] text-sm font-body">
                      {courseDetail.languages.join(' & ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {/* Testimonials */}
          {courseDetail.testimonials && courseDetail.testimonials.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-heading mb-6">Pourquoi choisir ce cours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {courseDetail.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-[#1a1a1a]/70 backdrop-blur-md p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      {testimonial.imageUrl ? (
                        <Image 
                          src={testimonial.imageUrl} 
                          alt={testimonial.name} 
                          width={40} 
                          height={40} 
                          className="rounded-full w-10 h-10 object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm mr-3">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-heading text-sm">{testimonial.name}</div>
                        {testimonial.role && <div className="text-gray-400 text-xs font-body">{testimonial.role}</div>}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm font-body">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
      
        </div>
      </div>
    </div>
  );
}
