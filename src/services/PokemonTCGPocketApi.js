/****************************
* TCG POCKET CARDS BEHAVIOR *
****************************/

// Base URL for the French TCGdex API.
const TCGDEX_API_BASE_URL = "https://api.tcgdex.net/v2/fr";

// TCG Pocket series identifier in TCGdex.
const TCG_POCKET_SERIES_ID = "tcgp";

// LocalStorage key used to cache TCG Pocket cards.
const TCG_POCKET_CACHE_KEY = "tcgPocketCardsV2";

// Cache duration: 24 hours.
const TCG_POCKET_CACHE_DURATION = 1000 * 60 * 60 * 24;


/***********************
* TEXT NORMALIZATION *
***********************/

// Normalize text to make card and Pokemon names easier to compare.
function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("♀", "f")
    .replace("♂", "m")
    .trim();
}

// Get all searchable names for a Pokemon.
// French and English names are used when available.
function getPokemonSearchNames(pokemon) {
  const pokemonNames = [];

  if (pokemon && pokemon.name && pokemon.name.fr) {
    pokemonNames.push(pokemon.name.fr);
  }

  if (pokemon && pokemon.name && pokemon.name.en) {
    pokemonNames.push(pokemon.name.en);
  }

  return pokemonNames
    .filter(function (pokemonName) {
      return Boolean(pokemonName);
    })
    .map(function (pokemonName) {
      return normalizeText(pokemonName);
    });
}


/***********************
* CARD IMAGE BEHAVIOR *
***********************/

// Build all possible image URLs for a TCGdex card.
function buildCardImageUrls(imageBaseUrl) {
  if (!imageBaseUrl) {
    return [];
  }

  return [
    imageBaseUrl + "/low.webp",
    imageBaseUrl + "/high.webp",
    imageBaseUrl + "/low.png",
    imageBaseUrl + "/high.png",
  ];
}


/******************
* CACHE BEHAVIOR *
******************/

// Read TCG Pocket cards from localStorage cache.
function readCardsFromCache() {
  const cachedData = localStorage.getItem(TCG_POCKET_CACHE_KEY);

  if (!cachedData) {
    return null;
  }

  try {
    const parsedCache = JSON.parse(cachedData);
    const cacheAge = Date.now() - parsedCache.createdAt;
    const isCacheExpired = cacheAge > TCG_POCKET_CACHE_DURATION;

    if (isCacheExpired) {
      localStorage.removeItem(TCG_POCKET_CACHE_KEY);
      return null;
    }

    return parsedCache.cards;
  } catch (error) {
    localStorage.removeItem(TCG_POCKET_CACHE_KEY);
    return null;
  }
}

// Save TCG Pocket cards into localStorage cache.
function writeCardsToCache(cards) {
  const cachePayload = {
    createdAt: Date.now(),
    cards: cards,
  };

  localStorage.setItem(TCG_POCKET_CACHE_KEY, JSON.stringify(cachePayload));
}


/****************
* API BEHAVIOR *
****************/

// Fetch JSON data from a given URL.
async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("TCGdex request failed: " + response.status);
  }

  return response.json();
}

// Get all TCG Pocket set ids from the TCG Pocket series.
async function getTcgPocketSetIds() {
  const tcgPocketSeries = await fetchJson(
    TCGDEX_API_BASE_URL + "/series/" + TCG_POCKET_SERIES_ID
  );

  if (!tcgPocketSeries.sets) {
    return [];
  }

  return tcgPocketSeries.sets.map(function (set) {
    return set.id;
  });
}

// Get all cards from a specific TCG Pocket set.
async function getTcgPocketCardsFromSet(setId) {
  const tcgPocketSet = await fetchJson(TCGDEX_API_BASE_URL + "/sets/" + setId);

  if (!tcgPocketSet.cards) {
    return [];
  }

  return tcgPocketSet.cards.map(function (card) {
    const cardImageUrls = buildCardImageUrls(card.image);

    return {
      id: card.id,
      localId: card.localId,
      name: card.name,
      image: card.image,
      imageUrl: cardImageUrls[0],
      imageUrls: cardImageUrls,
      setId: tcgPocketSet.id,
      setName: tcgPocketSet.name,
    };
  });
}

// Get all TCG Pocket cards from cache or from the TCGdex API.
async function getAllTcgPocketCards() {
  const cachedCards = readCardsFromCache();

  if (cachedCards) {
    return cachedCards;
  }

  const setIds = await getTcgPocketSetIds();

  const cardRequests = setIds.map(function (setId) {
    return getTcgPocketCardsFromSet(setId);
  });

  const cardsGroupedBySet = await Promise.all(cardRequests);
  const allCards = cardsGroupedBySet.flat();

  writeCardsToCache(allCards);

  return allCards;
}


/***********************
* CARD SEARCH BEHAVIOR *
***********************/

// Check if a TCG Pocket card matches one of the Pokemon search names.
function doesCardMatchPokemonName(cardName, pokemonSearchNames) {
  const normalizedCardName = normalizeText(cardName);

  return pokemonSearchNames.some(function (pokemonSearchName) {
    if (normalizedCardName === pokemonSearchName) {
      return true;
    }

    if (normalizedCardName.startsWith(pokemonSearchName + " ")) {
      return true;
    }

    if (normalizedCardName.startsWith(pokemonSearchName + "-")) {
      return true;
    }

    if (normalizedCardName.includes(pokemonSearchName + " ex")) {
      return true;
    }

    return false;
  });
}

// Get all TCG Pocket cards matching a specific Pokemon.
export async function getTcgPocketCardsByPokemon(pokemon) {
  const pokemonSearchNames = getPokemonSearchNames(pokemon);

  if (pokemonSearchNames.length === 0) {
    return [];
  }

  const allCards = await getAllTcgPocketCards();

  const matchingCards = allCards.filter(function (card) {
    if (!card.imageUrls || card.imageUrls.length === 0) {
      return false;
    }

    return doesCardMatchPokemonName(card.name, pokemonSearchNames);
  });

  return matchingCards;
}