'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/components/auth/AuthProvider';
import type { AppMessages, Locale } from '@/lib/i18n';

interface AdminSidebarProps {
  locale: Locale;
  messages: AppMessages;
}

export default function AdminSidebar({ locale, messages }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const admin = messages.admin;
  const nav = messages.navigation;

  const links = [
    {
      href: `/${locale}/admin`,
      label: nav.admin,
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/admin/orders`,
      label: nav.adminOrders,
      icon: ShoppingCart,
    },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/login`);
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <Logo size="sm" variant="light" />
        <span className="text-base font-bold text-white">
          {admin.dashboardTitle}
        </span>
      </div>

      {/* Links */}
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-accent text-white'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {messages.auth.logoutButton}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-[260px] bg-brand-primary lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-neutral-200 dark:border-dark-border bg-brand-primary px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Logo size="sm" variant="light" />
          <span className="text-sm font-bold text-white">
            {admin.dashboardTitle}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="rounded-lg p-2 text-white hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay + sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 start-0 w-[260px] bg-brand-primary shadow-dropdown animate-drop-in">
            <div className="absolute end-0 top-0 p-2">
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close admin menu"
                className="rounded-lg p-2 text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
