import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/company";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Angelic Shipchandlers on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-signal px-4 font-display text-xs font-medium uppercase tracking-[0.14em] text-signal-foreground shadow-soft transition-transform hover:-translate-y-0.5 animate-soft-pulse sm:px-5"
    >
      <MessageCircle size={18} aria-hidden />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
