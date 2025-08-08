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

// Simple in-memory cache with TTL (Time To Live).
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds

// Helper function to get cached data if still valid.
function getCachedData(key) {
  const cached = cache.get(key);

  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  // Remove expired cache entry.
  if (cached) {
    cache.delete(key);
  }

  return null;
}

// Helper function to set data in cache with expiration.
function setCachedData(key, data) {
  cache.set(key, {
    data: data,
    expiry: Date.now() + CACHE_TTL
  });
}

export const pokemonApi = {
  // Fetch all Pokemon from the API.
  async getAllPokemon() {
    const cacheKey = "all-pokemon";
    
    // Check cache first.
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    // Fetch from API if not cached.
    const response = await fetch(`${BASE_URL}/pokemon`, { headers });
    const data = await response.json();
    
    // Store in cache.
    setCachedData(cacheKey, data);
    
    return data;
  },

  // Fetch Pokemon filtered by generation number.
  async getPokemonByGeneration(generation) {
    const cacheKey = `gen-${generation}`;
    
    // Check cache first.
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    // Fetch from API if not cached.
    const response = await fetch(`${BASE_URL}/gen/${generation}`, { headers });
    const data = await response.json();
    
    // Store in cache.
    setCachedData(cacheKey, data);
    
    return data;
  },

  // Fetch specific Pokemon by ID or name.
  async getPokemonById(id) {
    const cacheKey = `pokemon-${id}`;
    
    // Check cache first.
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    // Fetch from API if not cached.
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, { headers });
    const data = await response.json();
    
    // Store in cache.
    setCachedData(cacheKey, data);
    
    return data;
  },

  // Clear all cache.
  clearCache() {
    cache.clear();
  }
};
