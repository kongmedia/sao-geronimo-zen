import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductTile } from "@/components/ProductTile";
import { FilterSidebar, defaultFilters, type Filters } from "@/components/FilterSidebar";
import { categories, productsByCategory } from "@/lib/catalog";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Categoria"} — São Gerônimo` },
      { name: "description", content: loaderData?.cat.blurb ?? "Categoria São Gerônimo" },
      { property: "og:title", content: `${loaderData?.cat.name} — São Gerônimo` },
      { property: "og:description", content: loaderData?.cat.blurb ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-40 text-center">
      <h1 className="font-serif text-4xl">Categoria não encontrada</h1>
      <Link to="/categorias" className="mt-6 inline-block link-underline text-xs tracking-[0.25em] uppercase">Ver todas</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const all = productsByCategory(cat.slug);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const list = all.filter((p) => {
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.premiumOnly && !p.premium) return false;
    if (p.rating < filters.minRating) return false;
    if (filters.subcategories.length > 0) {
      const haystack = `${p.name} ${p.description} ${p.subcategory ?? ""}`.toLowerCase();
      const match = filters.subcategories.some((s) => p.subcategory === s || haystack.includes(s.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div>
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-10">
        <Link to="/categorias" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition">
          ← Categorias
        </Link>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl">{cat.name}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{cat.blurb}</p>
        {cat.subcategories && (
          <div className="mt-6 flex flex-wrap gap-2">
            {cat.subcategories.map((s: string) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  const active = filters.subcategories.includes(s);
                  setFilters({
                    ...filters,
                    subcategories: active
                      ? filters.subcategories.filter((x) => x !== s)
                      : [...filters.subcategories, s],
                  });
                }}
                className={`px-3 py-1.5 rounded-[10px] border text-[11px] tracking-[0.18em] uppercase transition ${
                  filters.subcategories.includes(s)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24 flex gap-10">
        <FilterSidebar filters={filters} onChange={setFilters} showCategories={false} subcategories={cat.subcategories} />
        <div className="flex-1 min-w-0">

          <div className="mb-6 text-xs text-muted-foreground">{list.length} peças</div>
          {list.length === 0 ? (
            <div className="py-32 text-center text-muted-foreground">
              Curadoria desta categoria em preparação. Em breve.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-7">
              {list.map((p, i) => <ProductTile key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
