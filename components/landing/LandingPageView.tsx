'use client';

import Link from 'next/link';
import { ShoppingCart, BarChart3, Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { AppMessages, Locale } from '@/lib/i18n';

interface LandingPageViewProps {
  locale: Locale;
  messages: AppMessages;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export default function LandingPageView({
  locale,
  messages,
  isAuthenticated,
  isLoading,
}: LandingPageViewProps) {
  const t = messages.landing;

  const features = [
    { icon: ShoppingCart, title: t.feature1Title, desc: t.feature1Desc },
    { icon: BarChart3, title: t.feature2Title, desc: t.feature2Desc },
    { icon: Globe, title: t.feature3Title, desc: t.feature3Desc },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-brand-accent-light dark:from-dark-bg dark:to-dark-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <Logo size="lg" className="mb-6" />

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
            {t.heroTitle}
          </h1>

          <p className="mb-8 max-w-lg text-base text-neutral-500 dark:text-neutral-400 sm:text-lg">
            {t.heroSubtitle}
          </p>

          {!isLoading && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {isAuthenticated ? (
                <Link href={`/${locale}/dashboard`}>
                  <Button size="lg">{t.ctaDashboard}</Button>
                </Link>
              ) : (
                <>
                  <Link href={`/${locale}/register`}>
                    <Button size="lg">{t.ctaGetStarted}</Button>
                  </Link>
                  <Link href={`/${locale}/login`}>
                    <Button variant="secondary" size="lg">
                      {t.ctaSignIn}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} padding="lg" className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent-light text-brand-accent dark:bg-brand-accent/15">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
