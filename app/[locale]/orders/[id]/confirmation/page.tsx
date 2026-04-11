import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import OrderConfirmation from '@/components/orders/OrderConfirmation';

interface ConfirmationPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { locale, id } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <OrderConfirmation locale={locale} orderId={id} />;
}
