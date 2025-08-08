import PokemonList from "./PokemonList";

function Sidebar({ pokemonList, loading, searchTerm, onPokemonSelect, selectedPokemon }) {
  return (
    <aside className="mt-4">
      <PokemonList 
        pokemonList={pokemonList}
        loading={loading}
        searchTerm={searchTerm}
        onPokemonSelect={onPokemonSelect}
        selectedPokemon={selectedPokemon}
      />
    </aside>
  );
}

export default Sidebar;
