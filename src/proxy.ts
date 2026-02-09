// 📦 src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routePermissions } from './lib/routes';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtected = routePermissions.protected.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  const isAdmin = routePermissions.admin.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Redirect to login if accessing protected route without token
  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin role check temporarily disabled for UI development
  /* if (isAdmin && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  } */

  // Redirect to account if logged in and trying to access auth pages
  const isAuthPage = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
  ].some(route => pathname === route || pathname.startsWith(route + '/'));

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return NextResponse.next();
}

// Optional: Export named proxy function as well
export { proxy };