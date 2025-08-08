import "./App.css";
import { useState, useEffect } from "react";
import { pokemonApi } from "./services/pokemonApi.js";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import PokemonDetails from "./component/PokemonDetails";
import Footer from "./component/Footer";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load all Pokemon data on component mount and set Pikachu as default.
  useEffect(() => {
    async function loadAllPokemon() {
      try {
        const data = await pokemonApi.getAllPokemon();
        setAllPokemon(data);

        const pikachu = data.filter(pokemon => pokemon.pokedex_id === 25);

        setDisplayedPokemon(pikachu);
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
    setSearchTerm("");
    setLoading(false);
  }

  return (
    <>
      <Header
        allPokemon={allPokemon}
        onDisplayedPokemonChange={setDisplayedPokemon}
        onLoadingChange={setLoading}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        loading={loading}
        onReset={handleReset}
      />

      <main>
        <Sidebar
          pokemonList={displayedPokemon}
          loading={loading}
          searchTerm={searchTerm}
        />

        <PokemonDetails />
      </main>

      <Footer />
    </>
  );
}

export default App;
