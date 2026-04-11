'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ label, showLabel = false, className = '' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label ?? 'Toggle theme'}
      className={[
        'relative inline-flex items-center gap-2 rounded-lg border border-neutral-300 p-2 text-neutral-600 transition-colors hover:bg-neutral-50',
        'dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700',
        className,
      ].join(' ')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      {showLabel && (
        <span className="text-sm font-medium">
          {resolvedTheme === 'dark' ? (label ?? 'Dark') : (label ?? 'Light')}
        </span>
      )}
    </button>
  );
}
