import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/home/Sections";
import { VesselRequest } from "@/components/rfq/VesselRequest";
import { media } from "@/data/media";

export const Route = createFileRoute("/request-vessel-quote")({
  head: () => ({
    meta: [
      { title: "Request a Vessel Quote — Angelic Shipchandlers" },
      {
        name: "description",
        content: "Send vessel details, ETA and supply requirements for a quotation in Mombasa.",
      },
      { property: "og:title", content: "Request a Vessel Quote — Angelic Shipchandlers" },
      { property: "og:description", content: "Multi-step vessel supply request." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Vessel request" title="Request a vessel quote." image={media.supply} />
      <section className="py-20">
        <div className="container-site max-w-4xl">
          <VesselRequest />
        </div>
      </section>
    </>
  ),
});
