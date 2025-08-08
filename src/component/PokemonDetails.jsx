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
      <span key={index}>
        {talent.name}
        {talent.tc && " (Talent Caché)"}
        {index < talents.length - 1 && ", "}
      </span>
    ));
  }

  // Build complete evolution chain from first to last evolution.
  function getEvolutionChain(pokemon, allPokemon) {
    if (!pokemon.evolution || !allPokemon) return [pokemon.name.fr];

    let currentPokemon = pokemon;
    const visited = new Set();

    // Find the first Pokemon in evolution chain.
    while (currentPokemon.evolution?.pre && !visited.has(currentPokemon.pokedex_id)) {
      visited.add(currentPokemon.pokedex_id);
      const prePokemon = allPokemon.find(p => p.pokedex_id === currentPokemon.evolution.pre[0]?.pokedex_id);

      if (!prePokemon) break;
      currentPokemon = prePokemon;
    }

    const evolutionChain = [currentPokemon.name.fr];
    visited.clear();

    // Build chain by following next evolutions.
    while (currentPokemon.evolution?.next && !visited.has(currentPokemon.pokedex_id)) {
      visited.add(currentPokemon.pokedex_id);
      const nextEvolution = currentPokemon.evolution.next[0];

      if (!nextEvolution) break;

      const nextPokemon = allPokemon.find(p => p.pokedex_id === nextEvolution.pokedex_id);

      if (!nextPokemon) break;

      evolutionChain.push(nextPokemon.name.fr);
      currentPokemon = nextPokemon;
    }

    return evolutionChain;
  }

  // Get safe values with fallbacks.
  function getSafeValue(value, suffix = "") {
    if (!value) return "Non disponible";
    return suffix ? `${value}${suffix}` : value;
  }

  function getTypes(types) {
    if (!types?.length) return "Non disponible";
    return types.map(type => type.name).join(", ");
  }

  function getStatValue(stat) {
    return stat || "Non disponible";
  }

  // Prepare data with fallback values for display.
  const pokemonName = getSafeValue(pokemon.name?.jp);
  const types = getTypes(pokemon.types);
  const height = getSafeValue(pokemon.height, " m");
  const weight = getSafeValue(pokemon.weight, " kg");
  const catchRate = getSafeValue(pokemon.catch_rate);
  const evolutionChain = getEvolutionChain(pokemon, allPokemon);

  return (
    <section>
      <div className="mt-4">
        <h2>#{pokemon.pokedex_id.toString().padStart(3, "0")}</h2>
        <p>{pokemon.name.fr}</p>
        <p>{pokemonName}</p>
      </div>

      <div className="mt-4">
        <p>Génération : {pokemon.generation}</p>
        <p>Catégorie : {pokemon.category}</p>
        <p>Type(s) : {types}</p>
        <p>Taille : {height}</p>
        <p>Poids : {weight}</p>
        <p>Sexe : {formatGender(pokemon.sexe)}</p>
        <p>Taux de capture : {catchRate}</p>
      </div>

      {pokemon.stats && (
        <div className="mt-4">
          <h3>Statistiques (Niveau 100)</h3>
          <p>PV : {getStatValue(pokemon.stats.hp)}</p>
          <p>Attaque : {getStatValue(pokemon.stats.atk)}</p>
          <p>Défense : {getStatValue(pokemon.stats.def)}</p>
          <p>Attaque Spéciale : {getStatValue(pokemon.stats.spe_atk)}</p>
          <p>Défense Spéciale : {getStatValue(pokemon.stats.spe_def)}</p>
          <p>Vitesse : {getStatValue(pokemon.stats.vit)}</p>
        </div>
      )}

      <div className="mt-4">
        <h3>Talents</h3>
        <p>{formatTalents(pokemon.talents)}</p>
      </div>

      <div className="mt-4">
        <h3>Évolutions</h3>
        <p>{evolutionChain.join(" → ")}</p>
      </div>
    </section>
  );
}

export default PokemonDetails;
