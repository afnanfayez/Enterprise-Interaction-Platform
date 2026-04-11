import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { ThemeProvider, ThemeScript } from '@/components/ui/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adel Project',
  description: 'Bilingual country and city selection form',
};

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${cairo.className} bg-white text-neutral-900 dark:bg-dark-bg dark:text-neutral-100 transition-colors`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
