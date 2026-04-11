'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getAccessToken, useAuth } from '@/components/auth/AuthProvider';
import { updateOrderStatusSchema } from '@/lib/validators';
import AdminOrderDetailView, { type OrderDetail } from './AdminOrderDetailView';
import type { AppMessages, Locale } from '@/lib/i18n';

interface AdminOrderDetailProps {
  orderId: string;
  locale: Locale;
  messages: AppMessages;
}

export default function AdminOrderDetail({
  orderId,
  locale,
  messages,
}: AdminOrderDetailProps) {
  const { isLoading: authLoading } = useAuth();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
      const res = await fetch(`/api/orders/${orderId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error('Failed to load order');

      const body = (await res.json()) as { data: OrderDetail };
      setOrder(body.data);
    } catch {
      toast.error(messages.errors.somethingWentWrong);
    } finally {
      setIsLoading(false);
    }
  }, [orderId, messages.errors.somethingWentWrong]);

  useEffect(() => {
    if (!authLoading) fetchOrder();
  }, [authLoading, fetchOrder]);

  const handleUpdateStatus = useCallback(
    async (status: string, note: string) => {
      const parsed = updateOrderStatusSchema.safeParse({
        status,
        note: note || undefined,
      });

      if (!parsed.success) {
        toast.error(messages.errors.somethingWentWrong);
        return;
      }

      try {
        setIsUpdating(true);
        const token = getAccessToken();
        const res = await fetch(`/api/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(parsed.data),
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error ?? 'Update failed');
        }

        toast.success(messages.admin.statusUpdated);
        await fetchOrder();
      } catch {
        toast.error(messages.errors.somethingWentWrong);
      } finally {
        setIsUpdating(false);
      }
    },
    [orderId, messages, fetchOrder],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-accent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">{messages.errors.somethingWentWrong}</p>
      </div>
    );
  }

  return (
    <AdminOrderDetailView
      order={order}
      locale={locale}
      messages={messages}
      isUpdating={isUpdating}
      onUpdateStatus={handleUpdateStatus}
    />
  );
}
