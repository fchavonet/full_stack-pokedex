import { pokemonRegions } from "../data/pokemonRegions.js";
import { pokemonApi } from "../services/pokemonApi.js";

const MIN_LOADING_TIME = 1000;

function Header({ onPokemonListChange, onLoadingChange }) {

  // Filters Pokemon by selected region with loading delay.
  async function handleRegionClick(regionId) {
    onLoadingChange(true);

    const startTime = Date.now();

    try {
      const region = pokemonRegions.find(region => region.id === regionId);
      const allPokemon = await pokemonApi.getAllPokemon();

      const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.pokedex_id >= region.range[0] &&
        pokemon.pokedex_id <= region.range[1]
      );

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      onPokemonListChange(filteredPokemon);
    } catch (error) {
      console.error(error);
    } finally {
      onLoadingChange(false);
    }
  }

  return (
    <header>
      <nav>
        <ul>
          {pokemonRegions.map(region => (
            <li
              key={region.id}
            >
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
    </header>
  );
}

export default Header;
