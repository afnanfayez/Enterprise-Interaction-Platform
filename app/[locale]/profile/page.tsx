import { notFound } from 'next/navigation';
import ProfilePage from '@/components/profile/ProfilePage';
import { isLocale } from '@/lib/i18n';

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfileRoute({ params }: ProfilePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ProfilePage locale={locale} />;
}
