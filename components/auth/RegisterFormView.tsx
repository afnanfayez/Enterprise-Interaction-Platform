'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import type { AppMessages, Locale } from '@/lib/i18n';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

export interface RegisterFieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterFormViewProps {
  locale: Locale;
  messages: AppMessages;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  fieldErrors: RegisterFieldErrors;
  isSubmitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function RegisterFormView({
  locale,
  messages,
  name,
  email,
  phone,
  password,
  confirmPassword,
  fieldErrors,
  isSubmitting,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: RegisterFormViewProps) {
  const { auth } = messages;

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <Card padding="lg">
          <h1 className="mb-1 text-xl font-bold text-neutral-900">
            {auth.registerTitle}
          </h1>
          <p className="mb-6 text-sm text-neutral-500">
            {auth.registerSubtitle}
          </p>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label={auth.nameLabel}
              placeholder={auth.namePlaceholder}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              error={fieldErrors.name}
              required
              autoComplete="name"
            />

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
              label={auth.phoneLabel}
              type="tel"
              placeholder={auth.phonePlaceholder}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              error={fieldErrors.phone}
              autoComplete="tel"
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
              autoComplete="new-password"
            />

            <Input
              label={auth.confirmPasswordLabel}
              type="password"
              placeholder={auth.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              error={fieldErrors.confirmPassword}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              className="mt-2"
            >
              {auth.registerButton}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link
              href={`/${locale}/login`}
              className="font-medium text-brand-accent hover:underline"
            >
              {auth.alreadyHaveAccount}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
