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
      <p>{pokemonList.length} Pokémon</p>
      
      <ul>
        {pokemonList.map(pokemon => {
          let buttonClass = "cursor-pointer hover:underline";
          
          if (selectedPokemon && selectedPokemon.pokedex_id === pokemon.pokedex_id) {
            buttonClass += " font-bold";
          }

          return (
            <li key={pokemon.pokedex_id}>
              <button
                className={buttonClass}
                onClick={() => onPokemonSelect(pokemon)}
              >
                #{pokemon.pokedex_id.toString().padStart(3, "0")} - {pokemon.name.fr}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokemonList;
