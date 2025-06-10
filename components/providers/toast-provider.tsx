'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        duration: 3000,
        style: {
          background: 'rgb(17, 24, 39)',
          color: 'white',
          border: '1px solid rgb(55, 65, 81)',
        },
        className: 'dark',
      }}
    />
  );
} 