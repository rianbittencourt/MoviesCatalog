import React, { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { ThemeToggle } from "../components/ThemeToggle";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { searchMovies, getGenres } from "../services/movieService";
import { Movie, Genre } from "../types/movie";
import { Film } from "lucide-react";

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await searchMovies(
        searchQuery,
        page,
        selectedGenre,
        minRating
      );

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMovies();
  }, [searchQuery, selectedGenre, minRating]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies();
    }
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Catálogo de Filmes
              </h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />

            <Filters
              genres={genres}
              selectedGenre={selectedGenre}
              minRating={minRating}
              onGenreChange={setSelectedGenre}
              onRatingChange={setMinRating}
            />
          </div>
        </div>

        {loading && page === 1 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum filme encontrado
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg 
                         hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Carregar Mais"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
