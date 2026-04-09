import { notFound } from 'next/navigation';
import ToasterProvider from '@/components/ui/ToasterProvider';
import DocumentLocaleSync from '@/components/ui/DocumentLocaleSync';
import { getLocaleDirection, isLocale } from '@/lib/i18n';

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

  return (
    <>
      <DocumentLocaleSync locale={locale} />
      <ToasterProvider dir={dir} />
      <div dir={dir}>{children}</div>
    </>
  );
}
