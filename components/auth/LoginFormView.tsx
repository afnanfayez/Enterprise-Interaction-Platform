'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import type { AppMessages, Locale } from '@/lib/i18n';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

export interface LoginFieldErrors {
  email?: string;
  password?: string;
}

interface LoginFormViewProps {
  locale: Locale;
  messages: AppMessages;
  email: string;
  password: string;
  fieldErrors: LoginFieldErrors;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function LoginFormView({
  locale,
  messages,
  email,
  password,
  fieldErrors,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormViewProps) {
  const { auth } = messages;

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <Card padding="lg">
          <h1 className="mb-1 text-xl font-bold text-neutral-900">
            {auth.loginTitle}
          </h1>
          <p className="mb-6 text-sm text-neutral-500">
            {auth.loginSubtitle}
          </p>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label={auth.emailLabel}
              type="email"
              placeholder={auth.emailPlaceholder}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              error={fieldErrors.email}
              required
              autoComplete="email"
              dir="ltr"
            />

            <Input
              label={auth.passwordLabel}
              type="password"
              placeholder={auth.passwordPlaceholder}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              error={fieldErrors.password}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              className="mt-2"
            >
              {auth.loginButton}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link
              href={`/${locale}/register`}
              className="font-medium text-brand-accent hover:underline"
            >
              {auth.noAccountYet}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
