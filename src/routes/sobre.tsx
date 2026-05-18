import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — São Gerônimo" },
      { name: "description", content: "Há 15 anos, a São Gerônimo seleciona o sagrado com olhar editorial." },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative min-h-[60vh] flex items-end pb-20 bg-hero grain">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Nossa história</div>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl max-w-3xl leading-[1.02]">
            Quinze anos<br /><span className="italic text-gold-gradient">tratando o sagrado</span> com reverência estética.
          </h1>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-16">
        <div className="placeholder-tile aspect-[4/5] rounded-md hairline relative">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
            <ImageIcon className="h-16 w-16" strokeWidth={0.8} />
          </div>
        </div>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p className="font-serif text-3xl text-foreground">Tudo começou em uma sala pequena, com três imagens e uma vela acesa.</p>
          <p>De lá para cá, a São Gerônimo se tornou referência em artigos místicos, religiosos e decoração espiritual no Brasil — recebendo pessoas em busca de um objeto que não apenas decora, mas se torna companhia.</p>
          <p>Nosso trabalho é selecionar peças com história, materiais nobres e acabamento artesanal. Cada item passa por nossas mãos antes de chegar às suas.</p>
          <p>Acreditamos que a beleza é um caminho de elevação. Por isso, nada aqui é genérico: cada incenso, cada cristal, cada imagem carrega curadoria e intenção.</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24 grid md:grid-cols-3 gap-6">
        {[
          ["Curadoria", "Olhar editorial em cada peça."],
          ["Artesania", "Materiais nobres, mãos atentas."],
          ["Reverência", "O sagrado tratado com beleza."],
        ].map(([t, d]) => (
          <div key={t} className="glass rounded-md p-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Princípio</div>
            <div className="mt-3 font-serif text-3xl">{t}</div>
            <p className="mt-3 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-32 text-center">
        <Link to="/loja" className="inline-flex h-12 px-8 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold transition items-center">
          Entrar na curadoria
        </Link>
      </section>
    </div>
  );
}
