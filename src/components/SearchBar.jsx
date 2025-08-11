import { Search } from "lucide-react";

function SearchBar({ allPokemon, onDisplayedPokemonChange, searchTerm, onSearchTermChange, loading, onPokemonSelect }) {
  // Remove accents and normalize text for better search matching.
  function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Search Pokemon by ID number or name with normalized text.
  function handleSearch() {
    if (!searchTerm.trim()) return;

    const filtered = allPokemon.filter(pokemon => {
      const cleanNumber = searchTerm.replace("#", "");

      // Check if search term is a number (with or without #).
      if (/^\d+$/.test(cleanNumber)) {
        return pokemon.pokedex_id === parseInt(cleanNumber);
      }

      const searchNormalized = normalizeString(searchTerm);
      const pokemonNameNormalized = normalizeString(pokemon.name.fr);

      return pokemonNameNormalized.includes(searchNormalized);
    });

    onDisplayedPokemonChange(filtered);

    // Auto-select Pokemon if only one result found.
    if (filtered.length === 1) {
      onPokemonSelect(filtered[0]);
    }
  }

  return (
    <div className="w-full md:w-100 h-full p-4 flex flex-row justify-center itemsècenter gap-2">
      <input
        className="w-full px-2 py-1 border"
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSearch()}
        disabled={loading}
      />

      <button
        className="cursor-pointer"
        onClick={handleSearch}
        disabled={loading || !searchTerm.trim()}>
        <Search />
      </button>
    </div>
  );
}

export default SearchBar;
