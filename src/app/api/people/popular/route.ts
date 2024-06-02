import { getPopularPeople } from '@/features/people/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));

  const peoplePage = await getPopularPeople(page);

  return NextResponse.json(peoplePage);
}
