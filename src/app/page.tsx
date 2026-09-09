import ClientDemo from "@/components/client-demo";

const serverDemos = [
  { mode: "ssg", number: "02", title: "Static Site Generation", badge: "BUILD TIME" },
  { mode: "isr", number: "03", title: "Incremental Static Regeneration", badge: "30-SECOND CACHE" },
  { mode: "ssr", number: "04", title: "Server-Side Rendering", badge: "EVERY REQUEST" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cyan-wash p-4 text-ocean sm:p-10">
      <div className="w-full max-w-6xl border-8 border-cyan-soft bg-white p-4 sm:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-black tracking-tight">One page. Four ways to render.</h1>
          <p className="mt-2 text-sm text-ocean-muted">Explore Next.js rendering with Pokémon. Compare where data is fetched and when the result changes.</p>
        </header>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
          <ClientDemo />
          {serverDemos.map(({ mode, title }) => (
            <section key={mode} className="flex flex-col border-4 border-cyan-soft bg-white">
              <iframe src={`/demos/${mode}/${mode === "ssg" ? 1 : mode === "isr" ? 4 : 7}`} title={`${title} Pokémon demonstration`} className="min-h-[900px] w-full flex-1 border-0 sm:min-h-[820px]" />
            </section>
          ))}
        </div>
        <footer className="mt-5 space-y-2 text-xs leading-relaxed text-ocean-muted">
          <p>Use <code className="font-bold">npm run build &amp;&amp; npm start</code> to observe caching. Development mode renders on demand.</p>
          <p>Server demos are embedded independent routes so each keeps its own rendering policy. Cycle through six Pokémon, or reload the current one to compare server render timestamps.</p>
          <p>Data from <a className="underline" href="https://pokeapi.co/docs/v2">PokéAPI</a>.</p>
        </footer>
      </div>
    </main>
  );
}
