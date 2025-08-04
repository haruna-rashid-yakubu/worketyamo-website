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
    return (
      <div 
        className={`inline-flex items-center justify-center rounded-full bg-gray-500 text-white font-medium ${className}`}
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