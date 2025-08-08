import { pokemonRegions } from "../data/pokemonRegions.js";
import SearchBar from "./SearchBar";

function Header({ allPokemon, searchTerm, loading, onDisplayedPokemonChange, onLoadingChange, onSearchTermChange, onPokemonSelect, onReset }) {
  // Filter Pokemon by selected region with loading delay.
  async function handleRegionClick(regionId) {
    onLoadingChange(true);
    onSearchTermChange("");

    const region = pokemonRegions.find(region => region.id === regionId);
    const filtered = allPokemon.filter(pokemon => pokemon.pokedex_id >= region.range[0] && pokemon.pokedex_id <= region.range[1]);

    setTimeout(() => {
      onDisplayedPokemonChange(filtered);
      onLoadingChange(false);
    }, 1000);
  }

  return (
    <header>
      <div>
        <h1
          onClick={onReset}
          className="cursor-pointer hover:underline"
          style={{ cursor: "pointer" }}
        >
          Pokédex
        </h1>
      </div>

      <nav className="mt-4">
        <ul>
          {pokemonRegions.map(region => (
            <li key={region.id}>
              <button
                className="cursor-pointer hover:underline"
                onClick={() => handleRegionClick(region.id)}
              >
                {region.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <SearchBar
        allPokemon={allPokemon}
        searchTerm={searchTerm}
        loading={loading}
        onDisplayedPokemonChange={onDisplayedPokemonChange}
        onSearchTermChange={onSearchTermChange}
        onPokemonSelect={onPokemonSelect}
      />
    </header>
  );
}

export default Header;
