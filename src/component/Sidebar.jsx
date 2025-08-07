function Sidebar({ pokemonList, loading }) {
  if (loading) {
    return (
      <aside>
        <p>Chargement...</p>
      </aside>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <aside>
        <p>Choisissez une région.</p>
      </aside>
    );
  }

  return (
    <aside>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.pokedex_id}>
            <button
              className="cursor-pointer hover:underline"
            >
              {"#" + pokemon.pokedex_id.toString().padStart(3, "0")} - {pokemon.name.fr}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
