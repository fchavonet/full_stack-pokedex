function SearchBar({ allPokemon, onDisplayedPokemonChange, searchTerm, onSearchTermChange, loading }) {
  // Remove accents and normalize text for better search matching.
  function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Search Pokemon by ID number or name with normalized text.
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const filtered = allPokemon.filter(pokemon => {
      const cleanNumber = searchTerm.replace("#", "");

      if (/^\d+$/.test(cleanNumber)) {
        return pokemon.pokedex_id === parseInt(cleanNumber);
      }

      const searchNormalized = normalizeString(searchTerm);
      const pokemonNameNormalized = normalizeString(pokemon.name.fr);
      return pokemonNameNormalized.includes(searchNormalized);
    });

    onDisplayedPokemonChange(filtered);
  };

  return (
    <div>
      <input
        className="border"
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSearch()}
        disabled={loading}
      />

      <button
        onClick={handleSearch}
        disabled={loading || !searchTerm.trim()}>
        Rechercher
      </button>
    </div>
  );
}

export default SearchBar;
