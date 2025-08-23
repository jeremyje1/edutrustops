import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Redirect from edutrustops.org to www.edutrustops.org
  if (hostname === 'edutrustops.org') {
    url.host = 'www.edutrustops.org';
    return NextResponse.redirect(url, 301);
  }

  // Redirect platform.edutrustops.org to www.edutrustops.org
  if (hostname === 'platform.edutrustops.org' || hostname.startsWith('platform.')) {
    url.host = 'www.edutrustops.org';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
