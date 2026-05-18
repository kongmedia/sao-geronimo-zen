import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Diário — São Gerônimo" },
      { name: "description", content: "Rituais, leituras de lua e o diário espiritual da São Gerônimo." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  ["Ritual do incenso semanal", "Defumação", "Como criar um ritual simples e poderoso para purificar o ambiente toda semana."],
  ["Cristais para a cabeceira", "Sono profundo", "Três pedras para acalmar a mente antes de dormir e atravessar a noite em paz."],
  ["Altar minimalista em três passos", "Espaço sagrado", "Compor um altar pequeno, com presença grande, sem cair no excesso."],
  ["O som dos sinos dos ventos", "Energia em movimento", "Por que pequenas vibrações sonoras transformam um espaço inteiro."],
  ["A vela como meditação", "Foco e intenção", "A chama é a forma mais antiga de centrar o pensamento. Recupere o gesto."],
  ["Tarot como linguagem", "Auto-leitura", "Como aproximar-se das cartas sem expectativas — e ouvir mais do que perguntar."],
];

function Blog() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Diário</div>
      <h1 className="mt-3 font-serif text-5xl md:text-7xl">Leituras espirituais</h1>
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map(([t, c, e], i) => (
          <article key={i} className="group animate-fade-up" style={{ animationDelay: `${i*60}ms` }}>
            <div className="placeholder-tile aspect-[4/3] rounded-md hairline relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                <ImageIcon className="h-10 w-10" strokeWidth={1} />
              </div>
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mt-6">{c} · 4 min</div>
            <h2 className="font-serif text-2xl mt-2 group-hover:text-gold transition">{t}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
