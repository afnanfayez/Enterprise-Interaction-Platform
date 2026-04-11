import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REFRESH_COOKIE = 'adel-refresh-token';

export async function POST() {
  const response = NextResponse.json({ data: { message: 'Logged out' } });

  response.cookies.set(REFRESH_COOKIE, '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });

  return response;
}
