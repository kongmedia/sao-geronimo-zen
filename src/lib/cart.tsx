import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type CartItem = { id: string; qty: number };
type FavSet = string[];

type CartCtx = {
  items: CartItem[];
  favorites: FavSet;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleFav: (id: string) => void;
  count: number;
  favCount: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavSet>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("sg-cart");
      const f = localStorage.getItem("sg-fav");
      if (c) setItems(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("sg-cart", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem("sg-fav", JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      favorites,
      add: (id, qty = 1) =>
        setItems((p) => {
          const e = p.find((x) => x.id === id);
          return e
            ? p.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x))
            : [...p, { id, qty }];
        }),
      remove: (id) => setItems((p) => p.filter((x) => x.id !== id)),
      setQty: (id, qty) =>
        setItems((p) => p.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))),
      clear: () => setItems([]),
      toggleFav: (id) =>
        setFavorites((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
      count: items.reduce((s, x) => s + x.qty, 0),
      favCount: favorites.length,
    }),
    [items, favorites],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};
