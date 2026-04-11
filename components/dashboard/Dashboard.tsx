'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getAccessToken } from '@/components/auth/AuthProvider';
import { getMessages, type Locale } from '@/lib/i18n';
import DashboardView from './DashboardView';

interface Order {
  id: string;
  orderNumber: string;
  status: 'received' | 'processing' | 'shipped' | 'done' | 'cancelled';
  orderType: string;
  createdAt: string;
}

interface StatusCounts {
  total: number;
  received: number;
  processing: number;
  shipped: number;
  done: number;
}

interface DashboardProps {
  locale: Locale;
}

export default function Dashboard({ locale }: DashboardProps) {
  const messages = getMessages(locale);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const body = (await res.json()) as { data: Order[] };
      setOrders(body.data);
    } catch {
      setError(messages.errors.networkError);
    } finally {
      setLoading(false);
    }
  }, [messages.errors.networkError]);

  useEffect(() => {
    if (!authLoading) {
      fetchOrders();
    }
  }, [authLoading, fetchOrders]);

  const statusCounts: StatusCounts = {
    total: orders.length,
    received: orders.filter((o) => o.status === 'received').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    done: orders.filter((o) => o.status === 'done').length,
  };

  const recentOrders = orders.slice(0, 5);

  const handleOrderClick = useCallback(
    (orderId: string) => {
      router.push(`/${locale}/orders/${orderId}`);
    },
    [router, locale],
  );

  const handleViewAllOrders = useCallback(() => {
    router.push(`/${locale}/orders`);
  }, [router, locale]);

  const handleCreateOrder = useCallback(() => {
    router.push(`/${locale}/orders/create`);
  }, [router, locale]);

  return (
    <DashboardView
      locale={locale}
      messages={messages}
      userName={user?.name ?? ''}
      statusCounts={statusCounts}
      recentOrders={recentOrders}
      loading={loading || authLoading}
      error={error}
      onOrderClick={handleOrderClick}
      onCreateOrder={handleCreateOrder}
      onViewAllOrders={handleViewAllOrders}
      onRetry={fetchOrders}
    />
  );
}
