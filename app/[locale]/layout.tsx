import { notFound } from 'next/navigation';
import ToasterProvider from '@/components/ui/ToasterProvider';
import DocumentLocaleSync from '@/components/ui/DocumentLocaleSync';
import NavigationWrapper from '@/components/ui/NavigationWrapper';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { getLocaleDirection, getMessages, isLocale, type Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dir = getLocaleDirection(locale);
  const messages = getMessages(locale as Locale);

  return (
    <>
      <DocumentLocaleSync locale={locale} />
      <ToasterProvider dir={dir} />
      <AuthProvider>
        <div dir={dir}>
          <NavigationWrapper locale={locale as Locale} messages={messages} />
          {children}
        </div>
      </AuthProvider>
    </>
  );
}
