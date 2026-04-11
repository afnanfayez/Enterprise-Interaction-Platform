import { notFound } from 'next/navigation';
import AdminOrderDetail from '@/components/admin/AdminOrderDetail';
import { isLocale, getMessages, type Locale } from '@/lib/i18n';

interface AdminOrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function AdminOrderDetailPage({
  params,
}: AdminOrderDetailPageProps) {
  const { locale, id } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <AdminOrderDetail
      orderId={id}
      locale={locale as Locale}
      messages={messages}
    />
  );
}
