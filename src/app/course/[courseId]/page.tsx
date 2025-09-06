'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RegistrationForm from '@/components/RegistrationForm';
import { ArrowLeft, Images, Linkedin, Languages } from 'lucide-react';
import { CourseDetailWithTranslations } from '@/lib/courses';
import { getCourseDetailAction } from '@/app/actions';
import { AvatarFallback } from '@/components/ui/avatar-fallback';
import AdvancedCourseAIAssistant from '@/components/AdvancedCourseAIAssistant';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import backsquare from '../../../../public/Images/icons/back-square.svg'

// Quote Icon with Top and Bottom Border Animation
const AnimatedQuoteWithBorders = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Top border */}
      <div className="h-16 w-1 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-1 bg-gradient-to-b from-transparent to-orange-500 rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? {
            height: "100%",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          } : { height: 0, opacity: 0 }}
        />
        
        {/* Flowing highlight effect for top border with auto-fade */}
        <motion.div 
          className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full"
          initial={{ top: "-48px", opacity: 0 }}
          animate={{
            top: isInView ? "100%" : "-48px",
            opacity: isInView ? [0, 0.7, 0] : 0,
          }}
          transition={{
            top: { delay: 0.3, duration: 1.5, ease: "easeInOut" },
            opacity: { 
              times: [0, 0.1, 0.7], // Make it disappear earlier
              duration: 1.5,
              delay: 0.3,
              ease: "easeInOut" 
            }
          }}
        />
      </div>
      {/* Quote icon with transparent center and enhanced glowing blur effect */}
      <div className="relative">
        {/* Multiple glow layers for enhanced effect */}
        <div className="absolute inset-0 rounded-full blur-xl bg-orange-500 opacity-20" />
        <div className="absolute inset-[-2px] rounded-full blur-md bg-orange-400 opacity-10" />
        
        <motion.div 
          className="relative flex items-center justify-center w-11 h-11 rounded-full p-3"
          style={{ 
            
            background: 'transparent'
          }}
          initial={{ scale: 0, opacity: 0, rotateY: 90 }}
          animate={isInView ? {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: { delay: 0.8, duration: 0.5, type: "spring" }
          } : { scale: 0, opacity: 0, rotateY: 90 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        >
          <Quote className="h-5 w-5 text-orange-500" />
        </motion.div>
      </div>
      
      
      {/* Bottom border */}
      <div className="h-16 w-1 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-1 bg-gradient-to-b to-orange-500 from-transparent rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? {
            height: "100%", 
            opacity: 1,
            transition: { delay: 0.4, duration: 0.8, ease: "easeOut" }
          } : { height: 0, opacity: 0 }}
        />
        
        {/* Flowing highlight effect for bottom border */}
        <motion.div 
          className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-70"
          initial={{ top: "-48px" }}
          animate={isInView ? {
            top: "100%",
            transition: { 
              delay: 1.2,
              duration: 1.5, 
              ease: "easeInOut"
            }
          } : { top: "-48px" }}
        />
      </div>
    </div>
  );
};

