import { useState } from "react";
import { Menu, X } from "lucide-react";
import { pokemonRegions } from "../data/pokemonRegions.js";
import SearchBar from "./SearchBar";
import pokedexLogo from "../assets/images/logo-pokedex.webp";

function Header({ allPokemon, searchTerm, loading, onDisplayedPokemonChange, onLoadingChange, onSearchTermChange, onPokemonSelect, onReset, selectedRegion, onRegionSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter Pokemon by selected region with loading delay.
  async function handleRegionClick(regionId) {
    onLoadingChange(true);
    onSearchTermChange("");

    const region = pokemonRegions.find(region => region.id === regionId);
    const filtered = allPokemon.filter(pokemon => pokemon.pokedex_id >= region.range[0] && pokemon.pokedex_id <= region.range[1]);

    setIsMenuOpen(false);
    onRegionSelect(region);

    setTimeout(() => {
      onDisplayedPokemonChange(filtered);
      onLoadingChange(false);
    }, 1000);
  }

  return (
    <header className="relative w-full flex flex-col lg:flex-row justify-between items-center text-slate-50 bg-red-500">
      <div className="w-full lg:w-xs h-full pt-4 lg:p-4 flex flex-row flex-shrink-0 justify-center items-center">
        <h1
          onClick={onReset}
          className="cursor-pointer hover:underline"
        >
          <img className="h-10" src={pokedexLogo} alt="Logo Pokédex" />
        </h1>

        <button
          className="absolute right-4 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav className="w-full lg:h-full lg:block ">
        <div className={`w-full ${isMenuOpen ? "h-125" : "h-0"} lg:h-full lg:p-4 overflow-hidden transition-all duration-300 ease-in-out`}>
          <ul className="w-full h-full pt-4 lg:pt-0 flex flex-col lg:flex-row justify-between lg:justify-center items-center gap-2">
            {pokemonRegions.map(region => (
              <li key={region.id}>
                <button
                  className={`px-4 py-2 text-sm font-medium text-slate-50 border border-slate-50/30 rounded-full bg-slate-50/20 cursor-pointer transition-all duration-200 ease-in-out hover:bg-slate-50/30 hover:-translate-y-0.5 hover:shadow-md ${selectedRegion?.id === region.id ? "bg-slate-50/30 shadow-md -translate-y-0.5" : ""}`}
                  onClick={() => handleRegionClick(region.id)}
                >
                  {region.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
