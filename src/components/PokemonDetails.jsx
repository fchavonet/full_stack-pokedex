import { ArrowBigRight, ArrowBigDown } from "lucide-react";
import { getPokemonStaticImage, getPokemonAnimatedImage, handleImageError, handleAnimatedImageError } from "../services/pokemonImages.js";
import { pokemonTypeColors } from "../data/pokemonTypeColors.js";

function PokemonDetails({ pokemon, allPokemon }) {
  if (!pokemon) {
    return (
      <section>
        <p>Sélectionnez un Pokémon pour voir sa description détailée.</p>
      </section>
    );
  }

  // Format gender distribution percentages for display.
  function formatGender(genders) {
    if (!genders) return "Inconnu";

    const { male, female } = genders;

    if (male === -1 && female === -1) return "Asexué";
    if (male === 0) return "Femelle uniquement";
    if (female === 0) return "Mâle uniquement";

    return `${male}% Mâle, ${female}% Femelle`;
  }

  // Format talents list with hidden talent indication.
  function formatTalents(talents) {
    if (!talents?.length) return "Aucun";

    return talents.map((talent, index) => (
      <span
        className={`mr-2 mb-2 px-4 py-2 inline-block text-sm rounded-full ${talent.tc ? "text-yellow-600 bg-yellow-200 border-2 border-yellow-300" : "text-slate-600 bg-slate-200 border-2 border-slate-300"}`}
        key={index}>
        {talent.name}
        {talent.tc && " (Talent caché)"}
        {index < talents.length - 1}
      </span>
    ));
  }

  // Build complete evolution chain from first to last evolution.
  function getEvolutionChain(pokemon, allPokemon) {
    if (!pokemon.evolution || !allPokemon) return [{ name: pokemon.name.fr, id: pokemon.pokedex_id }];

    let currentPokemon = pokemon;
    const visited = new Set();

    // Find the first Pokemon in evolution chain.
    while (currentPokemon.evolution?.pre && !visited.has(currentPokemon.pokedex_id)) {
      visited.add(currentPokemon.pokedex_id);
      const prePokemon = allPokemon.find(p => p.pokedex_id === currentPokemon.evolution.pre[0]?.pokedex_id);

      if (!prePokemon) break;
      currentPokemon = prePokemon;
    }

    const evolutionChain = [{ name: currentPokemon.name.fr, id: currentPokemon.pokedex_id }];

    // Handle multiple evolutions by adding all next evolutions at once.
    if (currentPokemon.evolution?.next) {
      currentPokemon.evolution.next.forEach(nextEvolution => {
        if (nextEvolution) {
          const nextPokemon = allPokemon.find(p => p.pokedex_id === nextEvolution.pokedex_id);

          if (nextPokemon) {
            evolutionChain.push({ name: nextPokemon.name.fr, id: nextPokemon.pokedex_id });
          }
        }
      });
    } else {
      visited.clear();

      // Build chain by following next evolutions.
      while (currentPokemon.evolution?.next && !visited.has(currentPokemon.pokedex_id)) {
        visited.add(currentPokemon.pokedex_id);
        const nextEvolution = currentPokemon.evolution.next[0];

        if (!nextEvolution) break;

        const nextPokemon = allPokemon.find(p => p.pokedex_id === nextEvolution.pokedex_id);

        if (!nextPokemon) break;

        evolutionChain.push({ name: nextPokemon.name.fr, id: nextPokemon.pokedex_id });
        currentPokemon = nextPokemon;
      }
    }

    return evolutionChain;
  }

  // Get safe values with fallbacks.
  function getSafeValue(value, suffix = "") {
    if (!value) return "Non disponible";
    return suffix ? `${value}${suffix}` : value;
  }

  function getStatValue(stat) {
    return stat || "Non disponible";
  }

  // Prepare data with fallback values for display.
  const pokemonName = getSafeValue(pokemon.name?.jp);
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
          onError={(error) => handleAnimatedImageError(error, pokemon.pokedex_id)}
        />

        <div>
          <p className="text-2xl font-bold text-slate-800">{pokemon.name.fr}</p>
          <p className="mb-4 text-lg text-slate-600">{pokemonName}</p>

          <div className="mb-2 flex flex-wrap gap-2">
            {pokemon.types?.map((type, index) => (
              <span
                className={`px-2 py-1 text-xs text-center font-medium text-white rounded-full ${pokemonTypeColors[type.name] || "bg-slate-400"} cursor-pointer`}
                key={index}
              >
                {type.name}
              </span>
            ))}
          </div>

          <p className="px-2 py-1 inline-block text-xs text-center font-bold text-slate-600 rounded-full bg-slate-200">Génération : {pokemon.generation}</p>
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

        <div className="p-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
          <h3 className="text-xl font-bold text-slate-600">
            Talents
          </h3>

          <p>{formatTalents(pokemon.talents)}</p>
        </div>
      </div>

      {/* Pokemon stats */}
      {pokemon.stats && (
        <div className="w-full mb-4 px-8 py-4 flex flex-col justify-start items-start gap-4 border border-slate-300 rounded-xl bg-white shadow-lg">
          <h3 className="text-xl font-bold text-slate-600">
            Statistiques (Niveau 100)
          </h3>

          <p>PV : {getStatValue(pokemon.stats.hp)}</p>
          <p>Attaque : {getStatValue(pokemon.stats.atk)}</p>
          <p>Défense : {getStatValue(pokemon.stats.def)}</p>
          <p>Attaque Spéciale : {getStatValue(pokemon.stats.spe_atk)}</p>
          <p>Défense Spéciale : {getStatValue(pokemon.stats.spe_def)}</p>
          <p>Vitesse : {getStatValue(pokemon.stats.vit)}</p>
        </div>
      )}

      {/* Evolution chain */}
      <div className="w-full px-8 py-4 flex flex-col justify-start items-start border border-slate-300 rounded-xl bg-white shadow-lg">
        <h3 className="text-xl font-bold text-slate-600">
          Évolutions
        </h3>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center">
          {evolutionChain.map((evolution, index) => (
            <div
              className="flex flex-col lg:flex-row justify-center items-center"
              key={`${evolution.id}-${index}`}>
              <div className="px-4 py-2 flex flex-col justify-center items-center gap-2 rounded-xl bg-slate-200">
                <img
                  className="w-20 h-20 pixelated"
                  src={getPokemonStaticImage(evolution.id)}
                  alt={evolution.name}
                  onError={handleImageError}
                />

                <p>{evolution.name}</p>
              </div>

              {index < evolutionChain.length - 1 && (
                <>
                  <div className="my-2 flex lg:hidden text-2xl text-gray-400">
                    <ArrowBigDown />
                  </div>

                  <div className="mx-2 hidden lg:flex text-2xl text-gray-400">
                    <ArrowBigRight />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}

export default PokemonDetails;
