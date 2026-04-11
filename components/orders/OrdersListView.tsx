'use client';

import { Package } from 'lucide-react';
import type { AppMessages } from '@/lib/i18n';
import type { BadgeVariant } from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

export interface OrderListItem {
  id: string;
  orderNumber?: string;
  status: string;
  orderType: string;
  createdAt?: string;
  description?: string;
}

export interface OrdersListViewProps {
  messages: AppMessages;
  orders: OrderListItem[];
  onOrderClick: (id: string) => void;
  onCreateOrder: () => void;
}

function statusToBadgeVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    received: 'received',
    processing: 'processing',
    shipped: 'shipped',
    done: 'done',
    cancelled: 'cancelled',
  };
  return map[status] ?? 'info';
}

export default function OrdersListView({
  messages,
  orders,
  onOrderClick,
  onCreateOrder,
}: OrdersListViewProps) {
  const t = messages.ordersList;

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t.title}</h1>
        </div>
        <EmptyState
          icon={<Package className="h-16 w-16" />}
          title={messages.emptyStates.noOrdersYet}
          description={messages.emptyStates.noOrdersDescription}
          action={
            <Button onClick={onCreateOrder}>
              {t.createFirstOrderButton}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t.title}</h1>
        <Button onClick={onCreateOrder} size="sm">
          {messages.navigation.createOrder}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const statusLabel =
            messages.orderStatus[
              order.status as keyof typeof messages.orderStatus
            ] ?? order.status;
          const typeLabel =
            messages.orders.orderTypes[
              order.orderType as keyof typeof messages.orders.orderTypes
            ] ?? order.orderType;

          return (
            <Card
              key={order.id}
              hoverable
              className="cursor-pointer"
              onClick={() => onOrderClick(order.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOrderClick(order.id);
                }
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {t.orderNumberColumn}:{' '}
                    {order.orderNumber ?? order.id.slice(0, 8)}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                    {typeLabel}
                    {order.description ? ` — ${order.description}` : ''}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge variant={statusToBadgeVariant(order.status)}>
                    {statusLabel}
                  </Badge>
                  {order.createdAt && (
                    <span className="text-xs text-neutral-400">
                      {order.createdAt}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
