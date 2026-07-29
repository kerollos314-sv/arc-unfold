import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-4 backdrop-blur-xl md:px-10">
      <Link to="/" className="font-display text-lg tracking-[0.16em] text-foreground">
        ATLAS
      </Link>
      <span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground md:block">
        CHRONOS · REF. 001 · TITANIUM
      </span>
      <Link
        to="/buy"
        className="border border-primary/60 px-4 py-2 font-mono text-[10px] tracking-[0.24em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Buy now
      </Link>
    </header>
  );
}