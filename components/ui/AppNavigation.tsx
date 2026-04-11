'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  type AppMessages,
  type Locale,
  isLocale,
} from '@/lib/i18n';

interface AppNavigationProps {
  locale: Locale;
  messages: AppMessages;
}

function withLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join('/')}`;
}

export default function AppNavigation({ locale, messages }: AppNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const nextLocale: Locale = locale === 'ar' ? 'en' : 'ar';

  const nav = messages.navigation;
  const auth = messages.auth;

  const switchLocale = () => {
    const nextPath = withLocaleInPath(pathname, nextLocale);
    const query = typeof window !== 'undefined' ? window.location.search : '';
    const href = query ? `${nextPath}${query}` : nextPath;

    void fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.push(href);
  };

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    {
      href: `/${locale}/dashboard`,
      label: nav.dashboard,
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/orders`,
      label: nav.orders,
      icon: ShoppingCart,
    },
    {
      href: `/${locale}/profile`,
      label: nav.profile,
      icon: User,
    },
  ];

  const closeMobile = () => setMobileOpen(false);

  if (isLoading) return null;

  // Unauthenticated: show login/register links
  if (!user) {
    return (
      <nav className="border-b border-neutral-200 bg-white shadow-card dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-lg font-bold text-brand-primary dark:text-neutral-100">
              {messages.header.projectName}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/login`}
              className="rounded-lg px-4 py-2 text-sm font-medium text-brand-accent hover:bg-brand-accent-light dark:hover:bg-brand-accent/10 transition-colors"
            >
              {auth.loginButton}
            </Link>
            <Link
              href={`/${locale}/register`}
              className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:bg-brand-accent-dark transition-colors"
            >
              {auth.registerButton}
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={switchLocale}
              aria-label={messages.header.languageSwitcherLabel}
              className="rounded-lg border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-dark-surface-hover transition-colors"
            >
              <Globe className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Authenticated navigation
  return (
    <>
      <nav className="border-b border-neutral-200 bg-white shadow-card dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="hidden text-lg font-bold text-brand-primary dark:text-neutral-100 sm:block">
              {messages.header.projectName}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-brand-accent-light text-brand-accent'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-dark-surface-hover dark:hover:text-neutral-100',
                  ].join(' ')}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop right side */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <button
              type="button"
              onClick={switchLocale}
              aria-label={messages.header.languageSwitcherLabel}
              className="rounded-lg border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-dark-surface-hover transition-colors"
            >
              <Globe className="h-4 w-4" />
            </button>
            <LogoutButton locale={locale} label={auth.logoutButton} />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay + sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside className="absolute inset-y-0 start-0 flex w-72 flex-col bg-white shadow-dropdown animate-drop-in dark:bg-dark-surface">
            {/* Sidebar header */}
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 dark:border-dark-border px-4">
              <Link
                href={`/${locale}/dashboard`}
                onClick={closeMobile}
                className="flex items-center gap-2"
              >
                <Logo size="sm" />
                <span className="text-lg font-bold text-brand-primary dark:text-neutral-100">
                  {messages.header.projectName}
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close menu"
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar links */}
            <div className="flex flex-1 flex-col gap-1 p-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={[
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-brand-accent-light text-brand-accent'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-dark-surface-hover dark:hover:text-neutral-100',
                    ].join(' ')}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar footer */}
            <div className="border-t border-neutral-200 dark:border-dark-border p-4">
              <ThemeToggle className="mb-2 w-full justify-start" />
              <button
                type="button"
                onClick={switchLocale}
                className="mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-dark-surface-hover transition-colors"
              >
                <Globe className="h-5 w-5" />
                {messages.header.switchButtonLabel}
              </button>
              <LogoutButton locale={locale} label={auth.logoutButton} fullWidth />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function LogoutButton({
  locale,
  label,
  fullWidth,
}: {
  locale: Locale;
  label: string;
  fullWidth?: boolean;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/login`);
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={[
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-danger hover:bg-brand-danger-light transition-colors',
        fullWidth ? 'w-full' : '',
      ].join(' ')}
    >
      <LogOut className="h-4 w-4" />
      {label}
    </button>
  );
}
