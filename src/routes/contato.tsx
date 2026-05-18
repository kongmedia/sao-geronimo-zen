import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — São Gerônimo" },
      { name: "description", content: "Fale com a curadoria São Gerônimo." },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16">
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Conversar</div>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Fale com a curadoria</h1>
        <p className="mt-6 text-muted-foreground max-w-md">Respondemos com calma, no mesmo dia. Para pedidos especiais, peças sob encomenda ou montagem de altar.</p>

        <div className="mt-12 space-y-6">
          {[
            { I: Phone, t: "WhatsApp", d: "+55 (00) 00000-0000" },
            { I: Mail, t: "E-mail", d: "ola@saogeronimo.com" },
            { I: MapPin, t: "Loja física", d: "Rua das Velas, 15 — Centro" },
          ].map(({ I, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full glass flex items-center justify-center text-gold">
                <I className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t}</div>
                <div className="mt-1 font-serif text-xl">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="glass rounded-md p-8 space-y-5 h-fit">
        <input placeholder="seu nome" className="w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition" />
        <input type="email" placeholder="e-mail" className="w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition" />
        <input placeholder="assunto" className="w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition" />
        <textarea placeholder="mensagem" rows={6} className="w-full px-4 py-3 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition resize-none" />
        <button className="w-full h-12 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold transition">Enviar</button>
      </form>
    </section>
  );
}
