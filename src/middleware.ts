import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Environment driven host settings.
// CANONICAL_HOST: desired primary host (e.g. platform.edutrustops.org)
// FALLBACK_HOST: working host (e.g. edutrustops.vercel.app) used if requests arrive on unrecognized hosts.
const envRef: any = (globalThis as any)?.process?.env || {};
const CANONICAL_HOST: string = envRef.CANONICAL_HOST || 'platform.edutrustops.org';
const FALLBACK_HOST: string = envRef.FALLBACK_HOST || 'edutrustops.vercel.app';
// If set to "true", we skip forcing redirects from root/www to canonical (useful while domain alias pending)
const DISABLE_PLATFORM_REDIRECT = (envRef.DISABLE_PLATFORM_REDIRECT || '').toLowerCase() === 'true';

// Hosts we consider acceptable and will serve without redirect (besides canonical & fallback)
const ADDITIONAL_ALLOWED_HOST_PATTERNS = [
  /^localhost(:\d+)?$/,
  /vercel\.app$/, // any ephemeral deployment domains
];

function hostAllowed(host: string) {
  if (!host) return false;
  if (host === CANONICAL_HOST || host === FALLBACK_HOST) return true;
  return ADDITIONAL_ALLOWED_HOST_PATTERNS.some((re) => re.test(host));
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Health always passes through fast (no redirects) to support uptime checks on any host
  if (url.pathname === '/health') {
    return NextResponse.next();
  }

  // Skip redirects if explicitly disabled (during migration)
  if (!DISABLE_PLATFORM_REDIRECT) {
    // Consolidate root + www to canonical host *if* they are those exact domains
    if (host === 'edutrustops.org' || host === 'www.edutrustops.org') {
      if (host !== CANONICAL_HOST) {
        url.host = CANONICAL_HOST;
        return NextResponse.redirect(url, 308);
      }
    }
  }

  // If host not allowed, send to fallback (stable working deployment) preserving path/query
  if (!hostAllowed(host)) {
    url.host = CANONICAL_HOST || FALLBACK_HOST;
    // If canonical == current host (should not happen) fallback to fallback host
    if (url.host === host && FALLBACK_HOST) {
      url.host = FALLBACK_HOST;
    }
    return NextResponse.redirect(url, 308);
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
