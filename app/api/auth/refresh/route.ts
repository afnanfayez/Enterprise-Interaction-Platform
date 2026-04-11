import { NextResponse, type NextRequest } from 'next/server';
import {
  verifyRefreshToken,
  getUserById,
  createAccessToken,
  createRefreshToken,
} from '@/lib/server/auth';

export const runtime = 'nodejs';

const REFRESH_COOKIE = 'adel-refresh-token';
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get(REFRESH_COOKIE);
    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'No refresh token' },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = await verifyRefreshToken(cookie.value);
    } catch {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 },
      );
    }

    const user = await getUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 },
      );
    }

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    const [accessToken, newRefreshToken] = await Promise.all([
      createAccessToken(tokenPayload),
      createRefreshToken(tokenPayload),
    ]);

    const response = NextResponse.json({ data: { accessToken } });

    response.cookies.set(REFRESH_COOKIE, newRefreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SEVEN_DAYS,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
