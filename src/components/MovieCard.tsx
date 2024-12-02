import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div 
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105"
    >
      <img 
        src={imageUrl} 
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate text-gray-900 dark:text-gray-100">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-gray-700 dark:text-gray-300">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};