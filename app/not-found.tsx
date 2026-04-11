import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-dark-bg px-4">
      <div className="text-center">
        {/* Logo */}
        <Image
          src="/logo-dark.svg"
          alt="A3 Logo"
          width={48}
          height={48}
          className="mx-auto mb-8"
        />

        {/* 404 */}
        <p className="text-8xl font-bold text-brand-accent">404</p>

        {/* Bilingual title & subtitle */}
        <h1 className="mt-4 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          الصفحة غير موجودة
        </h1>
        <p className="mt-1 text-lg text-neutral-500 dark:text-neutral-400">Page Not Found</p>

        <p className="mt-2 text-sm text-neutral-400">
          عذراً، الصفحة التي تبحث عنها غير متوفرة
        </p>
        <p className="text-sm text-neutral-400">
          Sorry, the page you are looking for does not exist
        </p>

        {/* Home link */}
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-brand-accent px-6 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-accent-dark"
        >
          العودة للرئيسية / Go Home
        </Link>
      </div>
    </div>
  );
}
