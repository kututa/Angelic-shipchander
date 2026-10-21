import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { processSteps, whyAngelic } from "@/data/supply";
import { media } from "@/data/media";
import { company, whatsappLink } from "@/data/company";
import { Reveal, SectionHeading, useInView } from "@/components/shared/Reveal";
import { btn } from "@/components/shared/Btn";
 

export function CapabilityStrip() {
  const items = ["24/7 Service", "Mombasa Port", "Provisions", "Technical Stores", "Vessel Support"];
  return (
    <section aria-label="Capabilities" className="bg-marine text-marine-foreground">
      <ul className="container-site grid grid-cols-2 md:grid-cols-5">
        {items.map((t, i) => (
          <li key={t} className="flex items-center gap-3 border-b border-l border-line-dark px-4 py-6 font-display text-xs uppercase tracking-[0.2em] md:border-b-0">
            <span className="text-signal">0{i + 1}</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutIntro() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-7">
          <SectionHeading eyebrow="Who we are" title={<>Supplying vessels.<br />Supporting crews.</>} />
          <div className="relative mt-12 aspect-[16/10] overflow-hidden">
            <img src={media.about} alt="Bulk carrier alongside at berth" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-end md:col-span-5">
          <p className="text-xl leading-relaxed text-foreground">
            {company.name} is a ship chandler based in Mombasa, Kenya, supplying vessels calling the Port of Mombasa.
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            We supply provisions, bonded and cabin stores, technical marine stores and equipment, and support vessels with logistics, inspection and maintenance requirements — working with masters, agents and owners around the clock.
          </p>
          <Link to="/about" className={`${btn({ variant: "outline" })} mt-10 self-start`}>
            Company profile
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceRows({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="border-t bg-background py-24 md:py-32">
      <div className="container-site">
        {withHeading && (
          <Reveal className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Core services" title={<>What we do<br />for your vessel.</>} />
            <Link to="/services" className={btn({ variant: "link" })}>All services →</Link>
          </Reveal>
        )}
        <ul className="border-t border-foreground/15">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid grid-cols-1 items-center gap-6 border-b border-foreground/15 py-8 transition-colors duration-500 hover:bg-seafoam md:grid-cols-12 md:px-4"
              >
                <span className="font-display text-sm text-ocean md:col-span-1">{s.number}</span>
                <h3 className="text-2xl font-medium uppercase leading-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-3xl">{s.title}</h3>
                <p className="text-muted-foreground md:col-span-3">{s.short}</p>
                <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:aspect-[4/3]">
                  <img src={s.image} alt={s.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <span className="grid h-11 w-11 place-items-center border border-foreground/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TechnicalStores() {
  return (
    <section className="bg-sand">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[360px]">
          <img src={media.services.technical} alt="Technical marine stores — ropes, shackles and valves" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <Reveal className="px-6 py-20 md:px-16 md:py-28">
          <SectionHeading
            eyebrow="Marine & technical stores"
            title={<>Deck. Engine.<br />Cabin.</>}
            intro="Ropes and rigging, valves and fittings, safety equipment, tools and ship spares — technical stores sourced to specification for the vessel's stay."
          />
          <Link to="/supply-range" className={`${btn({ variant: "marine" })} mt-10`}>Browse supply range</Link>
        </Reveal>
      </div>
    </section>
  );
}

export function PortOperations() {
  return (
    <section className="relative overflow-hidden bg-marine text-marine-foreground">
      <img src={media.port} alt="Container vessel at the Port of Mombasa" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-overlay-hero" />
      <div className="container-site relative grid gap-12 py-28 md:grid-cols-12 md:py-40">
        <Reveal className="md:col-span-7">
          <SectionHeading tone="dark" eyebrow="Operating context" title={<>Ready for the<br />Port of Mombasa.</>} />
        </Reveal>
        <Reveal delay={150} className="grid gap-px self-end bg-line-dark md:col-span-5">
          {[
            ["Mombasa", "Based in the city, close to the port."],
            ["Vessel supply", "Provisions, stores and equipment to order."],
            ["Port calls", "Coordinated around ETA and port stay."],
            ["24/7", "Available around the clock."],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 bg-marine/80 px-6 py-5">
              <span className="font-display text-sm uppercase tracking-[0.18em] text-signal">{k}</span>
              <span className="text-right text-sm text-marine-foreground/80">{v}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function SupplyProcess() {
  const { ref, inView } = useInView<HTMLOListElement>(0.3);
  return (
    <section className="py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="How vessel supply works" title="From request to delivery." />
        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute left-0 top-[11px] hidden h-px w-full bg-border md:block" />
          <span aria-hidden className={`absolute left-0 top-[11px] hidden h-px w-full origin-left bg-signal transition-transform duration-[1800ms] ease-out md:block ${inView ? "scale-x-100" : "scale-x-0"}`} />
          {processSteps.map((s, i) => (
            <li key={s.n} className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 220}ms` }}>
              <span className="relative z-10 block h-[23px] w-[23px] border-2 border-signal bg-background" />
              <p className="mt-6 font-display text-sm text-ocean">{s.n}</p>
              <h3 className="mt-1 text-2xl font-medium uppercase">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyAngelic() {
  return (
    <section className="bg-seafoam py-24 md:py-32">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <SectionHeading eyebrow="Why Angelic" title={<>Built around<br />the vessel.</>} />
        </Reveal>
        <div className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
          {whyAngelic.map((w, i) => (
            <Reveal key={w.title} delay={i * 60} className="border-t border-foreground/15 py-7">
              <h3 className="text-lg font-medium uppercase tracking-wide">{w.title}</h3>
              <p className="mt-2 text-muted-foreground">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionHeading eyebrow="Vessel request" title={<>Calling Mombasa?<br />Tell us what you need.</>} intro="Send vessel details, ETA and requirements. We'll come back with availability and a quotation." />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/request-vessel-quote" className={btn({ size: "lg" })}>Request a Vessel Quote →</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btn({ variant: "outline", size: "lg" })}>Send via WhatsApp</a>
          </div>
        </div>
        <ContactBlock className="md:col-span-5" />
      </div>
    </section>
  );
}

export function ContactBlock({ className = "" }: { className?: string }) {
  return (
    <address className={`not-italic border border-foreground/15 bg-card p-8 ${className}`}>
      <p className="eyebrow text-ocean">Contact</p>
      <p className="mt-4 font-display text-xl uppercase leading-snug">{company.name}</p>
      <p className="mt-4 text-muted-foreground">{company.poBox}<br />{company.street}<br />{company.city}</p>
      <dl className="mt-6 divide-y border-t">
        <div className="flex justify-between py-3"><dt className="eyebrow text-muted-foreground">Phone</dt><dd><a className="hover:text-signal" href={company.phoneHref}>{company.phone}</a></dd></div>
        <div className="flex justify-between py-3"><dt className="eyebrow text-muted-foreground">WhatsApp</dt><dd><a className="hover:text-signal" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{company.phone}</a></dd></div>
        <div className="flex justify-between py-3"><dt className="eyebrow text-muted-foreground">Email</dt><dd>{company.email ? <a className="hover:text-signal" href={`mailto:${company.email}`}>{company.email}</a> : <span className="text-muted-foreground">To be confirmed</span>}</dd></div>
      </dl>
    </address>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: React.ReactNode; intro?: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-marine pb-20 pt-40 text-marine-foreground md:pb-28 md:pt-48">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-overlay-hero" />
      <div className="container-site relative">
        <p className="eyebrow text-marine-foreground/80"><span className="mr-3 inline-block h-px w-10 bg-signal align-middle" />{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium uppercase leading-[0.98] md:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-xl text-lg text-marine-foreground/80">{intro}</p>}
      </div>
    </section>
  );
}
