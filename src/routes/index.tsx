import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ImageIcon, Sparkles, Star } from "lucide-react";
import { ProductTile } from "@/components/ProductTile";
import { categories, featured, products } from "@/lib/catalog";
import heroBanner from "@/assets/hero-banner.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "São Gerônimo — Espiritualidade, energia e beleza em cada detalhe" },
      { name: "description", content: "Curadoria editorial de artigos místicos, religiosos e decoração espiritual. 15 anos elevando ambientes, rituais e conexões." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const heroCategories = categories.slice(0, 10);
  const grid = products.slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* HERO BANNER */}
      <section className="relative bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 pb-10">
          <div className="relative rounded-[10px] overflow-hidden shadow-elevated">
            <img
              src={heroBanner}
              alt="São Gerônimo — Artigos místicos e religiosos"
              className="w-full h-auto block"
            />
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-primary">
                <Sparkles className="h-3 w-3" strokeWidth={1.5} /> Coleção 2026 · Edição Aurora
              </div>
              <h1 className="mt-4 font-serif text-3xl md:text-5xl leading-tight text-foreground">
                Espiritualidade, <span className="italic text-primary">energia</span> e beleza em cada detalhe.
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Artigos místicos e religiosos selecionados há 15 anos para elevar ambientes, rituais e conexões espirituais.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/loja" className="group h-12 px-7 rounded-[10px] bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase inline-flex items-center gap-3 hover:bg-blue-deep transition-colors">
                  Explorar Produtos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
                <Link to="/categorias" className="h-12 px-7 rounded-[10px] border border-primary text-primary text-xs tracking-[0.25em] uppercase inline-flex items-center hover:bg-primary hover:text-primary-foreground transition">
                  Categorias
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                ["15", "anos de tradição"],
                ["+5.000", "rituais consagrados"],
                ["+800", "peças selecionadas"],
                ["4.9", "estrelas em avaliações"],
              ].map(([n, l]) => (
                <div key={l} className="p-5 rounded-[10px] bg-background border border-border">
                  <div className="font-serif text-3xl text-primary">{n}</div>
                  <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS EM DESTAQUE */}
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Universos</div>
            <h2 className="font-serif text-4xl md:text-5xl max-w-xl">Categorias em destaque</h2>
          </div>
          <Link to="/categorias" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase link-underline">
            Ver todas <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="-ml-4">
            {heroCategories.map((c, i) => (
              <CarouselItem key={c.slug} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Link
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className="group relative block overflow-hidden rounded-md aspect-[4/5] placeholder-tile hairline animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                    <ImageIcon className="h-12 w-12" strokeWidth={1} />
                  </div>
                  <div className="absolute inset-0 bg-veil" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3 opacity-90">São Gerônimo</div>
                    <h3 className="font-serif text-3xl">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-[260px]">{c.blurb}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase opacity-80 group-hover:text-gold transition">
                      Descobrir <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-background/80 backdrop-blur" />
          <CarouselNext className="right-2 bg-background/80 backdrop-blur" />
        </Carousel>

      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Curadoria</div>
            <h2 className="font-serif text-4xl md:text-5xl">Selecionados pelo olhar editorial</h2>
          </div>
          <Link to="/loja" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase link-underline">
            Ver tudo <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {grid.map((p, i) => (
            <ProductTile key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section className="relative py-32 bg-gradient-to-b from-background via-accent/10 to-background grain">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-md placeholder-tile hairline overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
              <ImageIcon className="h-16 w-16" strokeWidth={0.8} />
            </div>
            <div className="absolute inset-0 bg-veil" />
            <div className="absolute left-6 bottom-6 font-serif text-2xl">Loja física · Estúdio espiritual</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Tradição</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Quinze anos consagrando<br />lares e altares.
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg">
              A São Gerônimo nasceu de um propósito raro: tratar o sagrado com a mesma reverência estética que o cotidiano merece. Cada peça é estudada, abençoada e disposta com intenção — para que entre em sua casa como entra a luz da manhã.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              {[
                "Curadoria autoral",
                "Embalagem ritual",
                "Atendimento humano",
                "Entrega cuidadosa",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                  {t}
                </div>
              ))}
            </div>
            <Link to="/sobre" className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase link-underline">
              Nossa história <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* BANNER LUXUOSO */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="relative overflow-hidden rounded-md p-12 md:p-20 bg-primary text-primary-foreground">
          <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-gold/20 blur-[120px]" />
          <div className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-gold/10 blur-[120px]" />
          <div className="relative max-w-2xl">
            <Sparkles className="h-6 w-6 text-gold" strokeWidth={1.2} />
            <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05]">
              Produtos escolhidos para transformar <span className="italic text-gold-gradient">energia, ambientes</span> e experiências.
            </h2>
            <Link to="/loja" className="mt-10 inline-flex h-12 px-7 rounded-[10px] bg-background text-primary text-xs tracking-[0.25em] uppercase items-center gap-3 hover:bg-gold hover:text-foreground transition">
              Entrar na loja <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>


      {/* FEATURED PREMIUM */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-4xl md:text-5xl">Edição Premium</h2>
          <Link to="/loja" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase link-underline">
            Coleção completa <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {featured.slice(0, 8).map((p, i) => (
            <ProductTile key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Vozes</div>
          <h2 className="font-serif text-4xl md:text-5xl">Quem entra, fica.</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            ["Mariana A.", "São Paulo", "Recebi minha vela e o aroma tomou a casa em silêncio. Embalagem como joia."],
            ["Pedro V.", "Curitiba", "É a loja espiritual mais bonita que já entrei. Atendimento atencioso, real."],
            ["Lúcia M.", "Salvador", "Os cristais chegaram envoltos em linho. Senti o cuidado em cada detalhe."],
          ].map(([name, city, quote], i) => (
            <div key={i} className="glass rounded-md p-8 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-xl leading-snug">"{quote}"</p>
              <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                {name} · {city}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="relative overflow-hidden rounded-md bg-primary text-primary-foreground p-12 md:p-16 text-center">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-gold/20 blur-[120px]" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Diário São Gerônimo</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl max-w-2xl mx-auto">
              Receba rituais, lançamentos e <span className="italic text-gold-gradient">leituras de lua</span>.
            </h2>
            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="seu e-mail"
                className="flex-1 h-12 px-5 rounded-[10px] bg-background text-foreground border border-primary-foreground/20 text-sm focus:outline-none focus:border-gold transition"
              />
              <button className="h-12 px-7 rounded-[10px] bg-gold text-foreground text-xs tracking-[0.25em] uppercase hover:bg-gold-soft transition">
                Assinar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-4xl md:text-5xl">Diário espiritual</h2>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase link-underline">
            Todas as leituras <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Ritual do incenso", "Como preparar a defumação semanal para limpar a casa em silêncio."],
            ["Cristais em cabeceira", "Quartzo rosa, ametista e citrino — três pedras para o sono profundo."],
            ["Altar minimalista", "Compor um altar pequeno, com presença grande, em três passos."],
          ].map(([t, e], i) => (
            <article key={i} className="group">
              <div className="placeholder-tile aspect-[4/3] rounded-md relative overflow-hidden hairline">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                  <ImageIcon className="h-10 w-10" strokeWidth={1} />
                </div>
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mt-6">Leitura · 4 min</div>
              <h3 className="font-serif text-2xl mt-2 group-hover:text-gold transition">{t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
