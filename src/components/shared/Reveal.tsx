import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <p className={`eyebrow ${tone === "dark" ? "text-signal" : "text-ocean"}`}>
        <span className="mr-3 inline-block h-px w-8 bg-signal align-middle" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-medium uppercase leading-[1.02] md:text-6xl">{title}</h2>
      {intro && (
        <p
          className={`mt-6 max-w-xl text-lg leading-relaxed ${tone === "dark" ? "text-marine-foreground/75" : "text-muted-foreground"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
