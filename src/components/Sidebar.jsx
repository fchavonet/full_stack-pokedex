import PokemonList from "./PokemonList";

function Sidebar({ pokemonList, loading, searchTerm, onPokemonSelect, selectedPokemon }) {
  return (
    <aside className="w-full lg:w-xs border-b border-r-0 lg:border-b-0 lg:border-r border-slate-300 bg-slate-100 overflow-auto no-scrollbar">
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
