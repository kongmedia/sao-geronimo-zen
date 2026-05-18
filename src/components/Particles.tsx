export function Particles({ count = 24 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 0.7) % 14;
        const dur = 10 + ((i * 1.3) % 8);
        const size = 1 + ((i * 7) % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/60 animate-particle"
            style={{
              left: `${left}%`,
              bottom: "-10vh",
              width: size,
              height: size,
              filter: "blur(0.5px)",
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              boxShadow: "0 0 8px oklch(0.82 0.12 85 / 0.7)",
            }}
          />
        );
      })}
    </div>
  );
}
