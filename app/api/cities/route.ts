import { NextResponse } from 'next/server';
import { getCitiesByCountryIso2 } from '@/lib/server/location-data';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const iso2 = searchParams.get('iso2');

  if (!iso2) {
    return NextResponse.json(
      { error: 'Missing required query parameter: iso2' },
      { status: 400 }
    );
  }

  try {
    const cities = await getCitiesByCountryIso2(iso2);
    return NextResponse.json({ data: cities });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid iso2') {
      return NextResponse.json({ error: 'Invalid iso2 value' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to load cities' }, { status: 500 });
  }
}
