import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { CapabilityStrip, AboutIntro, ServiceRows, TechnicalStores, PortOperations, SupplyProcess, WhyAngelic, FinalCTA } from "@/components/home/Sections";
import { SectionHeading } from "@/components/shared/Reveal";
import { SupplyCatalogue } from "@/components/supply/SupplyCatalogue";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Angelic Shipchandlers — Ship Chandlers in Mombasa, Kenya" },
    { name: "description", content: "Provisions, technical marine stores, marine equipment and vessel support for ships calling the Port of Mombasa." },
    { property: "og:title", content: "Angelic Shipchandlers — Ship Chandlers in Mombasa" },
    { property: "og:description", content: "Marine supply for vessels calling Mombasa. 24/7 service." },
  ] }),
  component: Home,
});

function Home() {
  return (<>
    <Hero /><CapabilityStrip /><AboutIntro /><ServiceRows />
    <section className="border-t py-24 md:py-32"><div className="container-site">
      <SectionHeading eyebrow="Supply range" title="What does your vessel need?" />
      <div className="mt-12"><SupplyCatalogue compact /></div>
    </div></section>
    <TechnicalStores /><PortOperations /><SupplyProcess /><WhyAngelic /><FinalCTA />
  </>);
}
