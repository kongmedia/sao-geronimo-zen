import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/catalog";

export type Filters = {
  categories: string[];
  subcategories: string[];
  minPrice: number;
  maxPrice: number;
  premiumOnly: boolean;
  minRating: number;
};

export const defaultFilters: Filters = {
  categories: [],
  subcategories: [],
  minPrice: 0,
  maxPrice: 1000,
  premiumOnly: false,
  minRating: 0,
};

export function FilterSidebar({
  filters,
  onChange,
  showCategories = true,
  subcategories,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  showCategories?: boolean;
  subcategories?: string[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCat = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((s) => s !== slug)
      : [...filters.categories, slug];
    onChange({ ...filters, categories: next });
  };

  const clear = () => onChange(defaultFilters);

  const inner = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] tracking-[0.28em] uppercase font-medium">Filtros</h3>
        <button onClick={clear} className="text-[11px] text-primary hover:underline">
          Limpar
        </button>
      </div>

      {showCategories && (
        <Section title="Categorias" defaultOpen>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
            {categories.map((c) => (
              <label key={c.slug} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.slug)}
                  onChange={() => toggleCat(c.slug)}
                  className="h-4 w-4 rounded border-border accent-[var(--primary)]"
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </Section>
      )}

      {subcategories && subcategories.length > 0 && (
        <Section title="Subcategorias" defaultOpen>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
            {subcategories.map((s) => {
              const active = filters.subcategories.includes(s);
              return (
                <label key={s} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => {
                      const next = active
                        ? filters.subcategories.filter((x) => x !== s)
                        : [...filters.subcategories, s];
                      onChange({ ...filters, subcategories: next });
                    }}
                    className="h-4 w-4 rounded border-border accent-[var(--primary)]"
                  />
                  <span>{s}</span>
                </label>
              );
            })}
          </div>
        </Section>
      )}

      <Section title="Preço" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
              className="w-full h-9 px-2.5 rounded-[10px] border border-border text-sm focus:outline-none focus:border-primary"
              placeholder="Mín"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full h-9 px-2.5 rounded-[10px] border border-border text-sm focus:outline-none focus:border-primary"
              placeholder="Máx"
            />
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[var(--primary)]"
          />
          <div className="text-[11px] text-muted-foreground">Até R$ {filters.maxPrice}</div>
        </div>
      </Section>

      <Section title="Avaliação">
        <div className="space-y-2">
          {[4.5, 4, 3].map((r) => (
            <label key={r} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => onChange({ ...filters, minRating: r })}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              <span>★ {r}+ estrelas</span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => onChange({ ...filters, minRating: 0 })}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            <span>Todas</span>
          </label>
        </div>
      </Section>

      <Section title="Coleção">
        <label className="flex items-center gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.premiumOnly}
            onChange={(e) => onChange({ ...filters, premiumOnly: e.target.checked })}
            className="h-4 w-4 rounded border-border accent-[var(--primary)]"
          />
          <span>Apenas Premium</span>
        </label>
      </Section>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden h-10 px-4 rounded-[10px] border border-border inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-6"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filtros
      </button>
      <aside className="hidden lg:block w-[260px] shrink-0 sticky top-[110px] self-start">
        {inner}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-blue-deep/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[320px] bg-background p-6 overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileOpen(false)} className="h-9 w-9 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            {inner}
            <button onClick={() => setMobileOpen(false)} className="mt-8 w-full h-11 rounded-[10px] bg-primary text-primary-foreground text-[11px] tracking-[0.25em] uppercase">
              Ver resultados
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border pt-5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-[11px] tracking-[0.28em] uppercase font-medium">
        {title}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
