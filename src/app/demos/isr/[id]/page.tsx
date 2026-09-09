import { notFound } from "next/navigation";
import ServerDemo from "@/components/server-demo";
import { getPokemon } from "@/lib/pokemon";
import { DEMO_POKEMON_IDS } from "@/lib/demo-pokemon";

export const dynamic = "force-static";
export const revalidate = 30;
export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_POKEMON_IDS.map((id) => ({ id: String(id) }));
}

export default async function PokemonDemo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!DEMO_POKEMON_IDS.some((value) => String(value) === id)) notFound();
  const pokemon = await getPokemon(Number(id), { next: { revalidate: 30 } });
  return <ServerDemo mode="isr" pokemon={pokemon} renderedAt={new Date().toISOString()} />;
}
