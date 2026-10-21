import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCTA } from "@/components/home/Sections";
import { media } from "@/data/media";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Angelic Shipchandlers — Mombasa" },
      {
        name: "description",
        content: "Call or WhatsApp +254 722 161 095. Jundan Building, Gusii Street, Mombasa.",
      },
      { property: "og:title", content: "Contact Angelic Shipchandlers" },
      { property: "og:description", content: "Reach our Mombasa team 24/7." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Talk to our Mombasa team." image={media.port} />
      <FinalCTA />
    </>
  ),
});
