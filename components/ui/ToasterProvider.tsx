'use client';

import { Toaster } from 'sonner';

export default function ToasterProvider() {
  return (
    <Toaster
      dir="rtl"
      position="top-center"
      richColors
      closeButton
      toastOptions={{ duration: 4500 }}
    />
  );
}
