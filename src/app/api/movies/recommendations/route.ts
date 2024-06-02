import { getMovieRecommendations } from '@/features/movies/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const movieId = Number(searchParams.get('movieId'));
  const page = Number(searchParams.get('page'));

  const moviesPage = await getMovieRecommendations(movieId, page);

  return NextResponse.json(moviesPage);
}
