import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';
  const isApi = path.startsWith('/api');

  // Allow everything except protected admin pages
  if (!isAdminRoute || isLoginPage || isApi) {
    return NextResponse.next();
  }

  // Admin authentication check
  const isAuth = req.cookies.get('admin-auth')?.value === 'true';

  if (!isAuth) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
