import { createFileRoute } from "@tanstack/react-router";
import { PageHero, AboutIntro, WhyAngelic, FinalCTA } from "@/components/home/Sections";
import { media } from "@/data/media";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Angelic Shipchandlers — Mombasa, Kenya" },
    { name: "description", content: "Ship chandler based in Mombasa supplying vessels calling the Port of Mombasa." },
    { property: "og:title", content: "About Angelic Shipchandlers" },
    { property: "og:description", content: "Supplying vessels. Supporting crews." },
  ] }),
  component: () => (<><PageHero eyebrow="About" title="Supplying vessels. Supporting crews." image={media.about} /><AboutIntro /><WhyAngelic /><FinalCTA /></>),
});
