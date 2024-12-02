import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits } from '../services/movieService';
import { ThemeToggle } from '../components/ThemeToggle';
import { CastList } from '../components/CastList';
import { Movie, Cast } from '../types/movie';
import { ArrowLeft, Star, Calendar } from 'lucide-react';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      try {
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(parseInt(id)),
          getMovieCredits(parseInt(id))
        ]);
        setMovie(movieData);
        setCast(creditsData.cast);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
        Carregando...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
        Filme não encontrado
      </div>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div 
        className="h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-white flex items-center gap-2 hover:text-gray-300 transition"
          >
            <ArrowLeft />
            Voltar
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-32 relative z-10 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="dark:text-gray-300">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm
                           text-gray-700 dark:text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {movie.overview}
          </p>

          <CastList cast={cast} />
        </div>
      </div>
    </div>
  );
};