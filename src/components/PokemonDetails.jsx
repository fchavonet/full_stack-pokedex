import { MoveRight, MoveDown } from "lucide-react";
import { getPokemonStaticImage, getPokemonAnimatedImage, getPokemonArtwork, handleImageError, handleAnimatedImageError } from "../services/pokemonImages.js";
import { pokemonTypeColors } from "../data/pokemonTypeColors.js";
import HexagonStats from "./hexagonStats.jsx";

function PokemonDetails({ pokemon, allPokemon, onTypeSelect }) {
  if (!pokemon) {
    return (
      <section className="w-full flex flex-col justify-center items-center">
        <p>Sélectionnez un Pokémon pour voir sa description détailée.</p>
      </section>
    );
  }

  // Format gender distribution percentages for display.
  function formatGender(genders) {
    if (!genders) return "Inconnu";

    const male = genders.male;
    const female = genders.female;

    if (male === -1 && female === -1) return "Asexué";
    if (male === 0) return "Femelle uniquement";
    if (female === 0) return "Mâle uniquement";

    return String(male) + "% Mâle, " + String(female) + "% Femelle";
  }

  // Format talents list with hidden talent indication.
  function formatTalents(talents) {
    if (!talents || talents.length === 0) {
      return "Aucun";
    }

    return talents.map(function (talent, index) {
      let base = "mr-2 mb-2 px-4 py-2 inline-block text-sm rounded-full border-2";
      let theme = " text-slate-600 bg-slate-200 border-slate-300";

      if (talent && talent.tc) {
        theme = " text-yellow-600 bg-yellow-200 border-yellow-300";
      }

      return (
        <span className={base + theme} key={index}>
          {talent && talent.name ? talent.name : "Inconnu"}
          {talent && talent.tc && " (Talent caché)"}
        </span>
      );
    });
  }

  // Build complete evolution chain from first to last evolution.
  function getEvolutionChain(pokemonArg, allPokemonArg) {
    if (!pokemonArg.evolution || !allPokemonArg) {
      return [{ name: pokemonArg.name.fr, id: pokemonArg.pokedex_id }];
    }

    let currentPokemon = pokemonArg;
    const visited = new Set();

    // Find the first Pokemon in evolution chain.
    while (currentPokemon.evolution && currentPokemon.evolution.pre && !visited.has(currentPokemon.pokedex_id)) {
      visited.add(currentPokemon.pokedex_id);
      const preId = currentPokemon.evolution.pre[0] && currentPokemon.evolution.pre[0].pokedex_id;
      const prePokemon = allPokemonArg.find(function (p) {
        return p.pokedex_id === preId;
      });

      if (!prePokemon) {
        break;
      }
      currentPokemon = prePokemon;
    }

    const evolutionChain = [{ name: currentPokemon.name.fr, id: currentPokemon.pokedex_id }];

    // Handle multiple evolutions.
    if (currentPokemon.evolution && currentPokemon.evolution.next) {
      currentPokemon.evolution.next.forEach(function (nextEvolution) {
        if (nextEvolution) {
          const nextPokemon = allPokemonArg.find(function (p) {
            return p.pokedex_id === nextEvolution.pokedex_id;
          });
          if (nextPokemon) {
            evolutionChain.push({ name: nextPokemon.name.fr, id: nextPokemon.pokedex_id });
          }
        }
      });
    } else {
      visited.clear();

      // Build chain by following next evolutions.
      while (currentPokemon.evolution && currentPokemon.evolution.next && !visited.has(currentPokemon.pokedex_id)) {
        visited.add(currentPokemon.pokedex_id);
        const nextEvolution = currentPokemon.evolution.next[0];
        if (!nextEvolution) {
          break;
        }
        const nextPokemon = allPokemonArg.find(function (p) {
          return p.pokedex_id === nextEvolution.pokedex_id;
        });
        if (!nextPokemon) {
          break;
        }
        evolutionChain.push({ name: nextPokemon.name.fr, id: nextPokemon.pokedex_id });
        currentPokemon = nextPokemon;
      }
    }

    return evolutionChain;
  }

  // Get safe values with fallbacks.
  function getSafeValue(value, suffix) {
    if (!value) {
      return "Non disponible";
    }
    if (suffix) {
      return String(value) + String(suffix);
    }
    return value;
  }

  // Prepare data with fallback values for display.
  const pokemonName = getSafeValue(pokemon.name && pokemon.name.jp);
  const height = getSafeValue(pokemon.height);
  const weight = getSafeValue(pokemon.weight);
  const catchRate = getSafeValue(pokemon.catch_rate);
  const evolutionChain = getEvolutionChain(pokemon, allPokemon);

  return (
    <section className="w-full p-4 lg:p-8 flex-1 bg-slate-100 overflow-auto no-scrollbar">
      {/* Main Pokemon card with sprite and basic info */}
      <div className="w-full mb-4 px-8 py-4 flex flex-row justify-start items-center gap-8 border border-slate-300 rounded-xl bg-white shadow-lg">
        <img
          className="w-25 h-25 object-contain object-center pixelated transform scale-x-[-1]"
          src={getPokemonAnimatedImage(pokemon.pokedex_id)}
          alt={pokemon.name.fr}
          onError={function (error) { handleAnimatedImageError(error, pokemon.pokedex_id); }}
        />

        <div>
          <p className="text-2xl font-bold text-slate-800">{pokemon.name.fr}</p>
          <p className="mb-4 text-lg text-slate-600">{pokemonName}</p>

          <div className="mb-2 flex flex-wrap gap-2">
            {pokemon.types && pokemon.types.map(function (type, index) {
              const colorClass = pokemonTypeColors[type.name] || "bg-slate-400";
              const baseClass = "px-2 py-1 text-xs text-center font-medium text-white rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5";
              const finalClass = baseClass + " " + colorClass;

              return (
                <button
                  type="button"
                  aria-label={"Filtrer par type " + type.name}
                  className={finalClass}
                  key={index}
                  onClick={function () {
                    if (typeof onTypeSelect === "function") {
                      onTypeSelect(type.name);
                    }
                  }}
                >
                  {type.name}
                </button>
              );
            })}
          </div>

          <p className="px-2 py-1 inline-block text-xs text-center font-bold text-slate-600 rounded-full bg-slate-200">
            Génération : {pokemon.generation}
          </p>
        </div>
      </div>

      {/* General Pokemon details and abilities */}
      <div className="mb-4 grid md:grid-cols-2 gap-4">
        <div className="px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
          <h3 className="text-xl font-bold text-slate-600">
            Informations générales
          </h3>

          <div className="w-full py-2 flex justify-between items-center border-b border-slate-200">
            <span className="font-medium text-slate-600">Catégorie :</span>
            <span>{pokemon.category}</span>
          </div>

          <div className="w-full py-2 flex justify-between items-center border-b border-slate-200">
            <span className="font-medium text-slate-600">Taille :</span>
            <span>{height}</span>
          </div>

          <div className="w-full py-2 flex justify-between items-center border-b border-slate-200">
            <span className="font-medium text-slate-600">Poids :</span>
            <span>{weight}</span>
          </div>

          <div className="w-full py-2 flex justify-between items-center border-b border-slate-200">
            <span className="font-medium text-slate-600">Sexe :</span>
            <span>{formatGender(pokemon.sexe)}</span>
          </div>

          <div className="w-full py-2 flex justify-between items-center border-b border-slate-200">
            <span className="font-medium text-slate-600">Taux de capture :</span>
            <span>{catchRate}</span>
          </div>
        </div>

        <div className="px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
          <h3 className="text-xl font-bold text-slate-600">
            Talents
          </h3>

          <p>{formatTalents(pokemon.talents)}</p>
        </div>
      </div>

      {/* Pokemon stats */}
      {pokemon.stats && (
        <div className="mb-4 px-8 py-4 bg-white rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-slate-600">
            Statistiques <span className="text-xs">(Niveau 100)</span>
          </h3>

          <HexagonStats stats={pokemon.stats} typeName={pokemon.types[0].name} />
        </div>
      )}

      {/* Evolution chain */}
      <div className="w-full mb-4 px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
        <h3 className="text-xl font-bold text-slate-600">
          Évolutions
        </h3>

        <div className="w-full flex flex-col lg:flex-row lg:flex-wrap justify-center items-center lg:gap-y-4">
          {evolutionChain.map(function (evolution, index) {
            return (
              <div
                className="w-full lg:w-auto flex flex-col lg:flex-row justify-center items-center"
                key={String(evolution.id) + "-" + String(index)}
              >
                <div className="w-full lg:w-auto px-4 py-4 flex flex-col justify-center items-center gap-4 rounded-xl border border-slate-300 bg-slate-100">
                  <img
                    className="w-25 h-25 p-2 rounded-full bg-white shadow-sm transform scale-x-[-1] pixelated"
                    src={getPokemonStaticImage(evolution.id)}
                    alt={evolution.name}
                    onError={handleImageError}
                  />

                  <div className="flex flex-col justify-center items-center">
                    <p className="text-sm font-light">
                      #{String(evolution.id).padStart(3, "0")}
                    </p>

                    <p className="font-medium">
                      {evolution.name}
                    </p>
                  </div>
                </div>

                {index < evolutionChain.length - 1 && (
                  <>
                    {/* Desktop arrow */}
                    <div className="mx-4 hidden lg:flex text-2xl text-slate-400">
                      <MoveRight />
                    </div>

                    {/* Mobile arrow */}
                    <div className="my-2 flex lg:hidden text-2xl text-slate-400">
                      <MoveDown />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* */}
      <div className="w-full px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
        <h3 className="text-xl font-bold text-slate-600">
          Pokémon TCGP
        </h3>
      </div>

      {/* */}
      <div className="w-full mt-8 flex flex-row justify-center items-center">
        <img
          className="h-50"
          src={getPokemonArtwork(pokemon.pokedex_id)}
          alt={pokemon.name.fr}
        />
      </div>
    </section>
  );
}

export default PokemonDetails;
