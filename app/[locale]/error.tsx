'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { getMessages } from '@/lib/i18n';

export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // Error boundaries may lack locale context — show both languages
  const ar = getMessages('ar').errors;
  const en = getMessages('en').errors;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <Logo size="lg" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900">
          {ar.somethingWentWrong}
        </h1>
        <p className="mt-1 text-lg text-neutral-500">
          {en.somethingWentWrong}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-md bg-brand-accent px-6 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-accent-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          >
            {ar.tryAgainButton} / {en.tryAgainButton}
          </button>
          <Link
            href="/"
            className="rounded-md border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {ar.goHomeButton} / {en.goHomeButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
