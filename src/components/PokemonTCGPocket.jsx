import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getTcgPocketCardsByPokemon } from "../services/PokemonTCGPocketApi";

// LocalStorage keys used for TCG Pocket cache.
const TCG_POCKET_CACHE_KEY = "tcgPocketCardsV2";
const OLD_TCG_POCKET_CACHE_KEY = "tcgPocketCards";

function PokemonTCGPocket({ pokemon }) {
  const [tcgPocketCards, setTcgPocketCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  // Load TCG Pocket cards when the selected Pokemon changes.
  useEffect(
    function () {
      let isComponentMounted = true;

      async function loadTcgPocketCards() {
        if (!pokemon) {
          setTcgPocketCards([]);
          return;
        }

        setIsLoadingCards(true);
        setHasLoadingError(false);

        try {
          const foundCards = await getTcgPocketCardsByPokemon(pokemon);

          if (isComponentMounted) {
            setTcgPocketCards(foundCards);
          }
        } catch (error) {
          console.error(error);

          if (isComponentMounted) {
            setTcgPocketCards([]);
            setHasLoadingError(true);
          }
        } finally {
          if (isComponentMounted) {
            setIsLoadingCards(false);
          }
        }
      }

      loadTcgPocketCards();

      return function () {
        isComponentMounted = false;
      };
    },
    [pokemon]
  );

  // Try the next available image URL when a card image fails to load.
  function handleCardImageError(event, card) {
    const cardImage = event.currentTarget;
    const currentImageIndex = Number(cardImage.dataset.imageIndex);
    const nextImageIndex = currentImageIndex + 1;

    if (card.imageUrls && card.imageUrls[nextImageIndex]) {
      cardImage.dataset.imageIndex = String(nextImageIndex);
      cardImage.src = card.imageUrls[nextImageIndex];
      return;
    }

    const cardElement = cardImage.closest("article");

    if (cardElement) {
      cardElement.remove();
    }
  }

  // Clear TCG Pocket cache and reload the page.
  function clearCacheAndReload() {
    localStorage.removeItem(TCG_POCKET_CACHE_KEY);
    localStorage.removeItem(OLD_TCG_POCKET_CACHE_KEY);
    window.location.reload();
  }

  // Keep only cards that have at least one available image URL.
  const visibleCards = tcgPocketCards.filter(function (card) {
    if (!card.imageUrls) {
      return false;
    }

    return card.imageUrls.length > 0;
  });

  // Do not render the section if no Pokemon is selected.
  if (!pokemon) {
    return null;
  }

  // Loading state.
  if (isLoadingCards) {
    return (
      <section className="w-full px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
        <PokemonTCGPocketHeader onRefresh={clearCacheAndReload} />

        <div className="w-full h-[250px] flex justify-center items-center rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-center items-center gap-2 text-slate-500">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
            <span className="text-sm">Chargement des cartes Pocket...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state.
  if (hasLoadingError) {
    return (
      <section className="w-full px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
        <PokemonTCGPocketHeader onRefresh={clearCacheAndReload} />

        <div className="w-full h-[250px] px-4 py-4 flex justify-center items-center rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-600">
            Impossible de charger les cartes Pokémon TCG Pocket.
          </p>
        </div>
      </section>
    );
  }

  // Empty state.
  if (visibleCards.length === 0) {
    return (
      <section className="w-full px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
        <PokemonTCGPocketHeader onRefresh={clearCacheAndReload} />

        <div className="w-full h-[250px] px-4 py-4 flex justify-center items-center rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-sm text-slate-500">
            Aucune carte Pocket trouvée pour ce Pokémon.
          </p>
        </div>
      </section>
    );
  }

  // Cards list.
  return (
    <section className="w-full px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
      <PokemonTCGPocketHeader onRefresh={clearCacheAndReload} />

      <div className="w-full h-[270px] overflow-x-auto overflow-y-hidden pb-4">
        <div className="min-w-max h-full flex flex-row justify-start items-start gap-4">
          {visibleCards.map(function (card) {
            return (
              <article
                className="w-44 shrink-0 rounded-2xl bg-transparent overflow-hidden"
                key={card.id}
              >
                <img
                  className="w-full h-auto block"
                  src={card.imageUrls[0]}
                  alt={card.name}
                  loading="lazy"
                  data-image-index="0"
                  onError={function (event) {
                    handleCardImageError(event, card);
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PokemonTCGPocketHeader({ onRefresh }) {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-3">
      <h3 className="text-xl font-bold text-slate-600">
        Pokémon TCG Pocket
      </h3>

      <button
        className="w-8 h-8 flex justify-center items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
        type="button"
        onClick={onRefresh}
        title="Rafraîchir les cartes TCG Pocket"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
}

export default PokemonTCGPocket;