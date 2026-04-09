import { notFound } from 'next/navigation';
import AddressForm from '@/components/address-form/AddressForm';
import { LOCALES, isLocale } from '@/lib/i18n';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <AddressForm locale={locale} />;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
