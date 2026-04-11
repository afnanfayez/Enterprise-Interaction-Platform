import { notFound } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { LOCALES, isLocale } from '@/lib/i18n';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <LoginForm locale={locale} />;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
