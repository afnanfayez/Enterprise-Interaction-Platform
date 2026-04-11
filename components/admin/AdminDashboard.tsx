'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAccessToken, useAuth } from '@/components/auth/AuthProvider';
import AdminDashboardView, {
  type OrderSummary,
  type DashboardStats,
} from './AdminDashboardView';
import type { AppMessages, Locale } from '@/lib/i18n';

interface AdminDashboardProps {
  locale: Locale;
  messages: AppMessages;
}

const EMPTY_STATS: DashboardStats = {
  total: 0,
  received: 0,
  processing: 0,
  shipped: 0,
  done: 0,
  cancelled: 0,
};

export default function AdminDashboard({ locale, messages }: AdminDashboardProps) {
  const { isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
      const res = await fetch('/api/orders', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error('Failed to load orders');

      const body = (await res.json()) as { data: OrderSummary[] };
      const list = body.data ?? [];

      setOrders(list);

      const computed: DashboardStats = {
        total: list.length,
        received: list.filter((o) => o.status === 'received').length,
        processing: list.filter((o) => o.status === 'processing').length,
        shipped: list.filter((o) => o.status === 'shipped').length,
        done: list.filter((o) => o.status === 'done').length,
        cancelled: list.filter((o) => o.status === 'cancelled').length,
      };
      setStats(computed);
    } catch {
      // keep empty state
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) fetchOrders();
  }, [authLoading, fetchOrders]);

  return (
    <AdminDashboardView
      orders={orders}
      stats={stats}
      locale={locale}
      messages={messages}
      isLoading={isLoading}
    />
  );
}
