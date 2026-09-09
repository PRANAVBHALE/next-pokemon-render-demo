"use client";

export default function DemoError() {
  return (
    <main className="flex-1 bg-white p-6 text-ocean">
      <p role="alert">Could not load this Pokémon from PokéAPI.</p>
      <button onClick={() => window.location.reload()} className="mt-4 border-2 border-cyan-soft px-4 py-2 font-bold">Try again</button>
    </main>
  );
}
