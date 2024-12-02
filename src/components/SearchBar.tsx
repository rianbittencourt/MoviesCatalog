import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar filmes..."
          className="w-full px-4 py-2 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 px-3 py-1 bg-indigo-600 dark:bg-indigo-500 
                  text-white text-sm rounded hover:bg-indigo-700 
                  dark:hover:bg-indigo-600 transition-colors"
          >
            Limpar
          </button>
        )}
      </div>
    </form>
  );
};
