import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }
  
  return null; // null means authorized
}