import PokemonList from "./PokemonList";

function Sidebar({ pokemonList, loading, searchTerm, onPokemonSelect }) {
  return (
    <aside className="mt-4">
      <PokemonList 
        pokemonList={pokemonList}
        loading={loading}
        searchTerm={searchTerm}
        onPokemonSelect={onPokemonSelect}
      />
    </aside>
  );
}

export default Sidebar;
