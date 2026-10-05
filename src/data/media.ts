// Central image registry — swap files here without touching components.
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import provisions from "@/assets/svc-provisions.jpg";
import technical from "@/assets/svc-technical.jpg";
import equipment from "@/assets/svc-equipment.jpg";
import logistics from "@/assets/svc-logistics.jpg";
import inspection from "@/assets/svc-inspection.jpg";

export const media = {
  hero: [hero1, hero2, hero3],
  about: hero2,
  port: hero1,
  supply: hero3,
  services: { provisions, technical, equipment, logistics, inspection },
};

export const heroSlides = [
  { src: hero1, alt: "Container vessel arriving at the Port of Mombasa at sunset", caption: "Container vessel — Port of Mombasa" },
  { src: hero2, alt: "Bulk carrier moored alongside a berth", caption: "Bulk carrier alongside" },
  { src: hero3, alt: "Provisions being craned aboard a vessel at the quay", caption: "Vessel supply operation" },
];
