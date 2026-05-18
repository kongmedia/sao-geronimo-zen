import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="preloader-fade-out fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-soft/40 via-background to-secondary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[120px] animate-glow-pulse" />
      <div className="relative flex flex-col items-center gap-6 animate-fade-up">
        <div className="font-serif text-3xl md:text-4xl tracking-[0.35em] uppercase text-foreground">
          São <span className="text-gold-gradient">Gerônimo</span>
        </div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          Espiritualidade · Energia · Beleza
        </div>
        <div className="mt-2 h-[1px] w-32 overflow-hidden bg-border">
          <div className="h-full w-full bg-gold-gradient animate-[shimmer_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
