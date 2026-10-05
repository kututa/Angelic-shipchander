import { Link } from "@tanstack/react-router";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { btn } from "@/components/shared/Btn";

export function Footer() {
  return (
    <footer className="bg-marine text-marine-foreground">
      <div className="container-site grid gap-12 border-b border-line-dark py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-2xl uppercase leading-tight tracking-wide">
            Ship chandlers
            <br />
            <span className="text-signal">Port of Mombasa.</span>
          </p>
          <Link to="/request-vessel-quote" className={`${btn()} mt-8`}>
            Request a Vessel Quote
          </Link>
        </div>
        <FooterCol title="Company">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/supply-range">Supply Range</Link>
          <Link to="/contact">Contact</Link>
        </FooterCol>
        <FooterCol title="Services" wide>
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
              {s.title}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Contact">
          <span>{company.street}</span>
          <span>{company.city}</span>
          <a href={company.phoneHref}>{company.phone}</a>
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
        </FooterCol>
      </div>
      <div className="container-site flex flex-col gap-2 py-6 text-xs text-marine-foreground/50 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <span>{company.poBox}</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-3" : "md:col-span-2"}>
      <p className="eyebrow text-marine-foreground/50">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-sm text-marine-foreground/80 [&_a:hover]:text-signal">{children}</div>
    </div>
  );
}
