import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServiceRows, FinalCTA } from "@/components/home/Sections";
import { media } from "@/data/media";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [
    { title: "Ship Chandling Services in Mombasa — Angelic Shipchandlers" },
    { name: "description", content: "Provisions, bonded stores, technical marine stores, spare parts, customs logistics and maintenance support in Mombasa." },
    { property: "og:title", content: "Ship Chandling Services — Angelic Shipchandlers" },
    { property: "og:description", content: "Vessel supply and support services at the Port of Mombasa." },
  ] }),
  component: () => (<><PageHero eyebrow="Services" title="Vessel supply & support." image={media.services.equipment} /><ServiceRows withHeading={false} /><FinalCTA /></>),
});
