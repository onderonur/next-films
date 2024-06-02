import { getTopRatedMovies } from '@/features/movies/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));

  const moviesPage = await getTopRatedMovies(page);

  return NextResponse.json(moviesPage);
}
