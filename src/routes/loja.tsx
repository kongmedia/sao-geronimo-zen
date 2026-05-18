import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductTile } from "@/components/ProductTile";
import { categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja — São Gerônimo" },
      { name: "description", content: "Toda a curadoria São Gerônimo em um só lugar. Cristais, velas, incensos, baralhos e mais." },
    ],
    links: [{ rel: "canonical", href: "/loja" }],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<string | "all">("all");
  const list = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-10">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Acervo</div>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Loja São Gerônimo</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Filtre por universo e percorra uma curadoria editorial de objetos sagrados.
        </p>
      </section>

      <section className="border-y border-border sticky top-[88px] z-30 glass-strong">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <Chip active={active === "all"} onClick={() => setActive("all")}>Todos</Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={active === c.slug} onClick={() => setActive(c.slug)}>
                {c.name}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        {list.length === 0 ? (
          <div className="py-32 text-center text-muted-foreground">
            Em breve novas peças neste universo.
            <div className="mt-6">
              <Link to="/loja" className="link-underline text-xs tracking-[0.25em] uppercase">Ver todos</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {list.map((p, i) => <ProductTile key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-4 rounded-full text-[11px] tracking-[0.22em] uppercase transition border ${
        active ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}
