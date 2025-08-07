import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import PokemonDetails from "./component/PokemonDetails";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Sidebar />
        <PokemonDetails />
      </main>

      <Footer />
    </>
  );
}

export default App;
