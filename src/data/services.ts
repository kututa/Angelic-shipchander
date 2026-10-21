import { media } from "./media";

export const services = [
  {
    slug: "provisions-bonded-stores",
    number: "01",
    title: "Provisions & Bonded Stores",
    short: "Fresh, frozen and dry provisions for vessel crews and operations.",
    body: "We source and deliver fresh, frozen and dry provisions alongside bonded stores, prepared to each vessel's order and delivered for the port call.",
    points: [
      "Fresh & frozen meat, seafood and dairy",
      "Fruit, vegetables and bakery",
      "Dry stores, canned goods, pulses & spices",
      "Bonded stores",
    ],
    image: media.services.provisions,
  },
  {
    slug: "technical-marine-stores",
    number: "02",
    title: "Technical Marine Stores",
    short: "Marine equipment, technical consumables and related stores.",
    body: "Deck, engine and cabin stores — from ropes and rigging to valves, fittings, tools and cleaning materials.",
    points: [
      "Deck & safety equipment",
      "Ropes, chains & rigging",
      "Pipes, fittings & valves",
      "Tools & measuring equipment",
    ],
    image: media.services.technical,
  },
  {
    slug: "marine-equipment-spare-parts",
    number: "03",
    title: "Marine Equipment & Spare Parts",
    short: "Marine equipment and ship spare handling.",
    body: "Sourcing of marine equipment and handling of ship spares, coordinated for delivery during the vessel's stay in Mombasa.",
    points: [
      "Ship equipment & spares",
      "Electrical & hydraulic equipment",
      "Bearings & marine parts",
      "Spare handling",
    ],
    image: media.services.equipment,
  },
  {
    slug: "customs-logistics",
    number: "04",
    title: "Customs & Logistics",
    short: "Handling, consolidation, transportation and customs-related marine logistics.",
    body: "We help move goods to the vessel — handling, consolidation, transport and customs-related logistics for marine supplies.",
    points: [
      "Handling & consolidation",
      "Transport to vessel",
      "Customs-related logistics",
      "Coordination with agents",
    ],
    image: media.services.logistics,
  },
  {
    slug: "inspection-maintenance-repairs",
    number: "05",
    title: "Inspection, Maintenance & Repairs",
    short: "Support for inspection, servicing and maintenance requirements.",
    body: "Support for vessel inspection, servicing and maintenance requirements during port calls.",
    points: ["Inspection support", "Servicing", "Maintenance", "Repairs coordination"],
    image: media.services.inspection,
  },
] as const;

export type Service = (typeof services)[number];
