'use client';

import { Toaster } from 'sonner';
import type { Direction } from '@/lib/i18n';

interface ToasterProviderProps {
  dir: Direction;
}

export default function ToasterProvider({ dir }: ToasterProviderProps) {
  return (
    <Toaster
      dir={dir}
      position="top-center"
      richColors
      closeButton
      toastOptions={{ duration: 4500 }}
    />
  );
}
