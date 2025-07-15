import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Ajouter des headers CORS si nécessaire
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

export const config = {
  matcher: '/api/config/:path*',
};