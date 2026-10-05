import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/media";
import { btn } from "@/components/shared/Btn";

const DURATION = 6000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const go = useCallback((i: number) => {
    setActive((i + heroSlides.length) % heroSlides.length);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => go(active + 1), DURATION);
    return () => clearTimeout(t);
  }, [active, cycle, go]);

  return (
    <section aria-roledescription="carousel" aria-label="Angelic Shipchandlers" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-marine text-marine-foreground">
      {heroSlides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <img
            key={i === active ? `a-${cycle}` : "idle"}
            src={s.src}
            alt={s.alt}
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={`h-full w-full object-cover object-[60%_center] ${i === active ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-overlay-hero" />
      <div className="absolute inset-0 bg-overlay-bottom" />

      <div className="container-site relative flex h-full flex-col justify-end pb-28 pt-28 md:justify-center md:pb-0">
        <p className="eyebrow text-marine-foreground/80">
          <span className="mr-3 inline-block h-px w-10 bg-signal align-middle" />
          Angelic Shipchandlers · Mombasa
        </p>
        <h1 className="mt-6 max-w-4xl text-[2.6rem] font-medium uppercase leading-[0.95] sm:text-6xl lg:text-[5.5rem]">
          Marine supply
          <br />
          for vessels
          <br />
          calling <span className="text-signal">Mombasa.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-marine-foreground/80 md:text-lg">
          Provisions, technical stores, marine equipment and vessel support services for ships calling the Port of Mombasa.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/request-vessel-quote" className={btn({ size: "lg" })}>
            Request a Vessel Quote <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link to="/services" className={btn({ variant: "outlineLight", size: "lg" })}>
            Explore Services
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-line-dark">
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-1" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.caption}`}
                onClick={() => go(i)}
                className="group flex w-14 flex-col gap-2 py-2 text-left sm:w-24"
              >
                <span className={`font-display text-xs ${i === active ? "text-marine-foreground" : "text-marine-foreground/45"}`}>0{i + 1}</span>
                <span className="relative h-0.5 w-full overflow-hidden bg-marine-foreground/20">
                  {i === active && <span key={cycle} className="absolute inset-0 bg-signal animate-progress" />}
                </span>
              </button>
            ))}
          </div>
          <p className="hidden font-display text-xs uppercase tracking-[0.2em] text-marine-foreground/60 md:block">{heroSlides[active]?.caption}</p>
          <div className="flex gap-2">
            <button aria-label="Previous slide" onClick={() => go(active - 1)} className="grid h-10 w-10 place-items-center border border-line-dark hover:border-signal hover:text-signal">
              <ChevronLeft size={18} />
            </button>
            <button aria-label="Next slide" onClick={() => go(active + 1)} className="grid h-10 w-10 place-items-center border border-line-dark hover:border-signal hover:text-signal">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
