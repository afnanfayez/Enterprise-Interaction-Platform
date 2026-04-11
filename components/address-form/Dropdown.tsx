'use client';

import { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  flag?: string;
}

export interface DropdownTexts {
  searchPlaceholder: string;
  searchAriaPrefix: string;
  loadingText: string;
  noResultsText: string;
}

interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
  placeholder: string;
  texts: DropdownTexts;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
}

export default function Dropdown({
  id,
  label,
  options,
  selected,
  onSelect,
  placeholder,
  texts,
  disabled = false,
  loading = false,
  error,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((opt) =>
    opt.label.includes(search) ||
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 30);
  }, [open]);

  const handleToggle = () => {
    if (disabled || loading) return;
    setOpen((o) => !o);
  };

  const handleSelect = (opt: DropdownOption) => {
    onSelect(opt);
    setOpen(false);
    setSearch('');
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    option: DropdownOption
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(option);
    }
  };

  const triggerBase =
    'w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all duration-150 outline-none min-h-[46px] font-[inherit]';

  const triggerVariant = disabled
    ? 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-400 dark:bg-dark-bg dark:border-dark-border dark:text-neutral-500'
    : open
    ? 'border-brand-accent bg-white shadow-focus-accent cursor-pointer dark:bg-dark-surface dark:text-neutral-100'
    : error
    ? 'border-red-400 bg-white cursor-pointer dark:bg-dark-surface dark:text-neutral-100'
    : 'border-neutral-300 bg-white hover:border-brand-accent cursor-pointer dark:border-dark-border dark:bg-dark-surface dark:hover:border-brand-accent dark:hover:bg-dark-surface-hover dark:text-neutral-100';

  return (
    <div className="mb-5">
      
      <label
        htmlFor={id}
        className={`block text-sm font-semibold mb-1.5 transition-colors ${
          disabled ? 'text-gray-400 dark:text-neutral-600' : 'text-gray-700 dark:text-neutral-300'
        }`}
      >
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative" ref={containerRef}>
    
        <button
          id={id}
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`${triggerBase} ${triggerVariant}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={error ? `${id}-error` : undefined}
        >
         
          {selected ? (
            <span className="flex items-center gap-2 text-gray-900 dark:text-neutral-100 font-medium">
              {selected.flag && (
                <span className="w-6 text-center leading-none flex-shrink-0">
                  {selected.flag}
                </span>
              )}
              <span>{selected.label}</span>
            </span>
          ) : (
            <span className="text-gray-400 dark:text-neutral-500">
              {loading ? texts.loadingText : placeholder}
            </span>
          )}

          
          <svg
            className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

      
        {open && (
          <div
            role="listbox"
            className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-xl z-50 overflow-hidden animate-drop-in"
          >
            
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-dark-border bg-gray-50/80 dark:bg-dark-bg">
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder={texts.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label={`${texts.searchAriaPrefix} ${label}`}
                className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-neutral-200 placeholder-gray-400 dark:placeholder-neutral-500"
              />
            </div>

     
            <ul className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-4 text-sm text-gray-400 dark:text-neutral-500 text-center">
                  {texts.noResultsText}
                </li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={selected?.value === opt.value}
                    onClick={() => handleSelect(opt)}
                    onKeyDown={(event) => handleOptionKeyDown(event, opt)}
                    tabIndex={0}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100 ${
                      selected?.value === opt.value
                        ? 'bg-brand-accent-light text-brand-accent font-semibold dark:bg-brand-accent/20 dark:text-brand-accent'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-dark-surface-hover'
                    }`}
                  >
                   
                    <span>{opt.label}</span>
                    {opt.flag && (
                      <span className="w-6 text-center leading-none flex-shrink-0">
                        {opt.flag}
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className="block text-xs text-red-500 mt-1.5">
          {error}
        </span>
      )}
    </div>
  );
}
