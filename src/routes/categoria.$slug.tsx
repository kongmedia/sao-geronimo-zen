import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductTile } from "@/components/ProductTile";
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
  const list = productsByCategory(cat.slug);

  return (
    <div>
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-16">
        <Link to="/categorias" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition">
          ← Categorias
        </Link>
        <h1 className="mt-6 font-serif text-5xl md:text-7xl">{cat.name}</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">{cat.blurb}</p>
        {cat.subcategories && (
          <div className="mt-8 flex flex-wrap gap-2">
            {cat.subcategories.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full hairline text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        {list.length === 0 ? (
          <div className="py-32 text-center text-muted-foreground">
            Curadoria desta categoria em preparação. Em breve.
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
