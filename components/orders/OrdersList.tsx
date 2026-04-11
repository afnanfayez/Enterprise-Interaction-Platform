'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { getAccessToken, useAuth } from '@/components/auth/AuthProvider';
import OrdersListView, { type OrderListItem } from './OrdersListView';

interface OrdersListProps {
  locale: Locale;
}

export default function OrdersList({ locale }: OrdersListProps) {
  const messages = getMessages(locale);
  const router = useRouter();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        const json = (await res.json()) as {
          data?: OrderListItem[];
          error?: string;
        };
        if (!res.ok) throw new Error(json.error);
        if (!cancelled && json.data) {
          setOrders(json.data);
        }
      } catch (err) {
        if (!cancelled) {
          toast.error(
            err instanceof Error
              ? err.message
              : messages.errors.somethingWentWrong,
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, [authLoading, messages]);

  const handleOrderClick = useCallback(
    (id: string) => {
      router.push(`/${locale}/orders/${id}`);
    },
    [router, locale],
  );

  const handleCreateOrder = useCallback(() => {
    router.push(`/${locale}/orders/create`);
  }, [router, locale]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <OrdersListView
      messages={messages}
      orders={orders}
      onOrderClick={handleOrderClick}
      onCreateOrder={handleCreateOrder}
    />
  );
}
