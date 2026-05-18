import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, MapPin, LogOut } from "lucide-react";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [{ title: "Minha conta — São Gerônimo" }, { name: "robots", content: "noindex" }] }),
  component: Account,
});

function Account() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
      <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Espaço pessoal</div>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Bem-vinda(o) de volta</h1>
      <p className="mt-4 text-muted-foreground max-w-xl">Gerencie seus pedidos, favoritos, endereços e preferências.</p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Package, t: "Pedidos", d: "Histórico e rastreamento", to: "/conta" },
          { icon: Heart, t: "Favoritos", d: "Peças que te chamaram", to: "/favoritos" },
          { icon: MapPin, t: "Endereços", d: "Onde a energia chega", to: "/conta" },
          { icon: LogOut, t: "Sair", d: "Encerrar sessão", to: "/" },
        ].map(({ icon: Icon, t, d, to }) => (
          <Link key={t} to={to} className="glass rounded-md p-6 hover:border-gold/60 hover:-translate-y-0.5 transition">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <div className="mt-4 font-serif text-2xl">{t}</div>
            <div className="text-xs text-muted-foreground mt-1">{d}</div>
          </Link>
        ))}
      </div>

      <div className="mt-16 glass rounded-md p-8 max-w-xl">
        <h2 className="font-serif text-2xl">Entrar</h2>
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="e-mail" className="w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition" />
          <input type="password" placeholder="senha" className="w-full h-12 px-4 rounded-sm bg-background hairline text-sm focus:outline-none focus:border-gold transition" />
          <button className="w-full h-12 rounded-sm bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold transition">Entrar</button>
        </form>
      </div>
    </section>
  );
}
