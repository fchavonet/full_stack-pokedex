/***********************
* POKEMON API BEHAVIOR *
***********************/

// Base URL for Tyradex Pokemon API.
const BASE_URL = "https://tyradex.app/api/v1";

// HTTP headers for API requests identification and contact.
const headers = {
  "User-Agent": "RobotPokemon",
  "From": "fchavonet@mail.fr",
  "Content-type": "application/json"
};

export const pokemonApi = {
  // Fetch all Pokemon from the API.
  async getAllPokemon() {
    const response = await fetch(`${BASE_URL}/pokemon`, { headers });
    return response.json();
  },

  // Fetch Pokemon filtered by generation number.
  async getPokemonByGeneration(generation) {
    const response = await fetch(`${BASE_URL}/gen/${generation}`, { headers });
    return response.json();
  },

  // Fetch specific Pokemon by ID or name.
  async getPokemonById(id) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, { headers });
    return response.json();
  }
};
