import { useState } from "react";
import { ChevronRight, Loader } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex">
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-2.5 px-3 w-72 md:w-96 rounded-l-lg focus:outline-none text-sm sm:text-base placeholder:text-[#969696]"
      />
      <button
        onClick={handleSearch}
        aria-label={loading ? "Loading search" : "Search"}
        className={`bg-[#2b2b2b] text-white py-2.5 px-3 rounded-r-lg hover:bg-black ${
          loading || query.trim() === ""
            ? "cursor-not-allowed hover:bg-[#2b2b2b]"
            : ""
        }`}
        disabled={loading || query.trim() === ""}
      >
        {loading ? (
          <Loader size={20} className="animate-spin" />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>
    </form>
  );
}
