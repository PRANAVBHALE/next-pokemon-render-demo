"use client";

import { useEffect, useState } from "react";
import { getPokemon, type Pokemon } from "@/lib/pokemon";
import PokemonDetails from "./pokemon-details";

export default function ClientDemo() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loadedAt, setLoadedAt] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialPokemon() {
      try {
        const result = await getPokemon(Math.floor(Math.random() * 151) + 1, {
          cache: "no-store",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
        });
        if (controller.signal.aborted) return;
        setPokemon(result);
        setLoadedAt(new Date().toISOString());
      } catch {
        if (!controller.signal.aborted) {
          setError("Could not reach PokéAPI. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadInitialPokemon();
    return () => controller.abort();
  }, []);

  async function loadPokemon(id = Math.floor(Math.random() * 151) + 1) {
    setLoading(true);
    setError(undefined);
    try {
      const result = await getPokemon(id, { cache: "no-store" });
      setPokemon(result);
      setLoadedAt(new Date().toISOString());
    } catch {
      setError("Could not reach PokéAPI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[410px] flex-col border-4 border-cyan-soft overflow-hidden bg-white text-center">
      <div className="info-hover-area flex flex-1 flex-col">
      <div className="info-hover-content flex flex-1 flex-col bg-cyan-soft p-5 sm:p-6">
      <p className="text-xs font-bold tracking-widest text-ocean-muted">01 / BROWSER</p>
      <p className="mt-2 text-xs font-semibold text-ocean-muted">Browser interactivity</p>
      <h2 className="mt-1 min-h-14 text-xl font-black leading-7">Client Components</h2>
      <p className="mt-5 min-h-25 text-sm text-ocean-muted sm:mt-6">A random Pokémon loads automatically in your browser. Fetch another or reload the current Pokémon without reloading the page.</p>
      <div aria-live="polite" aria-busy={loading} className="flex-1">
        {pokemon ? <PokemonDetails pokemon={pokemon} /> : <p className="my-6 text-sm text-ocean-muted">{loading ? "Loading Pokémon…" : "No Pokémon loaded. Try fetching again."}</p>}
        {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
        {loadedAt && <p className="mb-4 break-all font-mono text-xs">Browser fetched: <time dateTime={loadedAt}>{loadedAt}</time></p>}
        <div className="text-sm leading-6 text-ocean-muted">
          <h3 className="font-bold text-ocean">Ideal use cases</h3>
          <ul className="mx-auto mt-2 w-fit list-disc space-y-1 pl-5 text-left">
            <li>Interactive forms and filters</li>
            <li>Shopping carts and live charts</li>
            <li>Features using browser APIs or local state</li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      <footer className="mt-auto shrink-0 bg-white pb-5 sm:pb-6">
      <div className="flex min-h-24 shrink-0 flex-wrap items-center justify-center gap-3 border-t-2 border-cyan-soft px-5 pt-4 sm:px-6">
      <button onClick={() => loadPokemon()} disabled={loading} className="w-fit border-2 border-sky-bright bg-sky-bright px-4 py-2 text-sm font-bold text-ocean hover:bg-sky-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50">
        {loading ? "Loading…" : pokemon ? "Get another Pokémon" : "Fetch Pokémon"}
      </button>
      <button
        onClick={() => pokemon && loadPokemon(pokemon.id)}
        disabled={loading || !pokemon}
        className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reload current
      </button>
      </div>
      <p className="mt-3 min-h-12 px-5 text-xs sm:px-6 text-ocean-muted">The initial UI is prerendered; Pokémon data is fetched in the browser after the component mounts.</p>
      </footer>
    </section>
  );
}
