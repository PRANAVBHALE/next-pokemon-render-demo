// A small prebuilt collection keeps SSG navigation genuinely static.
export const DEMO_POKEMON_IDS = [1, 4, 7, 25, 39, 133];

export function nextDemoPokemon(id: number) {
  return DEMO_POKEMON_IDS[(DEMO_POKEMON_IDS.indexOf(id) + 1) % DEMO_POKEMON_IDS.length];
}
