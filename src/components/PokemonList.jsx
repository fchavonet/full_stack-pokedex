import { getPokemonStaticImage, handleImageError } from "../services/pokemonImages.js";

function PokemonList({ pokemonList, loading, searchTerm, onPokemonSelect, selectedPokemon }) {
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (pokemonList.length === 0) {
    if (searchTerm.trim()) {
      return <p>Aucun Pokémon trouvé.</p>;
    }
    return <p>Choisissez une région.</p>;
  }

  return (
    <div>
      <p className="p-4 hidden lg:flex flex-row justify-center items-center bg-zinc-200">{pokemonList.length} Pokémon</p>

      <ul className="p-4 flex flex-row lg:flex-col gap-4 overflow-auto snap-x snap-mandatory lg:snap-none">
        {pokemonList.map(pokemon => {
          let buttonClass = "w-full flex flex-row justify-center items-center border cursor-pointer hover:underline";

          if (selectedPokemon && selectedPokemon.pokedex_id === pokemon.pokedex_id) {
            buttonClass += " font-bold";
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
                  className="pixelated"
                  width="100"
                  height="100"
                  src={getPokemonStaticImage(pokemon.pokedex_id)}
                  alt={pokemon.name.fr}
                  onError={handleImageError}
                />

                <span className="text-left">
                  #{pokemon.pokedex_id.toString().padStart(3, "0")}
                  <br />
                  {pokemon.name.fr}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokemonList;
