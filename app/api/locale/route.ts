import { NextResponse } from 'next/server';
import { LOCALE_COOKIE_NAME, isLocale } from '@/lib/i18n';

export const runtime = 'nodejs';

interface LocaleRequestBody {
  locale?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LocaleRequestBody;
  const locale = body.locale;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Invalid locale value' }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}
