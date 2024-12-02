import React from "react";
import { Genre } from "../types/movie";
import { Filter } from "lucide-react";

interface FiltersProps {
  genres: Genre[];
  selectedGenre: number | undefined;
  minRating: number;
  onGenreChange: (genreId: number | undefined) => void;
  onRatingChange: (rating: number) => void;
}

/* ADICIONAR FILTRO POR AVALIACAO */

export const Filters: React.FC<FiltersProps> = ({
  genres,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <div className="flex  gap-4  items-center">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300">Filtros:</span>
      </div>

      <select
        value={selectedGenre || ""}
        onChange={(e) =>
          onGenreChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Todos os gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* <div className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-300">Avaliação mínima:</span>
        <select
          value={minRating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="0">Todas</option>
          {[7, 8, 9].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+ ⭐
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};
