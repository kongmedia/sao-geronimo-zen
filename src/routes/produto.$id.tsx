import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ImageIcon, Minus, Plus, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import { ProductTile } from "@/components/ProductTile";
import { useCart } from "@/lib/cart";
import { formatBRL, getProduct, products } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Produto"} — São Gerônimo` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:type", content: "product" },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-40 text-center">
      <h1 className="font-serif text-4xl">Peça não encontrada</h1>
      <Link to="/loja" className="mt-6 inline-block link-underline text-xs tracking-[0.25em] uppercase">Voltar à loja</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, toggleFav, favorites } = useCart();
  const fav = favorites.includes(product.id);
  const [qty, setQty] = useState(1);
  const [main, setMain] = useState(0);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 pb-20 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="placeholder-tile aspect-square rounded-md hairline relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
              <ImageIcon className="h-20 w-20" strokeWidth={0.8} />
            </div>
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-gold px-2 py-1 glass rounded-sm">
              Galeria {main + 1} / 4
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0,1,2,3].map((i) => (
              <button
                key={i}
                onClick={() => setMain(i)}
                className={cn(
                  "placeholder-tile aspect-square rounded-sm hairline transition",
                  main === i ? "ring-1 ring-gold" : "opacity-70 hover:opacity-100"
                )}
                aria-label={`Imagem ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="lg:pl-6">
          <Link to="/loja" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition">
            ← Loja
          </Link>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({length:5}).map((_,i) => (
                <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40")} />
              ))}
            </div>
            <span>{product.rating.toFixed(1)} · 128 avaliações</span>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-serif text-3xl text-gold-gradient">{formatBRL(product.price)}</span>
            <span className="text-xs text-muted-foreground">ou 3x sem juros</span>
          </div>

          <p className="mt-8 text-foreground/80 leading-relaxed text-[15px]">
            {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a velit at lectus posuere tincidunt. Cada peça segue um ritual de seleção autoral.
          </p>

          <div className="mt-6 border-l-2 border-gold/40 pl-5 text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              <span className="text-gold tracking-[0.2em] uppercase text-[10px] block mb-2">Descrição completa</span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula, magna sit amet faucibus volutpat, est nisi varius nibh, nec interdum sapien ipsum a justo. Nullam consectetur, lorem in cursus tincidunt, lectus turpis dignissim purus, vitae fermentum nibh urna nec felis.
            </p>
            <p>
              Suspendisse potenti. Curabitur in tortor non dolor pellentesque tincidunt. Aliquam erat volutpat. Vivamus euismod metus a urna pulvinar, nec gravida orci viverra. Mauris vel arcu sit amet justo bibendum aliquet eu in nibh. Phasellus ultrices, mi vel hendrerit egestas, lorem nibh dignissim libero, vitae aliquet justo justo non nisl.
            </p>
            <p>
              Materiais: composição artesanal selecionada · Origem: ateliês parceiros São Gerônimo · Cuidados: limpar com pano seco, manter longe de umidade · Energia: pode ser consagrada conforme sua tradição. Cada exemplar carrega pequenas variações que celebram a feitura à mão.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center hairline rounded-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 flex items-center justify-center hover:text-gold transition" aria-label="Diminuir">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-12 w-12 flex items-center justify-center hover:text-gold transition" aria-label="Aumentar">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => add(product.id, qty)}
              className="flex-1 h-12 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase inline-flex items-center justify-center gap-3 hover:bg-gold transition"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Adicionar à sacola
            </button>
            <button
              onClick={() => toggleFav(product.id)}
              aria-label="Favoritar"
              className="h-12 w-12 rounded-sm hairline flex items-center justify-center hover:text-gold transition"
            >
              <Heart className={cn("h-4 w-4", fav && "fill-gold text-gold")} strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            <div className="glass p-4 rounded-sm flex items-start gap-3">
              <Truck className="h-4 w-4 text-gold mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="text-foreground">Envio cuidadoso</div>
                <div className="text-muted-foreground text-xs mt-1">Embalagem ritual em todo Brasil</div>
              </div>
            </div>
            <div className="glass p-4 rounded-sm flex items-start gap-3">
              <Shield className="h-4 w-4 text-gold mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="text-foreground">Garantia São Gerônimo</div>
                <div className="text-muted-foreground text-xs mt-1">7 dias para arrependimento</div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Perguntas frequentes</h2>
            <Faq items={[
              ["Cada peça é única?", "Sim. Peças artesanais variam levemente em cor, textura e veios — parte da assinatura."],
              ["Posso devolver?", "Aceitamos devoluções em até 7 dias após o recebimento, na embalagem original."],
              ["Vocês enviam internacionalmente?", "Sim, sob consulta via WhatsApp. Calculamos frete e seguro caso a caso."],
            ]} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 border-t border-border">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Combinam com esta peça</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p, i) => <ProductTile key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border">
      {items.map(([q, a], i) => (
        <div key={i} className="py-4">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left">
            <span className="font-serif text-lg">{q}</span>
            <span className="text-gold text-xl">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>}
        </div>
      ))}
    </div>
  );
}
