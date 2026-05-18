import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gold-gradient opacity-30" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-4 gap-12">
        <div>
          <div className="font-serif text-2xl tracking-[0.25em]">SÃO <span className="text-gold-gradient">GERÔNIMO</span></div>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Há quinze anos, selecionando artigos místicos, religiosos e decoração espiritual com olhar editorial.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full hairline flex items-center justify-center hover:text-gold transition">
                <I className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Navegar", links: [["Loja","/loja"],["Categorias","/categorias"],["Sobre","/sobre"],["Diário","/blog"],["Contato","/contato"]] },
          { title: "Conta", links: [["Minha Conta","/conta"],["Favoritos","/favoritos"],["Carrinho","/carrinho"],["Checkout","/checkout"]] },
          { title: "Atendimento", links: [["WhatsApp","/contato"],["Trocas e devoluções","/contato"],["Política de privacidade","/contato"],["Termos","/contato"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">{col.title}</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {col.links.map(([l, to]) => (
                <li key={l}><Link to={to as string} className="hover:text-foreground transition">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} São Gerônimo — Energia em cada detalhe.</span>
          <span>Português · English · Español</span>
        </div>
      </div>
    </footer>
  );
}
