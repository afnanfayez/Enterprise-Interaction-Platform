'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { getMessages } from '@/lib/i18n';

export default function OrdersError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const ar = getMessages('ar');
  const en = getMessages('en');

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <Logo size="lg" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900">
          {ar.errors.somethingWentWrong}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {ar.errors.networkError}
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          {en.errors.networkError}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-md bg-brand-accent px-6 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-accent-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          >
            {ar.errors.tryAgainButton} / {en.errors.tryAgainButton}
          </button>
          <Link
            href="/"
            className="rounded-md border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {ar.errors.goHomeButton} / {en.errors.goHomeButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
