import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatBRL, getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — São Gerônimo" }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, clear } = useCart();
  const detailed = items.map((i) => ({ i, p: getProduct(i.id) })).filter((x) => x.p);
  const subtotal = detailed.reduce((s, x) => s + (x.p!.price * x.i.qty), 0);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <section className="max-w-xl mx-auto px-6 py-32 text-center">
        <div className="font-serif text-6xl text-gold-gradient">✦</div>
        <h1 className="mt-6 font-serif text-4xl">Pedido recebido</h1>
        <p className="mt-4 text-muted-foreground">Em silêncio, preparamos sua peça com intenção. Você receberá uma confirmação por e-mail.</p>
        <Link to="/" className="mt-8 inline-flex h-11 px-6 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase items-center hover:bg-gold transition">
          Voltar ao início
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[1fr_400px] gap-12">
      <div>
        <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
        <div className="mt-6 flex gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          {(["Identificação","Entrega","Pagamento"] as const).map((s, i) => (
            <span key={s} className={`px-3 py-1.5 rounded-full hairline ${step === (i+1) ? "text-foreground border-gold" : ""}`}>{i+1}. {s}</span>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep((step + 1) as 1|2|3); else { clear(); setDone(true); } }}
          className="mt-10 space-y-5"
        >
          {step === 1 && (
            <>
              <Field label="E-mail" type="email" />
              <Field label="Nome completo" />
              <Field label="WhatsApp" type="tel" />
            </>
          )}
          {step === 2 && (
            <>
              <Field label="CEP" />
              <Field label="Endereço" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Número" />
                <Field label="Complemento" />
              </div>
              <Field label="Cidade / UF" />
            </>
          )}
          {step === 3 && (
            <>
              <Field label="Número do cartão" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Validade" placeholder="MM/AA" />
                <Field label="CVV" />
              </div>
              <Field label="Nome impresso" />
            </>
          )}
          <button className="mt-6 w-full h-12 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold transition">
            {step === 3 ? "Pagar com presença" : "Continuar"}
          </button>
        </form>
      </div>

      <aside className="glass rounded-md p-7 h-fit lg:sticky lg:top-32">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Seu ritual</div>
        <div className="space-y-3 max-h-72 overflow-auto pr-2">
          {detailed.length === 0 ? <p className="text-sm text-muted-foreground">Sacola vazia.</p> : detailed.map(({i, p}) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span className="truncate">{p!.name} × {i.qty}</span>
              <span>{formatBRL(p!.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border my-5" />
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="font-serif text-2xl text-gold-gradient">{formatBRL(subtotal)}</span>
        </div>
      </aside>
    </section>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition"
      />
    </label>
  );
}
