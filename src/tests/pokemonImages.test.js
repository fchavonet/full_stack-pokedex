import { describe, it, expect } from "vitest";
import { getPokemonStaticImage, getPokemonAnimatedImage, getPokemonArtwork, handleImageError, handleAnimatedImageError} from "../services/pokemonImages.js";

describe("Pokemon Images", () => {
  it("Should generate correct static image URL ->", () => {
    const imageUrl = getPokemonStaticImage(25);

    expect(imageUrl).toBeDefined();
    expect(imageUrl).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
  });

  it("Should generate correct animated image URL ->", () => {
    const imageUrl = getPokemonAnimatedImage(25);

    expect(imageUrl).toBeDefined();
    expect(imageUrl).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif");
  });

  it("Should generate correct artwork image URL ->", () => {
    const imageUrl = getPokemonArtwork(25);

    expect(imageUrl).toBeDefined();
    expect(imageUrl).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png");
  });

  it("Should handle image error with fallback ->", () => {
    const mockEvent = {target: {src: "",alt: ""}};

    handleImageError(mockEvent);

    expect(mockEvent.target.src).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png");
    expect(mockEvent.target.alt).toBe("Illustration non disponible !");
  });

  it("Should handle animated image error with static fallback ->", () => {
    const mockEvent = {target: {src: "",alt: "Pikachu"}};

    handleAnimatedImageError(mockEvent, 25);

    expect(mockEvent.target.src).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
    expect(mockEvent.target.alt).toBe("Pikachu (image statique)");
  });

  it("Should work with different Pokemon IDs ->", () => {
    const charizardStatic = getPokemonStaticImage(500);
    const blastoisAnimated = getPokemonAnimatedImage(800);
    const venusaurArtwork = getPokemonArtwork(1000);

    expect(charizardStatic).toContain("/500.png");
    expect(blastoisAnimated).toContain("/800.gif");
    expect(venusaurArtwork).toContain("/1000.png");
  });
});
