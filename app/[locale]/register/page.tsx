import { notFound } from 'next/navigation';
import RegisterForm from '@/components/auth/RegisterForm';
import { LOCALES, isLocale } from '@/lib/i18n';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <RegisterForm locale={locale} />;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
