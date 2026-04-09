import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'معلومات العنوان',
  description: 'نموذج اختيار الدولة والمدينة',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
