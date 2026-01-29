import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname === '/admin/login';
  const isApi = req.nextUrl.pathname.startsWith('/api');

  if (!isAdminRoute || isLoginPage || isApi) {
    return NextResponse.next();
  }

  const isAuth = req.cookies.get('admin-auth')?.value === 'true';

  if (!isAuth) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
