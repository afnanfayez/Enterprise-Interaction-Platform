import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { db } from './db';
import { users, type User } from './schema';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// ── Secrets ──────────────────────────────────────────────────────────────────

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

// ── Password utilities ───────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return compare(password, passwordHash);
}

// ── JWT utilities ────────────────────────────────────────────────────────────

export async function createAccessToken(
  payload: TokenPayload,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(accessSecret);
}

export async function createRefreshToken(
  payload: TokenPayload,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload as unknown as TokenPayload;
}

export async function verifyRefreshToken(
  token: string,
): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, refreshSecret);
  return payload as unknown as TokenPayload;
}

// ── Auth helpers ─────────────────────────────────────────────────────────────

export async function requireAuth(request: Request): Promise<TokenPayload> {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = header.slice(7);
  try {
    return await verifyAccessToken(token);
  } catch {
    throw new Error('Unauthorized');
  }
}

export async function requireAdmin(request: Request): Promise<TokenPayload> {
  const payload = await requireAuth(request);
  if (payload.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return payload;
}

// ── User data operations ─────────────────────────────────────────────────────

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  accountType?: string;
}): Promise<Omit<User, 'passwordHash'>> {
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error('Email already in use');
  }

  const passwordHash = await hashPassword(data.password);

  const [inserted] = await db
    .insert(users)
    .values({
      email: data.email,
      passwordHash,
      name: data.name,
      phone: data.phone,
      accountType: data.accountType ?? 'individual',
    })
    .returning();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...user } = inserted;
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user ?? null;
}
