import { Link } from "@tanstack/react-router";
import { Heart, ImageIcon, Star } from "lucide-react";
import { formatBRL, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductTile({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleFav, favorites, add } = useCart();
  const fav = favorites.includes(product.id);

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="block"
      >
        <div className="placeholder-tile aspect-[4/5] rounded-md relative overflow-hidden hairline">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 transition-transform duration-700 group-hover:scale-105">
            <ImageIcon className="h-10 w-10" strokeWidth={1} />
          </div>
          <div className="absolute inset-0 bg-veil opacity-70 pointer-events-none" />
          {product.premium && (
            <span className="absolute left-3 top-3 text-[10px] tracking-[0.2em] uppercase text-gold px-2 py-1 glass rounded-sm">
              Premium
            </span>
          )}
          <button
            type="button"
            aria-label="Favoritar"
            onClick={(e) => {
              e.preventDefault();
              toggleFav(product.id);
            }}
            className="absolute right-3 top-3 h-9 w-9 rounded-full glass flex items-center justify-center transition hover:scale-110"
          >
            <Heart
              className={cn("h-4 w-4 transition", fav && "fill-gold text-gold")}
              strokeWidth={1.5}
            />
          </button>
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                add(product.id);
              }}
              className="w-full h-10 rounded-sm bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-gold transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="pt-4 px-1 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" />
              {product.rating.toFixed(1)}
            </div>
          </div>
          <div className="text-sm tracking-wide text-foreground/90">
            {formatBRL(product.price)}
          </div>
        </div>
      </Link>
    </div>
  );
}
