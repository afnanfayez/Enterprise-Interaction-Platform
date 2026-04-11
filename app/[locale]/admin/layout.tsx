import { notFound } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isLocale, getMessages, type Locale } from '@/lib/i18n';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-bg">
      <AdminSidebar locale={locale as Locale} messages={messages} />

      {/* Main content: offset by sidebar width on desktop */}
      <main className="lg:ps-[260px]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
