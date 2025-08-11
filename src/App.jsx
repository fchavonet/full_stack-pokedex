import "./App.css";
import { useState, useEffect } from "react";
import { pokemonApi } from "./services/pokemonApi.js";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PokemonDetails from "./components/PokemonDetails";
import Footer from "./components/Footer";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all Pokemon data on component mount and set Pikachu as default.
  useEffect(() => {
    async function loadAllPokemon() {
      try {
        const data = await pokemonApi.getAllPokemon();
        setAllPokemon(data);

        const pikachu = data.filter(pokemon => pokemon.pokedex_id === 25);

        setDisplayedPokemon(pikachu);

        if (pikachu.length > 0) {
          setSelectedPokemon(pikachu[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadAllPokemon();
  }, []);

  // Reset display to show only Pikachu and clear search.
  function handleReset() {
    const pikachu = allPokemon.filter(pokemon => pokemon.pokedex_id === 25);
    setDisplayedPokemon(pikachu);

    if (pikachu.length > 0) {
      setSelectedPokemon(pikachu[0]);
    }

    setSearchTerm("");
    setSelectedRegion(null);
    setLoading(false);
  }

  return (
    <div className="lg:h-screen flex flex-col overflow-hidden">
      <Header
        allPokemon={allPokemon}
        searchTerm={searchTerm}
        loading={loading}
        selectedRegion={selectedRegion}
        onDisplayedPokemonChange={setDisplayedPokemon}
        onLoadingChange={setLoading}
        onSearchTermChange={setSearchTerm}
        onRegionSelect={setSelectedRegion}
        onPokemonSelect={setSelectedPokemon}
        onReset={handleReset}
      />

      <main className="lg:h-0 flex flex-col lg:flex-row lg:flex-1 overflow-hidden">
        <Sidebar
          pokemonList={displayedPokemon}
          loading={loading}
          searchTerm={searchTerm}
          selectedPokemon={selectedPokemon}
          onPokemonSelect={setSelectedPokemon}
        />

        <PokemonDetails
          pokemon={selectedPokemon}
          allPokemon={allPokemon}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
