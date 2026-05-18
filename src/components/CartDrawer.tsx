import { Link } from "@tanstack/react-router";
import { ImageIcon, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatBRL, getProduct } from "@/lib/catalog";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, remove, setQty } = useCart();
  const detailed = items.map((i) => ({ i, p: getProduct(i.id) })).filter((x) => x.p);
  const subtotal = detailed.reduce((s, x) => s + x.p!.price * x.i.qty, 0);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-[80] ${drawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-blue-deep/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background shadow-elevated flex flex-col transition-transform duration-400 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 h-16 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] tracking-[0.28em] uppercase font-medium">Minha sacola</span>
            <span className="text-xs text-muted-foreground">({detailed.length})</span>
          </div>
          <button onClick={closeDrawer} aria-label="Fechar" className="h-9 w-9 -mr-2 flex items-center justify-center hover:text-primary transition">
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {detailed.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" strokeWidth={1} />
              <p className="font-serif text-xl">Sua sacola está em silêncio.</p>
              <button
                onClick={closeDrawer}
                className="mt-2 h-11 px-6 rounded-[10px] bg-primary text-primary-foreground text-[11px] tracking-[0.25em] uppercase hover:bg-blue-deep transition"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border px-5">
              {detailed.map(({ i, p }) => (
                <li key={i.id} className="py-5 flex gap-4">
                  <div className="placeholder-tile h-24 w-20 rounded-[10px] flex items-center justify-center text-muted-foreground/40 shrink-0">
                    <ImageIcon className="h-6 w-6" strokeWidth={1} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/produto/$id"
                      params={{ id: p!.id }}
                      onClick={closeDrawer}
                      className="font-serif text-base leading-tight hover:text-primary transition line-clamp-2"
                    >
                      {p!.name}
                    </Link>
                    <div className="mt-1 text-sm text-primary font-medium">{formatBRL(p!.price * i.qty)}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-[10px]">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary"><Minus className="h-3 w-3" /></button>
                        <span className="w-7 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(i.id)} aria-label="Remover" className="text-muted-foreground hover:text-destructive transition">
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <footer className="border-t border-border p-6 space-y-4 bg-secondary/40">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">Subtotal</span>
              <span className="font-serif text-2xl text-primary">{formatBRL(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Frete e cupons calculados no checkout.</p>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="w-full h-12 rounded-[10px] bg-primary text-primary-foreground text-[11px] tracking-[0.28em] uppercase flex items-center justify-center hover:bg-blue-deep transition"
            >
              Finalização de compra
            </Link>
            <Link
              to="/carrinho"
              onClick={closeDrawer}
              className="w-full h-11 rounded-[10px] border border-primary text-primary text-[11px] tracking-[0.28em] uppercase flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              Ver carrinho
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
