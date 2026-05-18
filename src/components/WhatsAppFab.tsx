import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gold-gradient text-background flex items-center justify-center shadow-glow hover:scale-110 transition animate-glow-pulse"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
    </a>
  );
}
