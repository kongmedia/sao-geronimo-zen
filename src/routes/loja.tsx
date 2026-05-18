import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductTile } from "@/components/ProductTile";
import { FilterSidebar, defaultFilters, type Filters } from "@/components/FilterSidebar";
import { products } from "@/lib/catalog";

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
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const list = products.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.premiumOnly && !p.premium) return false;
    if (p.rating < filters.minRating) return false;
    return true;
  });

  return (
    <div>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-8">
        <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Acervo</div>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl text-foreground">Loja São Gerônimo</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Filtre por universo, preço e curadoria — encontre a peça certa para o seu ritual.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24 flex gap-10">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div className="flex-1 min-w-0">
          <div className="mb-6 text-xs text-muted-foreground">{list.length} peças encontradas</div>
          {list.length === 0 ? (
            <div className="py-32 text-center text-muted-foreground">Nenhuma peça encontrada com esses filtros.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
              {list.map((p, i) => <ProductTile key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
