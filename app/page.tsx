import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  detectPreferredLocale,
  isLocale,
} from '@/lib/i18n';

export default async function Home() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (isLocale(savedLocale)) {
    redirect(`/${savedLocale}`);
  }

  const requestHeaders = await headers();
  const preferredLocale = detectPreferredLocale(requestHeaders.get('accept-language'));
  redirect(`/${preferredLocale ?? DEFAULT_LOCALE}`);
}
