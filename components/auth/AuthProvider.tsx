'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  accountType?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

// ── Module-level token (avoids hydration mismatch & localStorage) ────────────

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function decodeTokenPayload(token: string): AuthUser {
  const base64 = token.split('.')[1];
  const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
  const payload = JSON.parse(json) as {
    userId: string;
    email: string;
    role: string;
    name?: string;
  };

  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name ?? payload.email,
    role: payload.role,
  };
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const res = await fetch('/api/auth/refresh', { method: 'POST' });
        if (!res.ok) throw new Error('refresh failed');

        const { data } = (await res.json()) as {
          data: { accessToken: string };
        };

        if (cancelled) return;

        accessToken = data.accessToken;
        setUser(decodeTokenPayload(data.accessToken));
      } catch {
        accessToken = null;
        setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      throw new Error(body.error ?? 'Login failed');
    }

    const { data } = (await res.json()) as {
      data: { user: AuthUser; accessToken: string };
    };

    accessToken = data.accessToken;
    setUser(data.user);
  }, []);

  const register = useCallback(async (payload: RegisterData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      throw new Error(body.error ?? 'Registration failed');
    }

    const { data } = (await res.json()) as {
      data: { user: AuthUser; accessToken: string };
    };

    accessToken = data.accessToken;
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    accessToken = null;
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
