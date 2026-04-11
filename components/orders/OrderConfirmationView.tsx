'use client';

import { CheckCircle } from 'lucide-react';
import type { AppMessages } from '@/lib/i18n';
import type { TimelineStep } from '@/components/ui/StatusTimeline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusTimeline from '@/components/ui/StatusTimeline';

export interface OrderConfirmationViewProps {
  messages: AppMessages;
  orderId: string;
  orderNumber?: string;
  currentStatus: string;
  timelineSteps: TimelineStep[];
  onViewOrder: () => void;
  onCreateAnother: () => void;
}

export default function OrderConfirmationView({
  messages,
  orderId,
  orderNumber,
  currentStatus,
  timelineSteps,
  onViewOrder,
  onCreateAnother,
}: OrderConfirmationViewProps) {
  const t = messages.orderConfirmation;
  const displayNumber = orderNumber ?? orderId;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Card padding="lg">
        <div className="flex flex-col items-center text-center">
          <CheckCircle
            className="h-16 w-16 text-status-success"
            aria-hidden="true"
          />

          <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{t.subtitle}</p>

          <div className="mt-6 rounded-lg bg-neutral-50 px-6 py-3 dark:bg-dark-surface">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.orderNumberLabel}
            </span>
            <p className="text-lg font-bold text-brand-accent">
              {displayNumber}
            </p>
          </div>

          <div className="mt-8 w-full text-start">
            <StatusTimeline
              steps={timelineSteps}
              currentStatus={currentStatus}
            />
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button onClick={onViewOrder} fullWidth>
              {t.viewOrderButton}
            </Button>
            <Button variant="secondary" onClick={onCreateAnother} fullWidth>
              {t.createAnotherButton}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
