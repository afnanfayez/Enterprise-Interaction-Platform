import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
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
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  );
}
