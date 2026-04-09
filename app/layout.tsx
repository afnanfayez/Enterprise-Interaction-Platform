import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import ToasterProvider from '@/components/ui/ToasterProvider';

export const metadata: Metadata = {
  title: 'معلومات العنوان',
  description: 'نموذج اختيار الدولة والمدينة',
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
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
