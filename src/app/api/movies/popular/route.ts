import { getPopularMovies } from '@/features/movies/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));

  const moviesPage = await getPopularMovies(page);

  return NextResponse.json(moviesPage);
}
