'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  padding = 'md',
  hoverable = false,
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'rounded-[10px] border border-neutral-200 bg-white shadow-card dark:border-dark-border dark:bg-dark-surface dark:shadow-none',
        hoverable ? 'transition-colors transition-shadow hover:shadow-card-hover dark:hover:bg-dark-surface-hover' : '',
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
