/***********************
* POKEMON IMAGES BEHAVIOR *
***********************/

// Base URL for Pokemon sprites from PokeAPI GitHub repository.
const POKEAPI_GITHUB_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

// Get the URL for a Pokemon's static pixel art image.
export function getPokemonStaticImage(pokemonId) {
  return `${POKEAPI_GITHUB_BASE}/${pokemonId}.png`;
}

// Get the URL for a Pokemon's animated GIF image from Generation V.
export function getPokemonAnimatedImage(pokemonId) {
  return `${POKEAPI_GITHUB_BASE}/versions/generation-v/black-white/animated/${pokemonId}.gif`;
}

// Get the URL for a Pokemon's official artwork (high quality PNG).
export function getPokemonArtwork(pokemonId) {
  return `${POKEAPI_GITHUB_BASE}/other/official-artwork/${pokemonId}.png`;
}

// Handle image loading errors by displaying a default placeholder image.
export function handleImageError(event) {
  event.target.src = `${POKEAPI_GITHUB_BASE}/0.png`;
  event.target.alt = "Illustration non disponible !";
}

// Handle animated image errors by falling back to static image.
export function handleAnimatedImageError(event, pokemonId) {
  event.target.src = getPokemonStaticImage(pokemonId);
  event.target.alt = `${event.target.alt} (image statique)`;
}
