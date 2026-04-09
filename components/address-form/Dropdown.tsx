'use client';

import { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  flagUrl?: string;
}

interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
  placeholder: string;
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

  const triggerBase =
    'w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all duration-150 outline-none min-h-[46px] font-[inherit]';

  const triggerVariant = disabled
    ? 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-400'
    : open
    ? 'border-blue-500 bg-white shadow-[0_0_0_3px_rgba(59,130,246,0.12)] cursor-pointer'
    : error
    ? 'border-red-400 bg-white cursor-pointer'
    : 'border-gray-300 bg-white hover:border-gray-400 cursor-pointer';

  return (
    <div className="mb-5">
      
      <label
        htmlFor={id}
        className={`block text-sm font-semibold mb-1.5 transition-colors ${
          disabled ? 'text-gray-400' : 'text-gray-700'
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
        >
         
          {selected ? (
            <span className="flex items-center gap-2 text-gray-900 font-medium">
              {selected.flagUrl && (
          
                <img
                  src={selected.flagUrl}
                  alt=""
                  className="w-6 h-[17px] object-cover rounded-sm shadow-sm flex-shrink-0"
                />
              )}
              <span>{selected.label}</span>
            </span>
          ) : (
            <span className="text-gray-400">
              {loading ? 'جاري التحميل...' : placeholder}
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
            className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-drop-in"
          >
            
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 bg-gray-50/80">
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
                placeholder="بحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>

     
            <ul className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-4 text-sm text-gray-400 text-center">
                  لا توجد نتائج
                </li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={selected?.value === opt.value}
                    onClick={() => handleSelect(opt)}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100 ${
                      selected?.value === opt.value
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                   
                    <span>{opt.label}</span>
                    {opt.flagUrl && (
                     
                      <img
                        src={opt.flagUrl}
                        alt={opt.label}
                        className="w-6 h-[17px] object-cover rounded-sm shadow-sm flex-shrink-0"
                      />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <span className="block text-xs text-red-500 mt-1.5">{error}</span>
      )}
    </div>
  );
}
