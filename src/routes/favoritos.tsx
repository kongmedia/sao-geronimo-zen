import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductTile } from "@/components/ProductTile";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — São Gerônimo" }, { name: "robots", content: "noindex" }] }),
  component: Favs,
});

function Favs() {
  const { favorites } = useCart();
  const list = favorites.map(getProduct).filter(Boolean) as ReturnType<typeof getProduct>[];

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <h1 className="font-serif text-5xl md:text-6xl">Favoritos</h1>
      <p className="mt-4 text-muted-foreground">As peças que pediram para ficar perto.</p>
      {list.length === 0 ? (
        <div className="mt-20 text-center glass p-12 rounded-md">
          <p className="font-serif text-2xl">Ainda não há favoritos.</p>
          <Link to="/loja" className="mt-6 inline-flex h-11 px-6 rounded-[10px] bg-foreground text-background text-xs tracking-[0.25em] uppercase items-center hover:bg-gold transition">
            Explorar a loja
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {list.map((p, i) => <ProductTile key={p!.id} product={p!} index={i} />)}
        </div>
      )}
    </section>
  );
}
