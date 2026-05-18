import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageIcon, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatBRL, getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [{ title: "Sacola — São Gerônimo" }, { name: "robots", content: "noindex" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty } = useCart();
  const detailed = items.map((i) => ({ i, p: getProduct(i.id) })).filter((x) => x.p);
  const subtotal = detailed.reduce((s, x) => s + (x.p!.price * x.i.qty), 0);

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
      <h1 className="font-serif text-5xl md:text-6xl">Sua sacola</h1>
      <p className="mt-4 text-muted-foreground">Peças selecionadas com presença — revise antes de seguir.</p>

      {detailed.length === 0 ? (
        <div className="mt-20 text-center glass p-12 rounded-md">
          <p className="font-serif text-2xl">Sua sacola está em silêncio.</p>
          <Link to="/loja" className="mt-6 inline-flex h-11 px-6 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase items-center hover:bg-gold transition">
            Descobrir peças
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="divide-y divide-border">
            {detailed.map(({ i, p }) => (
              <div key={i.id} className="py-6 flex gap-5">
                <div className="placeholder-tile h-28 w-24 rounded-sm flex items-center justify-center text-muted-foreground/40">
                  <ImageIcon className="h-8 w-8" strokeWidth={1} />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-4">
                    <Link to="/produto/$id" params={{ id: p!.id }} className="font-serif text-xl hover:text-gold transition">
                      {p!.name}
                    </Link>
                    <span className="font-serif text-lg">{formatBRL(p!.price * i.qty)}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center hairline rounded-sm text-sm">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="h-9 w-9">−</button>
                      <span className="w-8 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="h-9 w-9">+</button>
                    </div>
                    <button onClick={() => remove(i.id)} aria-label="Remover" className="text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="glass rounded-md p-7 h-fit lg:sticky lg:top-32">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Resumo ritual</div>
            <Row label="Subtotal" value={formatBRL(subtotal)} />
            <Row label="Frete" value="Calculado no checkout" />
            <div className="border-t border-border my-5" />
            <Row label="Total" value={formatBRL(subtotal)} large />
            <Link to="/checkout" className="mt-7 w-full inline-flex h-12 items-center justify-center rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold transition">
              Finalizar compra
            </Link>
            <Link to="/loja" className="mt-3 w-full inline-flex h-12 items-center justify-center text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition">
              Continuar comprando
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="flex justify-between items-baseline py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={large ? "font-serif text-2xl text-gold-gradient" : "text-sm"}>{value}</span>
    </div>
  );
}
