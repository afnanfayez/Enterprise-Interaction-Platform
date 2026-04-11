'use client';

import { getMessages, type Locale } from '@/lib/i18n';
import { useAuth } from '@/components/auth/AuthProvider';
import LandingPageView from './LandingPageView';

interface LandingPageProps {
  locale: Locale;
}

export default function LandingPage({ locale }: LandingPageProps) {
  const messages = getMessages(locale);
  const { user, isLoading } = useAuth();

  return (
    <LandingPageView
      locale={locale}
      messages={messages}
      isAuthenticated={!!user}
      isLoading={isLoading}
    />
  );
}
