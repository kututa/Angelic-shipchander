import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, FinalCTA } from "@/components/home/Sections";
import { services } from "@/data/services";
import { btn } from "@/components/shared/Btn";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    if (!s) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const t = `${s.title} in Mombasa — Angelic Shipchandlers`;
    return { meta: [{ title: t }, { name: "description", content: s.short }, { property: "og:title", content: t }, { property: "og:description", content: s.short }] };
  },
  component: Detail,
});

function Detail() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  return (<>
    <PageHero eyebrow={`Service ${s.number}`} title={s.title} intro={s.short} image={s.image} />
    <section className="py-24"><div className="container-site grid gap-12 md:grid-cols-2">
      <div><p className="text-xl leading-relaxed">{s.body}</p>
        <Link to="/request-vessel-quote" className={`${btn()} mt-10`}>Request a Vessel Quote</Link></div>
      <ul className="border-t">{s.points.map((p) => <li key={p} className="border-b py-4 font-display uppercase tracking-wide">{p}</li>)}</ul>
    </div></section>
    <FinalCTA />
  </>);
}
