import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow Tailwind, static files, images, next internals
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon') ||
    path.startsWith('/logo') ||
    path.startsWith('/icons') ||
    path.match(/\.(png|jpg|jpeg|svg|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  // Allow the closed page itself
  if (path.startsWith('/closed')) {
    return NextResponse.next();
  }

  const isAdmin = path.startsWith('/admin');
  const isApi = path.startsWith('/api');

  // Redirect all public routes
  if (!isAdmin && !isApi) {
    const url = req.nextUrl.clone();
    url.pathname = '/closed';
    return NextResponse.redirect(url);
  }

  // Admin Page rules
  const isLoginPage = path === '/admin/login';
  if (isLoginPage) return NextResponse.next();

  if (isAdmin) {
    const isAuth = req.cookies.get('admin-auth')?.value === 'true';
    if (!isAuth) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.next();
  }

  // API always allowed
  if (isApi) return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
