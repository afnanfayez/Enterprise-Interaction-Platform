import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import OrdersList from '@/components/orders/OrdersList';

interface OrdersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <OrdersList locale={locale} />;
}
