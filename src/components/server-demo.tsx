import { nextDemoPokemon } from "@/lib/demo-pokemon";
import PokemonDetails from "./pokemon-details";
import type { Pokemon } from "@/lib/pokemon";

export default function ServerDemo({ pokemon, mode, renderedAt }: {
  pokemon: Pokemon;
  mode: "ssg" | "isr" | "ssr";
  renderedAt: string;
}) {
  const descriptions = {
    ssg: "Each Pokémon page is generated at build time. Get another Pokémon opens the next prebuilt page; revisiting it keeps its build-time timestamp.",
    isr: "Each Pokémon page is cached for 30 seconds. The first request after expiry serves the old page and triggers regeneration. Reload again shortly after to see the new render time.",
    ssr: "Generated on every request. Get another Pokémon fetches the next Pokémon on the server with a new render time.",
  };
  const notes = {
    ssg: "Pokémon data is fetched and the page is rendered on the server at build time.",
    isr: "The server caches each Pokémon page for 30 seconds, then regenerates it after the next request.",
    ssr: "Server-Side Rendering: Pokémon data is fetched fresh and the page is rendered on the server for every request.",
  };
  const useCases = {
    ssg: ["Blogs and documentation", "Portfolios", "Marketing pages with infrequent content changes"],
    isr: ["Product catalogs", "News articles", "CMS pages that tolerate briefly stale content"],
    ssr: ["Personalized account pages", "Request-specific search results", "Pages needing fresh data on every visit"],
  };
  return (
    <main className="flex min-h-full flex-1 flex-col overflow-hidden bg-white text-center text-ocean">
      <div className="info-hover-area flex flex-1 flex-col">
      <div className="info-hover-content flex flex-1 flex-col bg-cyan-soft p-5 sm:p-6">
      <header className="mb-5 sm:mb-6">
        <p className="text-xs font-bold tracking-widest text-ocean-muted">{mode === "ssg" ? "02 / BUILD TIME" : mode === "isr" ? "03 / 30-SECOND CACHE" : "04 / EVERY REQUEST"}</p>
        <p className="mt-2 text-xs font-semibold text-ocean-muted">Server Components</p>
        <h2 className="mt-1 min-h-14 text-xl font-black leading-7">{mode === "ssg" ? "Static Site Generation" : mode === "isr" ? "Incremental Static Regeneration" : "Server-Side Rendering"}</h2>
      </header>
      <p className="min-h-25 text-sm text-ocean-muted">{descriptions[mode]}</p>
      <PokemonDetails pokemon={pokemon} />
      <p className="mb-5 break-all font-mono text-xs">Server rendered: <time dateTime={renderedAt}>{renderedAt}</time></p>
      <div className="text-sm leading-6 text-ocean-muted">
        <h3 className="font-bold text-ocean">Ideal use cases</h3>
        <ul className="mx-auto mt-2 w-fit list-disc space-y-1 pl-5 text-left">
          {useCases[mode].map((useCase) => <li key={useCase}>{useCase}</li>)}
        </ul>
      </div>
      </div>
      </div>
      <footer className="mt-auto shrink-0 bg-white pb-5 sm:pb-6">
      <div className="flex min-h-24 shrink-0 flex-wrap items-center justify-center gap-3 border-t-2 border-cyan-soft px-5 pt-4 sm:px-6">
        <a href={`/demos/${mode}/${nextDemoPokemon(pokemon.id)}`} className="w-fit border-2 border-sky-bright bg-sky-bright px-4 py-2 text-sm font-bold text-ocean hover:bg-sky-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">Get another Pokémon</a>
        <a href={`/demos/${mode}/${pokemon.id}`} className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Reload current</a>
      </div>
      <p className="mt-3 min-h-12 shrink-0 px-5 text-xs sm:px-6 text-ocean-muted">{notes[mode]}</p>
      </footer>
    </main>
  );
}
