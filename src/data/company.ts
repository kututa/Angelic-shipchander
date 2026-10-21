// Contact data. Email and website are left empty on purpose: the source
// materials contain inconsistent spellings — fill in after client confirmation.
export const company = {
  name: "Angelic Shipchandlers Enterprises Limited",
  shortName: "Angelic Shipchandlers",
  location: "Mombasa, Kenya",
  poBox: "P.O. Box 122-80100 Msa",
  street: "Jundan Building, Gusii Street",
  city: "Mombasa, Kenya",
  phone: "+254 722 161 095",
  phoneHref: "tel:+254722161095",
  whatsapp: "254722161095",
  email: "", // TODO: confirm with client
  website: "", // TODO: confirm with client
};

export const nav = [
  { label: "Services", to: "/services" },
  { label: "Supply Range", to: "/supply-range" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function whatsappLink(
  message = "Hello Angelic Shipchandlers, I would like to request vessel supply.",
) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
