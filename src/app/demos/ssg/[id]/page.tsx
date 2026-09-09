import { notFound } from "next/navigation";
import ServerDemo from "@/components/server-demo";
import { getPokemon } from "@/lib/pokemon";
import { DEMO_POKEMON_IDS } from "@/lib/demo-pokemon";

export const dynamic = "error";
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_POKEMON_IDS.map((id) => ({ id: String(id) }));
}

export default async function PokemonDemo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!DEMO_POKEMON_IDS.some((value) => String(value) === id)) notFound();
  const pokemon = await getPokemon(Number(id), { cache: "force-cache" });
  return <ServerDemo mode="ssg" pokemon={pokemon} renderedAt={new Date().toISOString()} />;
}
