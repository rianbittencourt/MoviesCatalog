import React from "react";
import { Cast } from "../types/movie";
import { Users } from "lucide-react";

interface CastListProps {
  cast: Cast[];
}

export const CastList: React.FC<CastListProps> = ({ cast }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Elenco
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {actor.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
