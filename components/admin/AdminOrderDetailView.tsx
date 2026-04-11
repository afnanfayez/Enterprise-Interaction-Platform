'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StatusTimeline from '@/components/ui/StatusTimeline';
import type { TimelineStep } from '@/components/ui/StatusTimeline';
import type { BadgeVariant } from '@/components/ui/Badge';
import type { AppMessages, Locale } from '@/lib/i18n';

// ── Types ────────────────────────────────────────────────────────────────────

export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  orderType: string;
  countryIso2: string;
  city: string;
  currency: string;
  description: string | null;
  quantity: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { email: string; name: string } | null;
  statusHistory?: {
    id: string;
    status: string;
    note: string | null;
    createdAt: string;
    changedBy?: string | null;
  }[];
}

interface AdminOrderDetailViewProps {
  order: OrderDetail;
  locale: Locale;
  messages: AppMessages;
  isUpdating: boolean;
  onUpdateStatus: (status: string, note: string) => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_VALUES = ['received', 'processing', 'shipped', 'done', 'cancelled'] as const;

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}:</span>
      <span className="text-sm text-neutral-900 dark:text-neutral-100">{value ?? '—'}</span>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminOrderDetailView({
  order,
  locale,
  messages,
  isUpdating,
  onUpdateStatus,
}: AdminOrderDetailViewProps) {
  const router = useRouter();
  const od = messages.orderDetail;
  const os = messages.orderStatus;
  const admin = messages.admin;

  const [newStatus, setNewStatus] = useState(order.status);
  const [note, setNote] = useState('');

  // Build timeline steps
  const timelineSteps: TimelineStep[] = STATUS_VALUES
    .filter((s) => s !== 'cancelled')
    .map((s) => {
      const historyEntry = order.statusHistory?.find((h) => h.status === s);
      return {
        status: s,
        label: os[s as keyof typeof os],
        date: historyEntry ? formatDate(historyEntry.createdAt, locale) : undefined,
        note: historyEntry?.note ?? undefined,
      };
    });

  // If cancelled, add it as a separate step
  if (order.status === 'cancelled') {
    const cancelEntry = order.statusHistory?.find((h) => h.status === 'cancelled');
    timelineSteps.push({
      status: 'cancelled',
      label: os.cancelled,
      date: cancelEntry ? formatDate(cancelEntry.createdAt, locale) : undefined,
      note: cancelEntry?.note ?? undefined,
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(newStatus, note);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.push(`/${locale}/admin`)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {messages.orders.backButton}
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {od.title} — {order.orderNumber}
        </h1>
        <Badge variant={order.status as BadgeVariant}>
          {os[order.status as keyof typeof os] ?? order.status}
        </Badge>
      </div>

      {/* Order info card */}
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailRow label={od.orderNumberLabel} value={order.orderNumber} />
          <DetailRow label={od.orderTypeLabel} value={order.orderType} />
          <DetailRow label={od.countryLabel} value={order.countryIso2} />
          <DetailRow label={od.cityLabel} value={order.city} />
          <DetailRow label={od.currencyLabel} value={order.currency} />
          <DetailRow label={od.quantityLabel} value={order.quantity} />
          <DetailRow label={od.createdAtLabel} value={formatDate(order.createdAt, locale)} />
          {order.user && (
            <DetailRow label={messages.auth.emailLabel} value={order.user.email} />
          )}
        </div>
        {order.description && (
          <div className="mt-4 border-t border-neutral-100 dark:border-dark-border pt-4">
            <DetailRow label={od.descriptionLabel} value={order.description} />
          </div>
        )}
        {order.notes && (
          <div className="mt-4 border-t border-neutral-100 dark:border-dark-border pt-4">
            <DetailRow label={od.notesLabel} value={order.notes} />
          </div>
        )}
      </Card>

      {/* Status timeline */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {od.statusHistoryTitle}
        </h2>
        {(order.statusHistory?.length ?? 0) > 0 ? (
          <StatusTimeline steps={timelineSteps} currentStatus={order.status} />
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{od.noHistoryYet}</p>
        )}
      </Card>

      {/* Status update form */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {admin.updateStatusButton}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status select */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-status-select"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {admin.selectNewStatus}
            </label>
            <select
              id="admin-status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="h-[46px] rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition-shadow focus:border-brand-accent focus:shadow-focus-accent dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:focus:border-brand-accent"
            >
              {STATUS_VALUES.map((s) => (
                <option key={s} value={s}>
                  {os[s as keyof typeof os]}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-status-note"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {admin.noteLabel}
            </label>
            <textarea
              id="admin-status-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow focus:border-brand-accent focus:shadow-focus-accent dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:focus:border-brand-accent"
            />
          </div>

          <Button type="submit" loading={isUpdating} disabled={newStatus === order.status && !note}>
            {admin.updateStatusButton}
          </Button>
        </form>
      </Card>
    </div>
  );
}
