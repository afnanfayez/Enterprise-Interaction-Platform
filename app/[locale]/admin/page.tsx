import { notFound } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { isLocale, getMessages, type Locale } from '@/lib/i18n';

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return <AdminDashboard locale={locale as Locale} messages={messages} />;
}
