export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: { "official-artwork"?: { front_default: string | null } };
  };
  types: { type: { name: string } }[];
};

export async function getPokemon(id: number, options: RequestInit = {}): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Pokémon could not be loaded. Please try again.");
  return response.json();
}
