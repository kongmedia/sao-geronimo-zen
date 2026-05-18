import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/catalog";

export function SiteHeader() {
  const { count, favCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="bg-foreground/95 text-background text-[11px] tracking-[0.25em] uppercase py-2 text-center">
          15 anos consagrando lares · Frete ritualístico para todo Brasil
        </div>
        <header
          className={`transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="lg:hidden h-9 w-9 -ml-2 flex items-center justify-center"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.22em] uppercase">
              <Link to="/loja" className="link-underline">Loja</Link>
              <Link to="/categorias" className="link-underline">Categorias</Link>
              <Link to="/sobre" className="link-underline">Sobre</Link>
              <Link to="/blog" className="link-underline">Diário</Link>
            </nav>

            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-xl tracking-[0.3em] uppercase"
            >
              São <span className="text-gold-gradient">Gerônimo</span>
            </Link>

            <div className="flex items-center gap-1 lg:gap-2">
              <Link to="/loja" aria-label="Buscar" className="h-9 w-9 flex items-center justify-center hover:text-gold transition">
                <Search className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link to="/conta" aria-label="Conta" className="h-9 w-9 hidden sm:flex items-center justify-center hover:text-gold transition">
                <User className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link to="/favoritos" aria-label="Favoritos" className="h-9 w-9 flex items-center justify-center hover:text-gold transition relative">
                <Heart className="h-4 w-4" strokeWidth={1.5} />
                {favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-gold text-background rounded-full h-4 w-4 flex items-center justify-center">{favCount}</span>
                )}
              </Link>
              <Link to="/carrinho" aria-label="Sacola" className="h-9 w-9 flex items-center justify-center hover:text-gold transition relative">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-gold text-background rounded-full h-4 w-4 flex items-center justify-center">{count}</span>
                )}
              </Link>
            </div>
          </div>
        </header>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="relative h-full flex flex-col p-8 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg tracking-[0.3em]">SÃO GERÔNIMO</span>
              <button onClick={() => setOpen(false)} aria-label="Fechar" className="h-9 w-9 flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-5 text-2xl font-serif">
              {[
                ["/", "Início"],
                ["/loja", "Loja"],
                ["/categorias", "Categorias"],
                ["/sobre", "Sobre"],
                ["/blog", "Diário"],
                ["/contato", "Contato"],
                ["/favoritos", "Favoritos"],
                ["/conta", "Minha Conta"],
              ].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b border-border pb-3">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-10">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Categorias</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {categories.slice(0, 12).map((c) => (
                  <Link key={c.slug} to="/categoria/$slug" params={{ slug: c.slug }} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
