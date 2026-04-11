import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import CreateOrderForm from '@/components/orders/CreateOrderForm';

interface CreateOrderPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreateOrderPage({ params }: CreateOrderPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <CreateOrderForm locale={locale} />;
}
