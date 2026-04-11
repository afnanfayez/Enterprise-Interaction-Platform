'use client';

import { Check } from 'lucide-react';

export interface TimelineStep {
  status: string;
  label: string;
  date?: string;
  note?: string;
}

export interface StatusTimelineProps {
  steps: TimelineStep[];
  currentStatus: string;
}

type StepState = 'completed' | 'current' | 'future';

function resolveStepStates(
  steps: TimelineStep[],
  currentStatus: string,
): StepState[] {
  const currentIdx = steps.findIndex((s) => s.status === currentStatus);
  return steps.map((_, i) => {
    if (currentIdx < 0) return 'future';
    if (i < currentIdx) return 'completed';
    if (i === currentIdx) return 'current';
    return 'future';
  });
}

export default function StatusTimeline({
  steps,
  currentStatus,
}: StatusTimelineProps) {
  const states = resolveStepStates(steps, currentStatus);

  return (
    <ol className="flex flex-col" aria-label="Order status timeline">
      {steps.map((step, i) => {
        const state = states[i];
        const isLast = i === steps.length - 1;

        return (
          <li key={step.status} className="flex gap-3 rtl:flex-row-reverse">
            {/* Connector column */}
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div className="relative flex-shrink-0">
                {state === 'completed' && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </div>
                )}
                {state === 'current' && (
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-white">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-30" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                  </div>
                )}
                {state === 'future' && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-600 dark:bg-dark-surface">
                    <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  </div>
                )}
              </div>

              {/* Vertical line */}
              {!isLast && (
                <div
                  className={[
                    'w-0.5 grow',
                    state === 'completed' || state === 'current'
                      ? 'bg-brand-accent'
                      : 'bg-neutral-200 dark:bg-neutral-700',
                  ].join(' ')}
                  style={{ minHeight: 32 }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
              <p
                className={[
                  'text-sm leading-7',
                  state === 'current'
                    ? 'font-semibold text-brand-accent'
                    : state === 'completed'
                      ? 'text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-400',
                ].join(' ')}
              >
                {step.label}
              </p>
              {step.date && (
                <p className="text-xs text-neutral-400">{step.date}</p>
              )}
              {step.note && (
                <p className="text-sm italic text-neutral-500 dark:text-neutral-400">{step.note}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
