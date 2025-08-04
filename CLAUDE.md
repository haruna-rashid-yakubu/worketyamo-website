# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for Worketyamo, a French tech training company. The application is a course catalog website featuring bootcamps and technical training programs. It uses React 19, TypeScript, TailwindCSS, and Framer Motion for animations.

## Tech Stack & Framework Details

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **TailwindCSS 4.x** for styling  
- **Framer Motion** for animations and transitions
- **CMDK** for the course search interface
- **Supabase** for database integration (configured but not actively used yet)
- **Vercel Speed Insights** and Google Analytics for monitoring
- **Microsoft Clarity** for user behavior analytics

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

**Important**: The project uses Turbopack for development. NEVER run `npm run build` unless specifically requested by the user.

## Architecture & Data Structure

### Current Data Layer (Mock Data)
The application currently uses mock data stored in TypeScript files:

- **`src/data/courses.ts`**: Basic course information (Course interface)
- **`src/data/detail.ts`**: Detailed course information including modules, instructors, testimonials (CourseDetail interface)

### Key Data Models
- **Course**: Basic course info (id, label, backgroundColor, iconUrl, description)
- **CourseDetail**: Comprehensive course data with modules, instructors, skills, testimonials
- **CourseModule**: Individual course sections with topics and detailed content
- **CourseInstructor**: Instructor profiles with stats
- **CourseTestimonial**: Student feedback with ratings

### URL Structure
- Homepage: `/`
- Course details: `/course/[courseId]` (dynamic routes)

## Component Architecture

### Main Components
- **`src/app/page.tsx`**: Homepage with hero section and course search
- **`src/components/CourseSearch.tsx`**: Interactive course search with CMDK
- **`src/app/course/[courseId]/page.tsx`**: Dynamic course detail pages

### Styling & Animation Patterns
- **Framer Motion**: Extensive use of staggered animations, spring transitions
- **Animation Variants**: Consistent animation patterns across components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Custom Fonts**: Geist Sans and Geist Mono loaded via next/font

### Image Assets
All course icons, logos, and images are stored in `/public/Images/` with organized subdirectories:
- `/Images/logo-icon/`: Technology icons (SVGs and PNGs)
- `/Images/instructors/`: Instructor profile images
- `/Images/testimonials/`: Student testimonial photos

## Internationalization Requirements

The application is currently French-only but needs to support both French and English:
- Content is hardcoded in French throughout the codebase
- Course data contains French titles, descriptions, and module content
- UI text strings need translation support
- Future implementation should use Next.js 15 App Router i18n patterns

## Database Migration Context

Current mock data structure in `src/data/` needs migration to Prisma + SQLite:
- Course catalog with 8 courses (AWS, UX/UI, Docker, Terraform, AI, Burp Suite, Python, GitHub)
- Rich course details including multilingual content support needed
- Instructor profiles and student testimonials
- Skills and technology associations

## Development Notes

### Key Dependencies
- All UI components use Framer Motion for consistent animations
- CMDK powers the course search functionality  
- Lucide React provides icons throughout the application
- Tailwind classes follow a mobile-first responsive approach

### Styling Constraints
**CRITICAL**: When working on this project, preserve ALL existing styling:
- Never modify CSS classes, animations, or visual layouts
- Maintain exact Framer Motion animation timings and variants
- Preserve all image sources and asset references
- Keep responsive design patterns intact

### Course Search Implementation
The CourseSearch component features:
- Keyboard shortcuts (⌘K to open, Escape to close)
- Real-time filtering with CMDK
- Animated course buttons with technology icons
- Full-screen modal overlay with backdrop blur

### Performance Optimizations
- Next.js Image component with priority loading for hero images
- Framer Motion animations optimized with transform properties
- Analytics integration (Google Analytics, Microsoft Clarity, Vercel Speed Insights)

## Future Implementation Roadmap

Based on the requirements provided:
1. **Prisma Integration**: Replace mock data with SQLite database
2. **Internationalization**: Next.js 15 App Router i18n setup
3. **Avatar Fallbacks**: Initials-based fallback for missing profile images
4. **Multi-language Content**: Database schema supporting both French and English content

## File Structure

```
src/
├── app/
│   ├── course/[courseId]/page.tsx    # Dynamic course pages
│   ├── layout.tsx                    # Root layout with analytics
│   ├── page.tsx                      # Homepage
│   └── globals.css                   # Global styles
├── components/
│   ├── CourseSearch.tsx              # Main search component
│   └── RegistrationForm.tsx          # Newsletter signup
└── data/
    ├── courses.ts                    # Course catalog data
    └── detail.ts                     # Detailed course information
```

## Analytics & Monitoring

The application includes:
- Google Analytics (G-YJ9DNFNHGH)
- Microsoft Clarity (rkwdh50loc)
- Vercel Speed Insights for performance monitoring