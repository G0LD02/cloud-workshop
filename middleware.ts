import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1️⃣ Allow the "closed" page itself
  if (path.startsWith('/closed')) {
    return NextResponse.next();
  }

  // 2️⃣ Redirect ALL public routes to /closed
  const isAdmin = path.startsWith('/admin');
  const isApi = path.startsWith('/api');

  if (!isAdmin && !isApi) {
    const url = req.nextUrl.clone();
    url.pathname = '/closed';
    return NextResponse.redirect(url);
  }

  // 3️⃣ Admin route logic (your original code)
  const isLoginPage = path === '/admin/login';
  if (isLoginPage) {
    return NextResponse.next();
  }

  if (isAdmin) {
    const isAuth = req.cookies.get('admin-auth')?.value === 'true';
    if (!isAuth) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.next();
  }

  // 4️⃣ Allow API routes untouched
  if (isApi) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
