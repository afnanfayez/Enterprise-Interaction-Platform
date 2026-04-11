'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { getAccessToken, useAuth } from '@/components/auth/AuthProvider';
import type { TimelineStep } from '@/components/ui/StatusTimeline';
import OrderDetailView, { type OrderDetailData } from './OrderDetailView';

interface OrderDetailProps {
  locale: Locale;
  orderId: string;
}

interface OrderApiResponse {
  id: string;
  orderNumber?: string;
  status: string;
  orderType: string;
  createdAt?: string;
  countryIso2: string;
  city: string;
  currency: string;
  description?: string;
  quantity: number;
  notes?: string;
  statusHistory?: Array<{
    status: string;
    changedAt?: string;
    note?: string;
  }>;
}

export default function OrderDetail({ locale, orderId }: OrderDetailProps) {
  const messages = getMessages(locale);
  const router = useRouter();
  const statusMessages = messages.orderStatus;

  const [order, setOrder] = useState<OrderApiResponse | null>(null);
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
        const json = (await res.json()) as {
          data?: OrderApiResponse;
          error?: string;
        };
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

  const handleBack = useCallback(() => {
    router.push(`/${locale}/orders`);
  }, [router, locale]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-neutral-500">{messages.errors.somethingWentWrong}</p>
      </div>
    );
  }

  const orderData: OrderDetailData = {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    orderType: order.orderType,
    createdAt: order.createdAt,
    countryIso2: order.countryIso2,
    city: order.city,
    currency: order.currency,
    description: order.description,
    quantity: order.quantity,
    notes: order.notes,
  };

  return (
    <OrderDetailView
      messages={messages}
      order={orderData}
      currentStatus={order.status}
      timelineSteps={buildTimelineSteps()}
      onBack={handleBack}
    />
  );
}
