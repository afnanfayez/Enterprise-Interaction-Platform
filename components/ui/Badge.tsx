'use client';

import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'received'
  | 'processing'
  | 'shipped'
  | 'done'
  | 'cancelled'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface BadgeProps {
  variant: BadgeVariant;
  size?: 'sm' | 'md';
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  received: 'bg-brand-accent-light text-brand-accent dark:bg-brand-accent/15 dark:text-brand-accent-light',
  processing: 'bg-status-warning-light text-status-warning dark:bg-status-warning/15 dark:text-amber-300',
  shipped: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  done: 'bg-status-success-light text-status-success dark:bg-status-success/15 dark:text-emerald-300',
  cancelled: 'bg-brand-danger-light text-brand-danger dark:bg-brand-danger/15 dark:text-red-300',
  info: 'bg-status-info-light text-status-info dark:bg-status-info/15 dark:text-brand-accent-light',
  success: 'bg-status-success-light text-status-success dark:bg-status-success/15 dark:text-emerald-300',
  warning: 'bg-status-warning-light text-status-warning dark:bg-status-warning/15 dark:text-amber-300',
  danger: 'bg-brand-danger-light text-brand-danger dark:bg-brand-danger/15 dark:text-red-300',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
};

export default function Badge({
  variant,
  size = 'md',
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
