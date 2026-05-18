import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { categories, products } from "@/lib/catalog";

export function SiteHeader() {
  const { count, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [searchOpen]);

  const singleWordCats = useMemo(
    () => categories.filter((c) => c.name.trim().split(/\s+/).length === 1).slice(0, 8),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { prods: [], cats: [] };
    return {
      prods: products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8),
      cats: categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 5),
    };
  }, [query]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItemClass = (active: boolean) =>
    `relative hover:text-primary transition whitespace-nowrap uppercase pb-1 ${
      active ? "text-primary after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-gold" : ""
    }`;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="bg-foreground text-background text-[11px] tracking-[0.25em] uppercase py-2 text-center">
          15 anos consagrando lares · Frete ritualístico para todo Brasil
        </div>
        <header className={`transition-all duration-500 bg-background border-b border-border ${scrolled ? "shadow-card" : ""}`}>
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

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] tracking-[0.22em] uppercase flex-1 justify-center">
              <Link to="/" onMouseEnter={() => setMegaOpen(false)} className={navItemClass(isActive("/"))}>
                Home
              </Link>
              {singleWordCats.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={navItemClass(location.pathname === `/categoria/${c.slug}`)}
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
                TODAS
                <ChevronDown className={`h-3 w-3 transition-transform ${megaOpen ? "rotate-180" : ""}`} strokeWidth={1.8} />
              </button>
            </nav>

            <div className="flex items-center gap-1 lg:gap-1.5 shrink-0">
              <button onClick={() => setSearchOpen(true)} aria-label="Buscar" className="h-9 w-9 flex items-center justify-center hover:text-gold transition">
                <Search className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <Link to="/conta" aria-label="Conta" className="h-9 w-9 hidden sm:flex items-center justify-center hover:text-gold transition">
                <User className="h-4 w-4" strokeWidth={1.5} />
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

      {/* Search popup */}
      {searchOpen && (
        <div className="fixed inset-0 z-[90]">
          <div className="absolute inset-0 bg-blue-deep/40 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} />
          <div className="relative max-w-2xl mx-auto mt-28 px-4 animate-fade-up">
            <div className="bg-background rounded-[10px] shadow-elevated overflow-hidden">
              <div className="flex items-center px-5 h-14 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produto ou categoria…"
                  className="flex-1 px-4 bg-transparent outline-none text-sm"
                />
                <button onClick={() => setSearchOpen(false)} className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {!query.trim() ? (
                  <div className="px-5 py-8 text-sm text-muted-foreground">Digite o nome de um produto ou categoria.</div>
                ) : results.prods.length === 0 && results.cats.length === 0 ? (
                  <div className="px-5 py-8 text-sm text-muted-foreground">Nada encontrado para "{query}".</div>
                ) : (
                  <div className="py-2">
                    {results.cats.length > 0 && (
                      <div className="px-5 py-2">
                        <div className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">Categorias</div>
                        {results.cats.map((c) => (
                          <Link
                            key={c.slug}
                            to="/categoria/$slug"
                            params={{ slug: c.slug }}
                            onClick={() => setSearchOpen(false)}
                            className="block py-2 hover:text-primary"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    {results.prods.length > 0 && (
                      <div className="px-5 py-2 border-t border-border">
                        <div className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">Produtos</div>
                        {results.prods.map((p) => (
                          <Link
                            key={p.id}
                            to="/produto/$id"
                            params={{ id: p.id }}
                            onClick={() => setSearchOpen(false)}
                            className="flex justify-between gap-4 py-2 hover:text-primary"
                          >
                            <span className="font-serif">{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.category}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
                ["/", "Home"],
                ["/categorias", "Categorias"],
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
