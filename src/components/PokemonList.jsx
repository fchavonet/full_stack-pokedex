import { getPokemonStaticImage, handleImageError } from "../services/pokemonImages.js";

function PokemonList({ pokemonList, loading, searchTerm, onPokemonSelect, selectedPokemon }) {
  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center font-bold border-b border-slate-300 bg-slate-200">
        <div className="flex justify-center items-center gap-2 text-slate-600">
          <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  if (pokemonList.length === 0) {
    if (searchTerm.trim()) {
      return (
        <p className="w-full h-full flex flex-col justify-center items-center">Aucun Pokémon trouvé.</p>
      );
    }
    return (
      <p className="w-full h-full flex flex-col justify-center items-center">Choisissez une région.</p>
    );
  }

  return (
    <div>
      <p className="p-4 hidden lg:flex flex-row justify-center items-center font-bold text-slate-600 border-b border-slate-300 bg-slate-200">{pokemonList.length} Pokémon</p>

      <ul className="p-4 flex flex-row lg:flex-col gap-4 overflow-auto snap-x snap-mandatory lg:snap-none">
        {pokemonList.map(pokemon => {
          let buttonClass = "w-full flex flex-row justify-start items-center border border-slate-300 rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:bg-white hover:shadow-lg hover:-translate-y-0.5";

          if (selectedPokemon && selectedPokemon.pokedex_id === pokemon.pokedex_id) {
            buttonClass += " bg-white shadow-lg -translate-y-0.5";
          } else {
            buttonClass += " bg-slate-50";
          }

          return (
            <li
              className="w-full flex-shrink-0 snap-center lg:snap-align-none"
              key={pokemon.pokedex_id}>
              <button
                className={buttonClass}
                onClick={() => onPokemonSelect(pokemon)}
              >
                <img
                  className="pixelated transform scale-x-[-1]"
                  width="100"
                  height="100"
                  src={getPokemonStaticImage(pokemon.pokedex_id)}
                  alt={pokemon.name.fr}
                  onError={handleImageError}
                />

                <div className="pl-1 flex flex-col justify-center items-start">
                  <span className="text-sm font-light">
                    #{pokemon.pokedex_id.toString().padStart(3, "0")}
                  </span>

                  <span className="font-medium">
                    {pokemon.name.fr}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokemonList;
