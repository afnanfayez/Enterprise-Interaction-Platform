'use client';

import { type FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { registerSchema } from '@/lib/validators';
import { useAuth } from './AuthProvider';
import RegisterFormView, {
  type RegisterFieldErrors,
} from './RegisterFormView';

interface RegisterFormProps {
  locale: Locale;
}

export default function RegisterForm({ locale }: RegisterFormProps) {
  const messages = getMessages(locale);
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const errors: RegisterFieldErrors = {};
    const { authValidation } = messages;

    if (!name.trim()) {
      errors.name = authValidation.nameRequired;
    }

    if (!email.trim()) {
      errors.email = authValidation.emailRequired;
    } else {
      const emailResult = registerSchema.shape.email.safeParse(email);
      if (!emailResult.success) {
        errors.email = authValidation.emailInvalid;
      }
    }

    if (!password) {
      errors.password = authValidation.passwordRequired;
    } else if (password.length < 8) {
      errors.password = authValidation.passwordTooShort;
    }

    if (password && confirmPassword !== password) {
      errors.confirmPassword = authValidation.passwordsDoNotMatch;
    } else if (!confirmPassword) {
      errors.confirmPassword = authValidation.passwordRequired;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, password, confirmPassword, messages]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      try {
        await register({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        });
        toast.success(messages.toast.registerSuccess);
        router.push(`/${locale}/dashboard`);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : messages.authValidation.registrationFailed;
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, register, name, email, password, phone, locale, router, messages],
  );

  return (
    <RegisterFormView
      locale={locale}
      messages={messages}
      name={name}
      email={email}
      phone={phone}
      password={password}
      confirmPassword={confirmPassword}
      fieldErrors={fieldErrors}
      isSubmitting={isSubmitting}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPhoneChange={setPhone}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
}
