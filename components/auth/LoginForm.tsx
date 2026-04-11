'use client';

import { type FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { loginSchema } from '@/lib/validators';
import { useAuth } from './AuthProvider';
import LoginFormView, { type LoginFieldErrors } from './LoginFormView';

interface LoginFormProps {
  locale: Locale;
}

export default function LoginForm({ locale }: LoginFormProps) {
  const messages = getMessages(locale);
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const errors: LoginFieldErrors = {};
    const { authValidation } = messages;

    if (!email.trim()) {
      errors.email = authValidation.emailRequired;
    } else {
      const emailResult = loginSchema.shape.email.safeParse(email);
      if (!emailResult.success) {
        errors.email = authValidation.emailInvalid;
      }
    }

    if (!password) {
      errors.password = authValidation.passwordRequired;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password, messages]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      try {
        await login(email.trim(), password);
        toast.success(messages.toast.loginSuccess);
        router.push(`/${locale}/dashboard`);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : messages.authValidation.loginFailed;
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, login, email, password, locale, router, messages],
  );

  return (
    <LoginFormView
      locale={locale}
      messages={messages}
      email={email}
      password={password}
      fieldErrors={fieldErrors}
      isSubmitting={isSubmitting}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
