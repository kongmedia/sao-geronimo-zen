import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { CartDrawer } from "@/components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-serif text-7xl text-gold-gradient">404</div>
        <h2 className="mt-6 font-serif text-2xl">Caminho não revelado</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A página que você busca seguiu outro plano.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-sm bg-foreground text-background px-6 text-xs tracking-[0.25em] uppercase hover:bg-gold transition"
        >
          Retornar ao início
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Algo se interrompeu</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="h-10 px-5 rounded-sm bg-foreground text-background text-xs tracking-[0.2em] uppercase"
          >Tentar novamente</button>
          <a href="/" className="h-10 px-5 rounded-sm hairline text-xs tracking-[0.2em] uppercase inline-flex items-center">Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "São Gerônimo — Artigos místicos, religiosos e decoração espiritual" },
      { name: "description", content: "Há 15 anos selecionando artigos místicos, religiosos e decoração espiritual com olhar editorial. Cristais, incensos, velas, imagens, baralhos e mais." },
      { name: "author", content: "São Gerônimo" },
      { property: "og:title", content: "São Gerônimo — Artigos místicos, religiosos e decoração espiritual" },
      { property: "og:description", content: "Há 15 anos selecionando artigos místicos, religiosos e decoração espiritual com olhar editorial. Cristais, incensos, velas, imagens, baralhos e mais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "São Gerônimo — Artigos místicos, religiosos e decoração espiritual" },
      { name: "twitter:description", content: "Há 15 anos selecionando artigos místicos, religiosos e decoração espiritual com olhar editorial. Cristais, incensos, velas, imagens, baralhos e mais." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/49816796-2d3f-4dfd-b962-642141053574/id-preview-a73b0042--9b4724e2-4cdf-4bd3-9671-e30bfb932842.lovable.app-1779108825986.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/49816796-2d3f-4dfd-b962-642141053574/id-preview-a73b0042--9b4724e2-4cdf-4bd3-9671-e30bfb932842.lovable.app-1779108825986.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <SiteHeader />
          <main className="flex-1 pt-[88px]">
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppFab />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
