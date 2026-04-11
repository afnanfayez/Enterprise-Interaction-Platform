'use client';

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, required, id, disabled, className = '', ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {required && (
            <span className="ms-0.5 text-brand-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId ?? hintId}
        className={[
          'h-[46px] rounded-lg border px-4 text-sm outline-none transition-shadow',
          error
            ? 'border-brand-danger focus:shadow-focus-danger'
            : 'border-neutral-300 focus:border-brand-accent focus:shadow-focus-accent dark:border-neutral-600 dark:focus:border-brand-accent',
          disabled
            ? 'cursor-not-allowed bg-neutral-50 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
            : 'bg-white text-neutral-900 dark:bg-dark-surface dark:text-neutral-100',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs text-brand-danger">
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className="text-xs text-neutral-400 dark:text-neutral-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
