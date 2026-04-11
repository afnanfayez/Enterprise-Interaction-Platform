'use client';

import { ArrowLeft } from 'lucide-react';
import type { AppMessages } from '@/lib/i18n';
import type { TimelineStep } from '@/components/ui/StatusTimeline';
import type { BadgeVariant } from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StatusTimeline from '@/components/ui/StatusTimeline';

export interface OrderDetailData {
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
}

export interface OrderDetailViewProps {
  messages: AppMessages;
  order: OrderDetailData;
  currentStatus: string;
  timelineSteps: TimelineStep[];
  onBack: () => void;
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

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === '') return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="min-w-[140px] text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </dt>
      <dd className="text-sm text-neutral-900 dark:text-neutral-100">{value}</dd>
    </div>
  );
}

export default function OrderDetailView({
  messages,
  order,
  currentStatus,
  timelineSteps,
  onBack,
}: OrderDetailViewProps) {
  const t = messages.orderDetail;
  const statusLabel =
    messages.orderStatus[currentStatus as keyof typeof messages.orderStatus] ??
    currentStatus;
  const typeLabel =
    messages.orders.orderTypes[
      order.orderType as keyof typeof messages.orders.orderTypes
    ] ?? order.orderType;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4" />
        {messages.orders.backButton}
      </Button>

      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t.title}</h1>

      <Card padding="lg" className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t.orderNumberLabel}: {order.orderNumber ?? order.id}
          </h2>
          <Badge variant={statusToBadgeVariant(currentStatus)}>
            {statusLabel}
          </Badge>
        </div>

        <dl className="flex flex-col gap-3">
          <InfoRow label={t.orderTypeLabel} value={typeLabel} />
          <InfoRow label={t.createdAtLabel} value={order.createdAt} />
          <InfoRow label={t.countryLabel} value={order.countryIso2} />
          <InfoRow label={t.cityLabel} value={order.city} />
          <InfoRow label={t.currencyLabel} value={order.currency} />
          <InfoRow label={t.descriptionLabel} value={order.description} />
          <InfoRow label={t.quantityLabel} value={order.quantity} />
          <InfoRow label={t.notesLabel} value={order.notes} />
        </dl>
      </Card>

      <Card padding="lg">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t.statusHistoryTitle}
        </h2>
        {timelineSteps.length > 0 ? (
          <StatusTimeline steps={timelineSteps} currentStatus={currentStatus} />
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.noHistoryYet}</p>
        )}
      </Card>
    </div>
  );
}