// Border Animation Component with reliable scroll detection
const BorderAnimation = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  return (
    <div ref={containerRef} className="h-full flex flex-col items-center overflow-visible">
      {/* Container for top border */}
      <div className="relative flex-1 w-1 overflow-hidden">
        {/* Top border with 0 to 100% opacity gradient */}
        <motion.div 
          className="absolute inset-0 w-1 bg-gradient-to-b from-transparent to-orange-500 rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? {
            height: "100%",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          } : { height: 0, opacity: 0 }}
        />
        
        {/* Flowing highlight effect for top border with auto-fade */}
        <motion.div 
          className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full"
          initial={{ top: "-48px", opacity: 0 }}
          animate={{
            top: isInView ? "100%" : "-48px",
            opacity: isInView ? [0, 0.7, 0] : 0,
          }}
          transition={{
            top: { delay: 0.3, duration: 1.5, ease: "easeInOut" },
            opacity: { 
              times: [0, 0.1, 0.7], // Make it disappear earlier
              duration: 1.5,
              delay: 0.3,
              ease: "easeInOut" 
            }
          }}
        />
      </div>
            
      {/* Container for bottom border */}
      <div className="relative flex-1 w-1 overflow-hidden">
        {/* Bottom border with 100% to 0 opacity gradient */}
        <motion.div 
          className="absolute inset-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? {
            height: "100%", 
            opacity: 1,
            transition: { delay: 0.4, duration: 0.8, ease: "easeOut" }
          } : { height: 0, opacity: 0 }}
        />
        
        {/* Flowing highlight effect for bottom border */}
        <motion.div 
          className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-70"
          initial={{ top: "-48px" }}
          animate={isInView ? {
            top: "100%",
            transition: { 
              delay: 1.2,
              duration: 1.5, 
              ease: "easeInOut"
            }
          } : { top: "-48px" }}
        />
      </div>
    </div>
  );
};

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  // Use React Query for data fetching and caching
  const { data: courseDetail, isLoading: loading, error } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: async () => {
      try {
        const result = await getCourseDetailAction(courseId);
        if (!result) {
          throw new Error('Course not found');
        }
        return result;
      } catch (err) {
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 error
      if (error?.message === 'Course not found') {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Handle 404 for non-existent courses
  if (error?.message === 'Course not found') {
    notFound();
  }

  // Preload critical images when course data is available
  useEffect(() => {
    if (courseDetail?.iconUrl) {
      const img = new window.Image();
      img.src = courseDetail.iconUrl;
    }
    
    if (courseDetail?.instructors) {
      courseDetail.instructors.forEach(instructor => {
        if (instructor.imageUrl) {
          const img = new window.Image();
          img.src = instructor.imageUrl;
        }
      });
    }
  }, [courseDetail]);
  
  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for registration form overlay
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  
  // State to track which modules are expanded
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});  
  
  // Toggle expanded state for a specific module
  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this threshold as needed
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (loading) {
    return (
      <div 
        className="bg-[url('/Images/background-place.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex flex-col items-center justify-center p-4" 
      >
        <div className="bg-[#21262D] backdrop-blur-md p-8 rounded-lg max-w-lg text-center">
          {/* Loading Spinner */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className="w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute top-2 left-2 w-12 h-12 border-2 border-gray-600 border-b-blue-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <motion.div 
              className="text-white font-body"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Loading course...
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div 
        className="bg-[url('/Images/background-place.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex flex-col items-center justify-center p-4" 
      >
        <div className="bg-[#21262D] backdrop-blur-md p-8 rounded-lg max-w-lg text-center">
          <h1 className="text-2xl font-heading text-white mb-4">Course not found</h1>
          <p className="text-gray-300 mb-6 font-body">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-heading inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Generate comprehensive structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseDetail.fullTitle,
    "description": courseDetail.subtitle || courseDetail.description,
    "provider": {
      "@type": "Organization",
      "name": "Worketyamo",
      "url": "https://worketyamo.com",
      "logo": "https://worketyamo.com/Images/worketyamo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/worketyamo",
        "https://twitter.com/worketyamo"
      ]
    },
    "courseMode": ["online", "blended"],
    "educationalLevel": courseDetail.level || "Beginner to Advanced",
    "timeRequired": courseDetail.scheduleDuration,
    "numberOfCredits": courseDetail.modules?.length,
    "coursePrerequisites": courseDetail.experienceRequired,
    "inLanguage": courseDetail.languages || ["fr", "en"],
    "isAccessibleForFree": false,
    "offers": {
      "@type": "Offer",
      "category": "EducationalOccupationalCredential",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "Worketyamo"
      }
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": courseDetail.scheduleDuration,
      "courseSchedule": {
        "@type": "Schedule",
        "scheduleTimezone": "Europe/Paris"
      }
    },
    "teaches": courseDetail.skills?.map(skill => skill.name),
    "occupationalCredentialAwarded": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "recognizedBy": {
        "@type": "Organization", 
        "name": "Worketyamo"
      }
    },
    "syllabusSections": courseDetail.modules?.map((module, index) => ({
      "@type": "Syllabus",
      "name": module.title,
      "description": module.description,
      "position": index + 1,
      "timeRequired": "Variable",
      "about": module.topics?.map(topic => ({
        "@type": "Thing",
        "name": topic
      }))
    })),
    "instructor": courseDetail.instructors?.map(instructor => ({
      "@type": "Person",
      "name": instructor.name,
      "jobTitle": instructor.title,
      "worksFor": {
        "@type": "Organization",
        "name": "Worketyamo"
      },
      "teaches": courseDetail.fullTitle
    })),
    "aggregateRating": courseDetail.rating ? {
      "@type": "AggregateRating",
      "ratingValue": courseDetail.rating,
      "ratingCount": courseDetail.reviewCount || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "review": courseDetail.testimonials?.map(testimonial => ({
      "@type": "Review",
      "reviewBody": testimonial.text,
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "jobTitle": testimonial.role
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      }
    })),
    "keywords": [
      courseDetail.label,
      "formation",
      "tech",
      "bootcamp",
      "certification",
      "worketyamo",
      ...(courseDetail.skills?.map(s => s.name) || []),
      ...(courseDetail.modules?.flatMap(m => m.topics || []) || [])
    ].join(", "),
    "educationalUse": "professional development",
    "learningResourceType": "course",
    "interactivityType": "mixed",
    "typicalAgeRange": "18-65"
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://worketyamo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Formations",
        "item": "https://worketyamo.com/#formations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": courseDetail.fullTitle,
        "item": `https://worketyamo.com/course/${courseId}`
      }
    ]
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Worketyamo",
    "url": "https://worketyamo.com",
    "logo": "https://worketyamo.com/Images/worketyamo.svg",
    "description": "Accélérateur de talents tech - Bootcamps intensifs et formation professionnelle",
    "foundingDate": "2020",
    "sameAs": [
      "https://www.linkedin.com/company/worketyamo",
      "https://twitter.com/worketyamo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "availableLanguage": ["French", "English"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "serviceType": "Educational Services"
  };

  return (
    <div className="">
      {/* Advanced SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      
      {/* Hero section with simple background styling */}
      <div className="">
      <div 
        className="min-h-screen py-8 " 
        style={{ 
          background: courseDetail.backgroundGradient || 'linear-gradient(135deg, #21262D 0%, #0a0a0a 100%)' // Use course gradient or default
        }}
      >
        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-4">
              {/* Navigation */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors bg-[#2D2A2A] px-2 py-2 rounded-md"
          >
            <Image alt="Back square" src={backsquare} width={24} height={24} className="mr-2 h-5 w-5" />
            <span className="font-body">Back</span>
          </Link>
          <Image 
                   src="/Images/worketyamo.svg" 
                   alt="Worketyamo" 
                   width={200} 
                   height={40}
                   className='mb-20' 
                   priority
                   sizes="(max-width: 768px) 160px, 200px"
                 />
          </div>
        

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col items-start gap-8 max-w-full md:max-w-2xl">
              <div className="w-24 h-24">
                {courseDetail.iconUrl ? (
                  <Image
                    src={courseDetail.iconUrl}
                    alt={courseDetail.label}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain rounded-lg"
                    priority
                    sizes="(max-width: 768px) 96px, 96px"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: courseDetail.backgroundColor || '#333333' }}
                  >
                    <span className="text-2xl font-bold text-white">
                      {courseDetail.fullTitle.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading">{courseDetail.fullTitle}</h1>
                <p className="text-[#E9E9E9] mt-2 font-body">{courseDetail.subtitle}</p>
                
                <div className="mt-4">
                  <button 
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-heading"
                    onClick={() => setIsRegistrationFormOpen(true)}
                  >
                    Register
                  </button>
                  <p className="text-sm text-[#E9E9E9] mt-2 font-body">{courseDetail.enrollmentCount?.toLocaleString()} enrolled</p>
                </div>
              </div>
            </div>
          </header>

          {/* Course Info Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${isScrolled ? 'max-w-full lg:max-w-5xl' : 'max-w-full'} shadow-lg shadow-slate-800/80 mx-auto gap-4 mb-5 bg-[#21262D]/90 backdrop-blur-md p-4 md:px-12 md:py-6 rounded-lg border border-white/5 transition-all duration-300`}>

          <div className="">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.schedule}</h1>
              <p className="text-sm text-gray-400 font-body">{courseDetail.scheduleDuration}</p>
              <p className="text-sm text-gray-400 font-body">{courseDetail.scheduleFlexibility}</p>
            </div>
            <div className="">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.rating}</h1>
              <p className="text-sm text-gray-400 font-body">({courseDetail.reviewCount?.toLocaleString()} reviews)</p>
            </div>
            
            <div className="">
              <h1 className="mb-1 text-base text-gray-300 font-heading">{courseDetail.level}</h1>
              <p className="text-sm text-gray-400 font-body">{courseDetail.experienceRequired}</p>
            </div>
            
           
            
            <div className="">
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
      <div className="bg-[#0D1117] pt-10 pb-20">
        <div className="container mx-auto px-4">
          {/* What you'll learn */}
          <section className="pb-20 flex flex-col gap-5 md:flex-row justify-between ">
            <div className="w-full">

            <h2 className="text-2xl font-heading mb-6">Ce que vous apprendrez</h2>
            <div className="w-full md:max-w-2xl overflow-hidden rounded-lg shadow-md">
              {courseDetail.modules.map((module: any, index: number) => {
                const isExpanded = expandedModules[index] || false;
                
                return (
                  <motion.div 
                    key={index} 
                    className={`w-full bg-[#21262D]/90 backdrop-blur-md py-4 px-4 sm:px-6 border-t first:border-t-0 border-b last:border-b-0 border-white/5 ${index === 0 ? 'rounded-t-lg' : ''} ${index === courseDetail.modules.length - 1 ? 'rounded-b-lg' : ''}`}
                    layout={false} // Disable layout animation to prevent jumping
                  >
                    <div 
                      className="flex justify-between items-start cursor-pointer" 
                      onClick={() => toggleModule(index)}
                    >
                      <div className="flex flex-col-reverse">
                        <span className="text-gray-400 font-normal text-xs sm:text-sm mb-1 sm:mb-0">Module {index + 1}</span>
                        <h3 className="text-base sm:text-lg font-heading pr-6 sm:pr-0">{module.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-white/70 flex-shrink-0 ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Expandable content */}
                    <AnimatePresence mode="sync" initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden mt-3 sm:mt-4"
                        >
                          <p className="text-[#C3C3C3] text-xs sm:text-sm font-body mb-3">{module.description}</p>
                          
                          {/* Topics tags */}
                          {module.topics && module.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                              {module.topics.map((topic: string, idx: number) => (
                                <span 
                                  key={idx} 
                                  className="text-[10px] sm:text-xs bg-[#313842] px-2 py-1 rounded-md text-white/70 mb-1"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {module.detailedContent && (
                            <div className="pt-3 sm:pt-4 border-t border-white/5">
                              <p className="text-[#E9E9E9] text-xs sm:text-sm font-body leading-relaxed">
                                {module.detailedContent}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            </div>

            {/* Instructors */}
          {courseDetail.instructors && courseDetail.instructors.length > 0 && (
            <section className="w-full max-w-full md:max-w-md">
              <h2 className="text-2xl font-heading mb-6">Formateurs</h2>
              <div className="flex flex-col gap-6">
                {courseDetail.instructors.map((instructor: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 bg-[#21262D]/90 backdrop-blur-md p-5 rounded-lg border border-white/5 hover:border-white/10 hover:shadow-md transition-all duration-300">
                    <AvatarFallback
                      src={instructor.imageUrl}
                      alt={instructor.name}
                      name={instructor.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
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
              {courseDetail.skills && courseDetail.skills.map((skill: any, index: number) => (
                <div key={index} className="bg-[#21262D]/90 backdrop-blur-sm py-2 px-4 rounded-lg text-sm font-body border border-white/5 hover:border-white/10 transition-colors">
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
                  <div className="bg-[#21262D]/90 backdrop-blur-sm p-2 rounded-md border border-white/5">
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
                  <div className="bg-[#21262D]/90 backdrop-blur-sm p-2 rounded-md border border-white/5">
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
                  <div className="bg-[#21262D]/90 backdrop-blur-sm p-2 rounded-md border border-white/5">
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
            <motion.section 
              className="mb-12 relative" 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px 0px", amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {/* Header with border animation and title */}
              <div className="mb-8">
                {/* Animation and title side by side */}
                <div className="flex items-center mb-2">
                  {/* Star icon with borders */}
                  <div className="mr-6">
                    <AnimatedQuoteWithBorders />
                  </div>
                  
                  {/* Title aligned with star */}
                  <motion.h2 
                    className="text-3xl font-heading max-w-full md:max-w-md"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { duration: 0.5 } 
                      }
                    }}
                  >
                    Pourquoi choisir Worketyamo pour sa carrière
                  </motion.h2>
                </div>
              
                {/* Testimonial Cards below the header */}
                <div className="w-full mt-2 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {courseDetail.testimonials.map((testimonial: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-gradient-to-br from-white/10 to-black/10 backdrop-blur-lg border border-white/20 shadow-lg p-4 rounded-lg bg-opacity-30"
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            duration: 0.5,
                            ease: "easeOut"
                          } 
                        }
                      }}
                    >
                    <div className="flex items-center mb-3">
                      <AvatarFallback
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        name={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <div className="font-heading text-sm">{testimonial.name}</div>
                        {testimonial.role && <div className="text-gray-400 text-xs font-body">{testimonial.role}</div>}
                      </div>
                    </div>
                      <p className="text-gray-300 text-sm font-body">{testimonial.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              </div>
            </motion.section>
          )}
          
      
        </div>
      </div>

      {/* Registration Form Overlay */}
      {courseDetail && (
        <RegistrationForm 
          isOpen={isRegistrationFormOpen}
          onClose={() => setIsRegistrationFormOpen(false)}
          courseTitle={courseDetail.fullTitle}
          courseId={courseId}
        />
      )}

      {/* Advanced AI Assistant - Sticky floating button */}
      {courseDetail && (
        <AdvancedCourseAIAssistant courseDetail={courseDetail} />
      )}
    </div>
  );
}