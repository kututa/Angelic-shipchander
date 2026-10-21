import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCTA } from "@/components/home/Sections";
import { SupplyCatalogue } from "@/components/supply/SupplyCatalogue";
import { media } from "@/data/media";

export const Route = createFileRoute("/supply-range")({
  head: () => ({
    meta: [
      { title: "Marine Supply Range — Angelic Shipchandlers Mombasa" },
      {
        name: "description",
        content:
          "Search provisions, cabin stores and technical marine stores supplied to vessels in Mombasa.",
      },
      { property: "og:title", content: "Marine Supply Range — Angelic Shipchandlers" },
      {
        property: "og:description",
        content: "Provisions, bonded, cabin and technical marine stores.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Supply range" title="What does your vessel need?" image={media.supply} />
      <section className="py-20">
        <div className="container-site">
          <SupplyCatalogue />
        </div>
      </section>
      <FinalCTA />
    </>
  ),
});
