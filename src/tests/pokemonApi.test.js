import { describe, it, expect } from "vitest";
import { pokemonApi } from "../services/pokemonApi.js";

describe("Pokemon API", () => {
  it("Should fetch all Pokemon ->", async () => {
    const pokemon = await pokemonApi.getAllPokemon();

    expect(pokemon).toBeDefined();
    expect(Array.isArray(pokemon)).toBe(true);
    expect(pokemon.length).toBeGreaterThan(0);
  });

  it("Should fetch Kanto Pokemon ->", async () => {
    const kantoPokemon = await pokemonApi.getPokemonByGeneration(1);

    expect(kantoPokemon).toBeDefined();
    expect(Array.isArray(kantoPokemon)).toBe(true);
    expect(kantoPokemon.length).toBe(151);
  });

  it("Should fetch Pikachu by ID ->", async () => {
    const pikachu = await pokemonApi.getPokemonById(25);

    expect(pikachu).toBeDefined();
    expect(pikachu.pokedex_id).toBe(25);
    expect(pikachu.name.fr.toLowerCase()).toBe("pikachu");
  });

  it("Should fetch Pikachu by name ->", async () => {
    const pikachu = await pokemonApi.getPokemonById("pikachu");

    expect(pikachu).toBeDefined();
    expect(pikachu.pokedex_id).toBe(25);
    expect(pikachu.name.fr.toLowerCase()).toBe("pikachu");
  });
});
