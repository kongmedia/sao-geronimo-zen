import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/catalog";

export function SiteHeader() {
  const { count, favCount, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="bg-foreground text-background text-[11px] tracking-[0.25em] uppercase py-2 text-center">
          15 anos consagrando lares · Frete ritualístico para todo Brasil
        </div>
        <header
          className={`transition-all duration-500 ${
            scrolled ? "glass-strong shadow-card" : "bg-background/80 backdrop-blur-md"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="lg:hidden h-9 w-9 -ml-2 flex items-center justify-center"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <Link
              to="/"
              className="font-serif text-xl tracking-[0.3em] uppercase shrink-0"
            >
              São <span className="text-gold-gradient">Gerônimo</span>
            </Link>

            {/* Desktop nav: single-word categories + Todas as categorias */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] tracking-[0.22em] uppercase flex-1 justify-center">
              {categories
                .filter((c) => c.name.trim().split(/\s+/).length === 1)
                .slice(0, 5)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
                    onMouseEnter={() => setMegaOpen(false)}
                    className="link-underline hover:text-primary transition whitespace-nowrap uppercase"
                  >
                    {c.name.toUpperCase()}
                  </Link>
                ))}
              <button
                onMouseEnter={() => setMegaOpen(true)}
                onFocus={() => setMegaOpen(true)}
                className="inline-flex items-center gap-1.5 hover:text-primary transition whitespace-nowrap uppercase"
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                TODAS AS CATEGORIAS
                <ChevronDown className={`h-3 w-3 transition-transform ${megaOpen ? "rotate-180" : ""}`} strokeWidth={1.8} />
              </button>
            </nav>


            <div className="flex items-center gap-1 lg:gap-1.5 shrink-0">
              <Link to="/loja" aria-label="Buscar" className="h-9 w-9 flex items-center justify-center hover:text-gold transition">
                <Search className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link to="/conta" aria-label="Conta" className="h-9 w-9 hidden sm:flex items-center justify-center hover:text-gold transition">
                <User className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link to="/favoritos" aria-label="Favoritos" className="h-9 w-9 flex items-center justify-center hover:text-gold transition relative">
                <Heart className="h-4 w-4" strokeWidth={1.5} />
                {favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-gold text-white rounded-full h-4 w-4 flex items-center justify-center">{favCount}</span>
                )}
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                aria-label="Sacola"
                className="h-9 w-9 flex items-center justify-center hover:text-primary transition relative"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center">{count}</span>
                )}
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <div
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className={`hidden lg:block absolute left-0 right-0 top-full border-t border-border bg-background/98 backdrop-blur-xl shadow-elevated transition-all duration-300 origin-top ${
              megaOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-12 gap-8">
              <div className="col-span-3 border-r border-border pr-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Universos</div>
                <h3 className="font-serif text-3xl leading-tight">Toda a curadoria São Gerônimo.</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Mais de 800 peças entre cristais, incensos, velas, imagens, baralhos e decoração espiritual.
                </p>
                <Link
                  to="/categorias"
                  onClick={() => setMegaOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase link-underline text-gold"
                >
                  Ver todas categorias →
                </Link>
              </div>

              <div className="col-span-9 grid grid-cols-4 gap-x-6 gap-y-7 max-h-[440px] overflow-y-auto pr-2">
                {categories.map((c) => (
                  <div key={c.slug}>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setMegaOpen(false)}
                      className="block font-serif text-base text-foreground hover:text-gold transition"
                    >
                      {c.name}
                    </Link>
                    {c.subcategories && c.subcategories.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {c.subcategories.slice(0, 5).map((sub) => (
                          <li key={sub}>
                            <Link
                              to="/categoria/$slug"
                              params={{ slug: c.slug }}
                              onClick={() => setMegaOpen(false)}
                              className="text-[12px] text-muted-foreground hover:text-foreground transition"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-background/97 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="relative h-full flex flex-col p-8 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg tracking-[0.3em]">SÃO <span className="text-gold-gradient">GERÔNIMO</span></span>
              <button onClick={() => setOpen(false)} aria-label="Fechar" className="h-9 w-9 flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-4 text-2xl font-serif">
              {[
                ["/", "Início"],
                ["/categorias", "Categorias"],
                ["/favoritos", "Favoritos"],
                ["/contato", "Contato"],
              ].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b border-border pb-3">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-10">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Todas categorias</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {categories.map((c) => (
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
