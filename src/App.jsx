import "./App.css";
import { useState } from "react";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import PokemonDetails from "./component/PokemonDetails";
import Footer from "./component/Footer";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header
        onPokemonListChange={setPokemonList}
        onLoadingChange={setLoading}
      />

      <main>
        <Sidebar
          pokemonList={pokemonList}
          loading={loading}
        />
        <PokemonDetails />
      </main>

      <Footer />
    </>
  );
}

export default App;
