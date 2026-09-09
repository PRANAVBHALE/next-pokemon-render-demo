import Image from "next/image";
import type { Pokemon } from "@/lib/pokemon";

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const artwork = pokemon.sprites.other?.["official-artwork"]?.front_default
    ?? pokemon.sprites.front_default;
  return (
    <div className="my-5 flex flex-wrap items-center justify-center gap-4 rounded-xl bg-cyan-soft px-4 text-center">
      {artwork ? (
        <Image
          src={artwork}
          alt={`${pokemon.name} artwork`}
          width={112}
          height={112}
          unoptimized
          className="h-28 w-28 shrink-0 object-contain"
        />
      ) : (
        <p className="flex h-28 w-28 items-center text-center text-xs text-ocean-muted">No artwork available</p>
      )}
      <div className="min-w-0">
      <p className="font-mono text-xs text-ocean-muted">POKÉMON #{String(pokemon.id).padStart(3, "0")}</p>
      <h3 className="mt-1 text-3xl font-black capitalize">{pokemon.name}</h3>
      <p className="mt-2 text-sm capitalize">{pokemon.types.map(({ type }) => type.name).join(" / ")}</p>
      <p className="mt-2 text-sm text-ocean-muted">Height: {pokemon.height / 10} m · Weight: {pokemon.weight / 10} kg</p>
      </div>
    </div>
  );
}
