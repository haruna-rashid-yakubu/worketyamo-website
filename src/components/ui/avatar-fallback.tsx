'use client';

import { useState } from 'react';
import Image from 'next/image';
import { generateInitials } from '@/lib/utils';

interface AvatarFallbackProps {
  src?: string;
  alt: string;
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

export function AvatarFallback({ 
  src, 
  alt, 
  name, 
  className = '', 
  width = 40, 
  height = 40 
}: AvatarFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const initials = generateInitials(name);
  
  const shouldShowFallback = !src || imageError;

  if (shouldShowFallback) {
    // Generate a consistent color based on the name
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
    ];
    const colorIndex = name.length % colors.length;
    const bgColor = colors[colorIndex];
    
    return (
      <div 
        className={`inline-flex items-center justify-center rounded-full ${bgColor} text-white font-semibold ${className}`}
        style={{ width, height, fontSize: Math.floor(Math.min(width, height) * 0.4) }}
        title={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
}