'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { getAccessToken, useAuth } from '@/components/auth/AuthProvider';
import type { TimelineStep } from '@/components/ui/StatusTimeline';
import OrderConfirmationView from './OrderConfirmationView';

interface OrderConfirmationProps {
  locale: Locale;
  orderId: string;
}

interface OrderResponse {
  id: string;
  orderNumber?: string;
  status: string;
  statusHistory?: Array<{
    status: string;
    changedAt?: string;
    note?: string;
  }>;
}

export default function OrderConfirmation({
  locale,
  orderId,
}: OrderConfirmationProps) {
  const messages = getMessages(locale);
  const router = useRouter();
  const statusMessages = messages.orderStatus;

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        const json = (await res.json()) as { data?: OrderResponse; error?: string };
        if (!res.ok) throw new Error(json.error);
        if (!cancelled && json.data) {
          setOrder(json.data);
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

    fetchOrder();
    return () => {
      cancelled = true;
    };
  }, [authLoading, orderId, messages]);

  const buildTimelineSteps = useCallback((): TimelineStep[] => {
    const statuses = ['received', 'processing', 'shipped', 'done'] as const;
    return statuses.map((s) => {
      const historyEntry = order?.statusHistory?.find((h) => h.status === s);
      return {
        status: s,
        label: statusMessages[s],
        date: historyEntry?.changedAt,
        note: historyEntry?.note,
      };
    });
  }, [order, statusMessages]);

  const handleViewOrder = useCallback(() => {
    router.push(`/${locale}/orders/${orderId}`);
  }, [router, locale, orderId]);

  const handleCreateAnother = useCallback(() => {
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
    <OrderConfirmationView
      messages={messages}
      orderId={orderId}
      orderNumber={order?.orderNumber}
      currentStatus={order?.status ?? 'received'}
      timelineSteps={buildTimelineSteps()}
      onViewOrder={handleViewOrder}
      onCreateAnother={handleCreateAnother}
    />
  );
}
