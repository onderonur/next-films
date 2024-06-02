import { searchMovies } from '@/features/search/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page'));

  const moviesPage = await searchMovies(query, page);

  return NextResponse.json(moviesPage);
}
