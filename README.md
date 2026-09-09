# Pokémon rendering demos

Four bordered panels compare browser interactivity and Next.js server rendering using PokéAPI.

```bash
npm install
npm run build
npm start
```

Open http://localhost:3000. Use production mode for caching experiments; `npm run dev` renders on demand and does not demonstrate production SSG/ISR behavior.

| Panel | Implementation | Experiment |
| --- | --- | --- |
| Client Components | `src/components/client-demo.tsx`: client state and browser fetch on mount and click | Fetch another random Pokémon without navigating. |
| SSG | `/demos/ssg`: `dynamic = 'error'`, cached fetch, no timed revalidation | Reload; the build-time render timestamp remains unchanged. |
| ISR | `/demos/isr`: static route with `revalidate = 30` | Wait 30 seconds, reload to trigger background regeneration, then reload again to see the new timestamp. |
| SSR | `/demos/ssr`: `dynamic = 'force-dynamic'`, uncached fetch | Every reload produces a new server render timestamp. |

The three server panels embed independent routes in iframes. Rendering and full-route caching policies apply to routes, so this lets true SSG, ISR, and SSR coexist on one screen without the SSR demo making the entire page dynamic. Each server route renders the shared `ServerDemo` Server Component.

Client Components can be prerendered too: this demo's initial client UI is in the page HTML, but its Pokémon data is fetched in the browser after mount and on subsequent button clicks. Server controls cycle through six Pokémon using ID-based routes. SSG and ISR prebuild all six pages; SSR fetches each selection on request. Reload current keeps the selected Pokémon; the ISO UTC timestamps show actual rendering, independently of whether API data changes. ISR is request-triggered, not a background timer.

PokéAPI and Google Fonts require network access during the build. Runtime Pokémon requests also require connectivity. Client requests show retryable errors; server routes have an error boundary. A failed initial static fetch fails the build rather than caching invented data.

Validation: `npm run lint` and `npm run build`.

References: [Next.js caching](https://nextjs.org/docs/app/guides/caching-without-cache-components), [PokéAPI](https://pokeapi.co/docs/v2).
