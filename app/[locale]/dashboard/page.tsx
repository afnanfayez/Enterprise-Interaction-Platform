import { notFound } from 'next/navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import { isLocale } from '@/lib/i18n';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <Dashboard locale={locale} />;
}
