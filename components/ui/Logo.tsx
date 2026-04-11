'use client';

import Image from 'next/image';

export interface LogoProps {
  /** 'auto' switches between dark/light logos based on color scheme */
  variant?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizePx: Record<NonNullable<Exclude<LogoProps['size'], undefined>>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

export default function Logo({
  variant = 'auto',
  size = 'md',
  className = '',
}: LogoProps) {
  const px = sizePx[size];

  if (variant === 'dark') {
    return <Image src="/logo-dark.svg" alt="A3" width={px} height={px} className={className} priority />;
  }

  if (variant === 'light') {
    return <Image src="/logo-light.svg" alt="A3" width={px} height={px} className={className} priority />;
  }

  // 'auto': render both; CSS hides the inactive one — no hydration mismatch
  return (
    <span className={`inline-flex ${className}`} style={{ width: px, height: px }}>
      <Image src="/logo-dark.svg" alt="A3" width={px} height={px} className="dark:hidden" priority />
      <Image src="/logo-light.svg" alt="A3" width={px} height={px} className="hidden dark:block" priority />
    </span>
  );
}
