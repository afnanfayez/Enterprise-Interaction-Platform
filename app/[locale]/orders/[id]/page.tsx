import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import OrderDetail from '@/components/orders/OrderDetail';

interface OrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { locale, id } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <OrderDetail locale={locale} orderId={id} />;
}
