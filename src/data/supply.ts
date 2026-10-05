export const supplyCategories = [
  {
    id: "food",
    title: "Food & Provisions",
    items: ["Fresh Meat", "Frozen Meat", "Dairy", "Fresh Vegetables", "Fresh Fruits", "Seafood", "Bakery", "Canned Foods", "Pulses & Spices", "Dry Stores"],
  },
  {
    id: "cabin",
    title: "Vessel & Cabin",
    items: ["Bonded Stores", "Cabin Stores", "Cleaning Materials", "Tableware & Galley", "Cloth & Linen"],
  },
  {
    id: "technical",
    title: "Technical Marine Stores",
    items: ["Deck Equipment", "Safety Equipment", "Marine Parts", "Tools", "Pipes & Tubes", "Pipe Fittings", "Electrical Equipment", "Bearings", "Valves", "Ropes & Chains", "Welding Equipment", "Hydraulic Equipment", "Measuring Tools", "Lifting Equipment", "Rigging", "Ship Equipment & Spares"],
  },
] as const;

export const allProducts = supplyCategories.flatMap((c) =>
  c.items.map((name) => ({ name, category: c.title, categoryId: c.id })),
);

export const requirementOptions = [
  "Provisions", "Bonded Stores", "Technical Stores", "Marine Equipment", "Spare Parts",
  "Safety Equipment", "Inspection / Maintenance", "Customs / Logistics", "Other",
];

export const processSteps = [
  { n: "01", title: "Request", text: "Send your vessel details and requirements." },
  { n: "02", title: "Quote", text: "We confirm availability and prepare a quotation." },
  { n: "03", title: "Source", text: "Items are sourced to specification." },
  { n: "04", title: "Prepare", text: "Orders are checked, packed and documented." },
  { n: "05", title: "Deliver", text: "Supplies are delivered to the vessel in port." },
];

export const whyAngelic = [
  { title: "Service Excellence", text: "A professional, responsive approach to every vessel request." },
  { title: "Timely & Accurate Delivery", text: "Orders prepared carefully and delivered for the port call." },
  { title: "Quality Products", text: "Provisions and stores sourced with quality in mind." },
  { title: "Health & Safety", text: "Safe handling of food, stores and equipment." },
  { title: "Customer-Focused Service", text: "Clear communication with masters, agents and owners." },
  { title: "24/7 Support", text: "Available around the clock for vessels calling Mombasa." },
];
