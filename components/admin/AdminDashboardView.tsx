'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import type { AppMessages, Locale } from '@/lib/i18n';
import type { BadgeVariant } from '@/components/ui/Badge';

// ── Types ────────────────────────────────────────────────────────────────────

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  orderType: string;
  description: string | null;
  quantity: number | null;
  notes: string | null;
  createdAt: string;
  user?: { email: string; name: string } | null;
}

export interface DashboardStats {
  total: number;
  received: number;
  processing: number;
  shipped: number;
  done: number;
  cancelled: number;
}

interface AdminDashboardViewProps {
  orders: OrderSummary[];
  stats: DashboardStats;
  locale: Locale;
  messages: AppMessages;
  isLoading: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  received: 'bg-brand-accent-light text-brand-accent border-brand-accent/20',
  processing: 'bg-status-warning-light text-status-warning border-status-warning/20',
  shipped: 'bg-blue-50 text-blue-700 border-blue-200',
  done: 'bg-status-success-light text-status-success border-status-success/20',
  cancelled: 'bg-brand-danger-light text-brand-danger border-brand-danger/20',
};

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboardView({
  orders,
  stats,
  locale,
  messages,
  isLoading,
}: AdminDashboardViewProps) {
  const router = useRouter();
  const m = messages.admin;
  const d = messages.dashboard;
  const os = messages.orderStatus;
  const ol = messages.ordersList;

  const statCards: { label: string; count: number; status?: string }[] = [
    { label: d.totalOrders, count: stats.total },
    { label: os.received, count: stats.received, status: 'received' },
    { label: os.processing, count: stats.processing, status: 'processing' },
    { label: os.shipped, count: stats.shipped, status: 'shipped' },
    { label: os.done, count: stats.done, status: 'done' },
    { label: os.cancelled, count: stats.cancelled, status: 'cancelled' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{m.dashboardTitle}</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((card) => {
          const colorClass = card.status
            ? STATUS_COLORS[card.status] ?? ''
            : 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-dark-surface dark:text-neutral-300 dark:border-dark-border';

          return (
            <Card key={card.label} padding="sm" className={`border ${colorClass}`}>
              <p className="text-xs font-medium opacity-80">{card.label}</p>
              <p className="mt-1 text-2xl font-bold">{card.count}</p>
            </Card>
          );
        })}
      </div>

      {/* Orders table */}
      {orders.length === 0 ? (
        <EmptyState
          title={messages.emptyStates.noOrdersYet}
          description={messages.emptyStates.noOrdersDescription}
        />
      ) : (
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-dark-border text-neutral-500 dark:text-neutral-400">
                  <th className="px-4 py-3 text-start font-medium">{ol.orderNumberColumn}</th>
                  <th className="px-4 py-3 text-start font-medium">{messages.orderDetail.orderTypeLabel}</th>
                  <th className="px-4 py-3 text-start font-medium">{ol.dateColumn}</th>
                  <th className="px-4 py-3 text-start font-medium">{ol.statusColumn}</th>
                  <th className="px-4 py-3 text-start font-medium">{messages.orderDetail.descriptionLabel}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/${locale}/admin/orders/${order.id}`)}
                    className="cursor-pointer border-b border-neutral-100 dark:border-dark-border transition-colors hover:bg-neutral-50 dark:hover:bg-dark-surface-hover"
                  >
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                      {order.user?.email ?? order.user?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                      {formatDate(order.createdAt, locale)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={order.status as BadgeVariant}>
                        {os[order.status as keyof typeof os] ?? order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate text-neutral-500 dark:text-neutral-400">
                      {order.description ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
