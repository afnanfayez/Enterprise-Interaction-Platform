import { NextResponse, type NextRequest } from 'next/server';
import { registerSchema } from '@/lib/validators';
import {
  createUser,
  getUserByEmail,
  createAccessToken,
  createRefreshToken,
} from '@/lib/server/auth';

export const runtime = 'nodejs';

const REFRESH_COOKIE = 'adel-refresh-token';
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, password, name, phone, accountType } = parsed.data;

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 },
      );
    }

    const user = await createUser({ email, password, name, phone, accountType });

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      createAccessToken(tokenPayload),
      createRefreshToken(tokenPayload),
    ]);

    const response = NextResponse.json(
      {
        data: {
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          accessToken,
        },
      },
      { status: 201 },
    );

    response.cookies.set(REFRESH_COOKIE, refreshToken, {
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
