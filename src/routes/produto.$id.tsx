import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ImageIcon, Minus, Plus, Shield, ShoppingBag, Star, Truck } from "lucide-react";
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
  const { add, openDrawer } = useCart();
  const [qty, setQty] = useState(1);
  const [main, setMain] = useState(0);
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<{ name: string; price: string; eta: string }[] | null>(null);
  const sameCat = products.filter((p) => p.category === product.category && p.id !== product.id);
  const fillers = products.filter((p) => p.id !== product.id && !sameCat.includes(p));
  const related = [...sameCat, ...fillers].slice(0, 4);
  const sku = `SG-${product.id.toUpperCase()}`;

  const handleBuy = () => {
    add(product.id, qty);
    openDrawer();
  };

  const calcCep = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    setShipping([
      { name: "PAC", price: formatBRL(24.9), eta: "8 a 12 dias úteis" },
      { name: "Sedex", price: formatBRL(42.5), eta: "3 a 5 dias úteis" },
      { name: "Expressa Ritualística", price: formatBRL(64.9), eta: "1 a 2 dias úteis" },
    ]);
  };

  return (
    <div>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 pb-16 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="placeholder-tile aspect-square rounded-md hairline relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
              <ImageIcon className="h-20 w-20" strokeWidth={0.8} />
            </div>
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-gold px-2 py-1 glass rounded-[10px]">
              Galeria {main + 1} / 4
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setMain(i)}
                className={cn(
                  "placeholder-tile aspect-square rounded-[10px] hairline transition",
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
          <div className="mt-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">SKU: {sku}</div>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40")} />
              ))}
            </div>
            <span>{product.rating.toFixed(1)} · 128 avaliações</span>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-serif text-3xl text-primary">{formatBRL(product.price)}</span>
            <span className="text-xs text-muted-foreground">ou 10x de {formatBRL(product.price / 10)} sem juros</span>
          </div>

          {/* Short description only */}
          <p className="mt-8 text-foreground/80 leading-relaxed text-[15px]">
            {product.description}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center hairline rounded-[10px]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 flex items-center justify-center hover:text-primary transition" aria-label="Diminuir">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-12 w-12 flex items-center justify-center hover:text-primary transition" aria-label="Aumentar">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={handleBuy}
              className="flex-1 h-12 rounded-[10px] bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase inline-flex items-center justify-center gap-3 hover:bg-blue-deep transition"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Comprar agora
            </button>
          </div>

          {/* CEP calculator */}
          <div className="mt-8 p-5 rounded-[10px] hairline">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Calcular frete e prazo</div>
            <form onSubmit={calcCep} className="flex gap-2">
              <input
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite seu CEP"
                maxLength={9}
                className="flex-1 h-11 px-4 rounded-[10px] hairline bg-background text-sm focus:outline-none focus:border-primary"
              />
              <button type="submit" className="h-11 px-5 rounded-[10px] bg-primary text-primary-foreground text-[11px] tracking-[0.25em] uppercase hover:bg-blue-deep transition">
                Calcular
              </button>
            </form>
            {shipping && (
              <ul className="mt-4 space-y-2 text-sm">
                {shipping.map((s) => (
                  <li key={s.name} className="flex justify-between border-t border-border pt-2">
                    <span>{s.name}<span className="text-muted-foreground"> · {s.eta}</span></span>
                    <span className="text-primary font-medium">{s.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-muted-foreground hover:text-primary">Não sei meu CEP</a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="glass p-4 rounded-[10px] flex items-start gap-3">
              <Truck className="h-4 w-4 text-gold mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="text-foreground">Envio cuidadoso</div>
                <div className="text-muted-foreground text-xs mt-1">Embalagem ritual em todo Brasil</div>
              </div>
            </div>
            <div className="glass p-4 rounded-[10px] flex items-start gap-3">
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

      {/* Long description — moved here, above related */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 border-t border-border">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Descrição completa</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Cada detalhe carrega intenção.</h2>
          </div>
          <div className="lg:col-span-9 space-y-4 text-foreground/80 leading-relaxed text-[15px]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula, magna sit amet faucibus volutpat, est nisi varius nibh, nec interdum sapien ipsum a justo. Nullam consectetur, lorem in cursus tincidunt, lectus turpis dignissim purus, vitae fermentum nibh urna nec felis.
            </p>
            <p>
              Suspendisse potenti. Curabitur in tortor non dolor pellentesque tincidunt. Aliquam erat volutpat. Vivamus euismod metus a urna pulvinar, nec gravida orci viverra. Mauris vel arcu sit amet justo bibendum aliquet eu in nibh. Phasellus ultrices, mi vel hendrerit egestas, lorem nibh dignissim libero, vitae aliquet justo justo non nisl.
            </p>
            <p>
              <strong className="text-foreground">Materiais:</strong> composição artesanal selecionada · <strong className="text-foreground">Origem:</strong> ateliês parceiros São Gerônimo · <strong className="text-foreground">Cuidados:</strong> limpar com pano seco, manter longe de umidade · <strong className="text-foreground">Energia:</strong> pode ser consagrada conforme sua tradição. Cada exemplar carrega pequenas variações que celebram a feitura à mão.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 border-t border-border">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Combinam com esta peça</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
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
