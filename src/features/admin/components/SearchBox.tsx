interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBox({ searchQuery, setSearchQuery }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
