import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporarily disabled middleware to avoid redirect loops
// Will handle authentication on client-side only
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: []
};