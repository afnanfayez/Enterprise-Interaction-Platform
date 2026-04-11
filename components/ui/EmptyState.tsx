'use client';

import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="mb-4 h-16 w-16 text-neutral-300 dark:text-neutral-600" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
