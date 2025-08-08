function Sidebar({ pokemonList, loading, searchTerm }) {
  
  function handlePokemonClick(pokemon) {
    console.log(`${pokemon.pokedex_id} - ${pokemon.name.fr} - details`);
  }

  // Display appropriate content based on loading state and Pokemon list.
  function renderContent() {
    if (loading) {
      return <p>Chargement...</p>;
    }

    if (pokemonList.length === 0) {
      if (searchTerm.trim()) {
        return <p>Aucun Pokémon trouvé.</p>;
      }
      return <p>Choisissez une région.</p>;
    }

    const pokemonCount = pokemonList.length;

    return (
      <>
        <p>{pokemonCount} Pokémon</p>

        <ul>
          {pokemonList.map(pokemon => (
            <li key={pokemon.pokedex_id}>
              <button 
                className="cursor-pointer hover:underline"
                onClick={() => handlePokemonClick(pokemon)}
              >
                #{pokemon.pokedex_id.toString().padStart(3, "0")} - {pokemon.name.fr}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <aside>
      {renderContent()}
    </aside>
  );
}

export default Sidebar;
