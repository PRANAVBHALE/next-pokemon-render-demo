import { notFound } from "next/navigation";
import ServerDemo from "@/components/server-demo";
import { getPokemon } from "@/lib/pokemon";
import { DEMO_POKEMON_IDS } from "@/lib/demo-pokemon";

export const dynamic = "force-dynamic";

export default async function PokemonDemo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!DEMO_POKEMON_IDS.some((value) => String(value) === id)) notFound();
  const pokemon = await getPokemon(Number(id), { cache: "no-store" });
  return <ServerDemo mode="ssr" pokemon={pokemon} renderedAt={new Date().toISOString()} />;
}
