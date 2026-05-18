import { Link } from "@tanstack/react-router";
import { ImageIcon, Star } from "lucide-react";
import { categories, formatBRL, type Product } from "@/lib/catalog";

export function ProductTile({ product, index = 0 }: { product: Product; index?: number }) {
  const cat = categories.find((c) => c.slug === product.category);
  const installments = 10;
  const perMonth = product.price / installments;

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="block bg-card rounded-[10px] overflow-hidden border border-border hover:shadow-card transition-shadow"
      >
        <div className="placeholder-tile aspect-square relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 transition-transform duration-700 group-hover:scale-105">
            <ImageIcon className="h-10 w-10" strokeWidth={1} />
          </div>
          {product.premium && (
            <span className="absolute left-3 top-3 text-[10px] tracking-[0.2em] uppercase text-primary bg-background/90 px-2 py-1 rounded-[10px]">
              Premium
            </span>
          )}
        </div>
        <div className="p-4 space-y-1.5">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {cat?.name ?? "—"}
          </div>
          <h3 className="font-serif text-base leading-tight text-foreground line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            {product.rating.toFixed(1)}
          </div>
          <div className="pt-2">
            <div className="text-lg font-semibold text-primary">
              {formatBRL(product.price)}
            </div>
            <div className="text-[11px] text-muted-foreground">
              ou em até <span className="font-medium text-foreground">{installments}x de {formatBRL(perMonth)}</span> sem juros
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
