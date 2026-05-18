import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ImageIcon } from "lucide-react";
import { categories } from "@/lib/catalog";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — São Gerônimo" },
      { name: "description", content: "Imagens religiosas, incensos, velas, cristais, baralhos, decoração mística e mais." },
    ],
    links: [{ rel: "canonical", href: "/categorias" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-16">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Universos São Gerônimo</div>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Todas as categorias</h1>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            to="/categoria/$slug"
            params={{ slug: c.slug }}
            className="group relative aspect-[5/3] rounded-md placeholder-tile hairline overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
              <ImageIcon className="h-10 w-10" strokeWidth={1} />
            </div>
            <div className="absolute inset-0 bg-veil" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-serif text-2xl">{c.name}</h2>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold opacity-0 group-hover:opacity-100 transition">
                Explorar <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
