function PokemonList({ pokemonList, loading, searchTerm, onPokemonSelect }) {
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
        {pokemonList.map(pokemon => (
          <li key={pokemon.pokedex_id}>
            <button
              className="cursor-pointer hover:underline"
              onClick={() => onPokemonSelect(pokemon)}
            >
              #{pokemon.pokedex_id.toString().padStart(3, "0")} - {pokemon.name.fr}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
