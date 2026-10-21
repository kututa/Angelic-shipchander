import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/company";
import { btn } from "@/components/shared/Btn";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overlay ? "bg-transparent" : "border-b border-line-dark bg-marine shadow-soft"
      }`}
    >
      <div
        className={`container-site flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}
      >
        <Link
          to="/"
          className="flex items-center gap-3 text-marine-foreground"
          aria-label="Angelic Shipchandlers — home"
        >
          <span className="grid h-9 w-9 place-items-center border border-signal font-display text-sm font-semibold text-signal">
            A
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-semibold uppercase tracking-[0.2em]">
              Angelic
            </span>
            <span className="block font-display text-[10px] uppercase tracking-[0.3em] text-marine-foreground/60">
              Shipchandlers
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative font-display text-xs font-medium uppercase tracking-[0.18em] text-marine-foreground/80 transition-colors hover:text-marine-foreground"
              activeProps={{
                className:
                  "!text-marine-foreground after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-signal",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/request-vessel-quote"
            className={`${btn({ size: "sm" })} hidden sm:inline-flex`}
          >
            Request a Quote
          </Link>
          <button
            className="grid h-10 w-10 place-items-center text-marine-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-16 bg-marine transition-all duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex flex-col pt-6">
          {[{ label: "Home", to: "/" as const }, ...nav].map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center justify-between border-b border-line-dark py-5 font-display text-2xl uppercase tracking-wide text-marine-foreground transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
              activeOptions={{ exact: true }}
              activeProps={{ className: "!text-signal" }}
            >
              {n.label}
              <span className="font-display text-xs text-marine-foreground/40">0{i + 1}</span>
            </Link>
          ))}
          <Link to="/request-vessel-quote" className={`${btn({ size: "lg" })} mt-8`}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
