import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['ar', 'en'] as const;
const DEFAULT_LOCALE = 'ar';
const LOCALE_COOKIE = 'adel-locale';
const REFRESH_COOKIE = 'adel-refresh-token';

const PROTECTED_PREFIXES = ['/dashboard', '/orders', '/profile'];
const ADMIN_PREFIXES = ['/admin'];

// ── Helpers ──────────────────────────────────────────────────────────────────

function detectLocale(request: NextRequest): string {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && (LOCALES as readonly string[]).includes(saved)) return saved;

  const accept = request.headers.get('accept-language') ?? '';
  return /\ben\b/i.test(accept) ? 'en' : DEFAULT_LOCALE;
}

function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || '/';
    }
  }
  return pathname;
}

function extractLocale(pathname: string): string | null {
  for (const locale of LOCALES) {
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return locale;
    }
  }
  return null;
}

function matchesAny(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

// ── Proxy ────────────────────────────────────────────────────────────────────

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // 1. Root redirect → preferred locale
  if (pathname === '/') {
    const locale = detectLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 2. Determine locale from URL
  const locale = extractLocale(pathname);
  if (!locale) return NextResponse.next();

  const pathWithoutLocale = stripLocale(pathname);

  // 3. Auth-protected routes
  if (matchesAny(pathWithoutLocale, PROTECTED_PREFIXES) || matchesAny(pathWithoutLocale, ADMIN_PREFIXES)) {
    const hasRefreshToken = request.cookies.has(REFRESH_COOKIE);
    if (!hasRefreshToken) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return NextResponse.next();
}

// ── Matcher — skip static assets, images, favicon, and API routes ────────────

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
