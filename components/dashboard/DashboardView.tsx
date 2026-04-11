'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import type { AppMessages, Locale } from '@/lib/i18n';
import type { BadgeVariant } from '@/components/ui/Badge';

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

interface DashboardViewProps {
  locale: Locale;
  messages: AppMessages;
  userName: string;
  statusCounts: StatusCounts;
  recentOrders: Order[];
  loading: boolean;
  error: string | null;
  onOrderClick: (orderId: string) => void;
  onCreateOrder: () => void;
  onViewAllOrders: () => void;
  onRetry: () => void;
}

function StatCard({
  label,
  count,
  colorClass,
}: {
  label: string;
  count: number;
  colorClass: string;
}) {
  return (
    <Card padding="md">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${colorClass}`}>{count}</p>
    </Card>
  );
}

function formatDate(dateStr: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function DashboardView({
  locale,
  messages,
  userName,
  statusCounts,
  recentOrders,
  loading,
  error,
  onOrderClick,
  onCreateOrder,
  onViewAllOrders,
  onRetry,
}: DashboardViewProps) {
  const { dashboard, orderStatus, emptyStates, navigation, errors } = messages;

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-neutral-500">{error}</p>
        <Button variant="secondary" onClick={onRetry}>
          {errors.tryAgainButton}
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {dashboard.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {dashboard.subtitle}
            {userName ? `, ${userName}` : ''}
          </p>
        </div>
        <Button onClick={onCreateOrder}>{navigation.createOrder}</Button>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label={dashboard.totalOrders}
          count={statusCounts.total}
          colorClass="text-neutral-900 dark:text-neutral-100"
        />
        <StatCard
          label={orderStatus.received}
          count={statusCounts.received}
          colorClass="text-brand-accent"
        />
        <StatCard
          label={orderStatus.processing}
          count={statusCounts.processing}
          colorClass="text-status-warning"
        />
        <StatCard
          label={orderStatus.shipped}
          count={statusCounts.shipped}
          colorClass="text-blue-700"
        />
        <StatCard
          label={orderStatus.done}
          count={statusCounts.done}
          colorClass="text-status-success"
        />
      </div>

      {/* Recent orders */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {dashboard.recentOrdersTitle}
        </h2>
        {recentOrders.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onViewAllOrders}>
            {dashboard.viewAllOrders}
          </Button>
        )}
      </div>

      {recentOrders.length === 0 ? (
        <EmptyState
          title={emptyStates.noOrdersYet}
          description={emptyStates.noOrdersDescription}
          action={
            <Button onClick={onCreateOrder}>
              {emptyStates.createFirstOrder}
            </Button>
          }
        />
      ) : (
        <Card padding="sm">
          <ul className="divide-y divide-neutral-100 dark:divide-dark-border">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-start transition-colors hover:bg-neutral-50 dark:hover:bg-dark-surface-hover"
                  onClick={() => onOrderClick(order.id)}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {order.orderNumber}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                      {formatDate(order.createdAt, locale)}
                    </p>
                  </div>
                  <Badge variant={order.status as BadgeVariant}>
                    {orderStatus[order.status]}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </main>
  );
}
