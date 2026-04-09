import { NextResponse } from 'next/server';
import { getArabCountries } from '@/lib/server/location-data';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const countries = await getArabCountries();
    return NextResponse.json({ data: countries });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load countries' },
      { status: 500 }
    );
  }
}
