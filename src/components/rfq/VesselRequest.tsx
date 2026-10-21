import { useState } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { requirementOptions } from "@/data/supply";
import { whatsappLink } from "@/data/company";
import { btn } from "@/components/shared/Btn";

type Form = {
  vesselName: string;
  imo: string;
  vesselType: string;
  port: string;
  eta: string;
  crew: string;
  stay: string;
  requirements: string[];
  notes: string;
  name: string;
  company: string;
  phone: string;
  email: string;
};

const initial: Form = {
  vesselName: "",
  imo: "",
  vesselType: "",
  port: "Mombasa",
  eta: "",
  crew: "",
  stay: "",
  requirements: [],
  notes: "",
  name: "",
  company: "",
  phone: "",
  email: "",
};

const steps = ["Vessel", "Port Call", "Requirements", "Contact", "Review"];

const schemas = [
  z.object({
    vesselName: z.string().trim().min(2, "Enter the vessel name").max(100),
    imo: z
      .string()
      .trim()
      .regex(/^(\d{7})?$/, "IMO number is 7 digits"),
    vesselType: z.string().min(1, "Select a vessel type"),
  }),
  z.object({
    port: z.string().trim().min(2, "Enter the port").max(80),
    eta: z.string().min(1, "Enter the ETA"),
    crew: z.string().regex(/^\d{0,4}$/, "Numbers only"),
    stay: z.string().max(60),
  }),
  z.object({
    requirements: z.array(z.string()).min(1, "Select at least one requirement"),
    notes: z.string().max(1500),
  }),
  z.object({
    name: z.string().trim().min(2, "Enter your name").max(100),
    company: z.string().trim().max(120),
    phone: z.string().trim().min(7, "Enter a phone number").max(30),
    email: z.string().trim().email("Enter a valid email").max(255),
  }),
];

const label = "eyebrow mb-2 block text-muted-foreground";
const input =
  "h-12 w-full border border-input bg-card px-4 text-base outline-none transition-colors focus:border-ocean";

export function VesselRequest() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const next = () => {
    if (step < 4) {
      const r = schemas[step]!.safeParse(f);
      if (!r.success) {
        const e: Record<string, string> = {};
        r.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
        setErrors(e);
        return;
      }
    }
    setErrors({});
    setStep((s) => Math.min(4, s + 1));
  };

  const summary = () =>
    `Vessel request\nVessel: ${f.vesselName} (IMO ${f.imo || "-"}) — ${f.vesselType}\nPort: ${f.port}, ETA ${f.eta}, crew ${f.crew || "-"}, stay ${f.stay || "-"}\nRequirements: ${f.requirements.join(", ")}\nNotes: ${f.notes || "-"}\nContact: ${f.name}, ${f.company || "-"}, ${f.phone}, ${f.email}`;

  if (sent) {
    return (
      <div className="border border-foreground/15 bg-card p-10 text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center bg-signal text-signal-foreground">
          <Check />
        </span>
        <h2 className="mt-6 text-3xl uppercase">Request prepared</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thank you, {f.name}. Online submission will be connected once the company email is
          confirmed — please send this request via WhatsApp now so we receive it.
        </p>
        <a
          href={whatsappLink(summary())}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn({ size: "lg" })} mt-8`}
        >
          Send via WhatsApp
        </a>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p className="mt-1 text-sm text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="border border-foreground/15 bg-card">
      <ol className="grid grid-cols-5 border-b" aria-label="Progress">
        {steps.map((s, i) => (
          <li
            key={s}
            aria-current={i === step ? "step" : undefined}
            className="relative px-2 py-4 text-center md:px-4 md:text-left"
          >
            <span
              className={`font-display text-xs ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
            >
              0{i + 1}
            </span>
            <span
              className={`ml-2 hidden font-display text-xs uppercase tracking-[0.14em] md:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}
            >
              {s}
            </span>
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 transition-colors ${i <= step ? "bg-signal" : "bg-transparent"}`}
            />
          </li>
        ))}
      </ol>

      <form
        className="p-6 md:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 4) next();
          else setSent(true);
        }}
        noValidate
      >
        <h2 className="text-2xl uppercase md:text-3xl">{steps[step]}</h2>

        <div
          key={step}
          className="mt-8 grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300 md:grid-cols-2"
        >
          {step === 0 && (
            <>
              <div className="md:col-span-2">
                <label className={label} htmlFor="vn">
                  Vessel name *
                </label>
                <input
                  id="vn"
                  className={input}
                  value={f.vesselName}
                  onChange={(e) => set("vesselName", e.target.value)}
                />
                <Err k="vesselName" />
              </div>
              <div>
                <label className={label} htmlFor="imo">
                  IMO number
                </label>
                <input
                  id="imo"
                  inputMode="numeric"
                  className={input}
                  value={f.imo}
                  onChange={(e) => set("imo", e.target.value)}
                />
                <Err k="imo" />
              </div>
              <div>
                <label className={label} htmlFor="vt">
                  Vessel type *
                </label>
                <select
                  id="vt"
                  className={input}
                  value={f.vesselType}
                  onChange={(e) => set("vesselType", e.target.value)}
                >
                  <option value="">Select…</option>
                  {[
                    "Container",
                    "Bulk Carrier",
                    "Tanker",
                    "General Cargo",
                    "Ro-Ro",
                    "Passenger",
                    "Offshore / Support",
                    "Other",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <Err k="vesselType" />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div>
                <label className={label} htmlFor="port">
                  Port *
                </label>
                <input
                  id="port"
                  className={input}
                  value={f.port}
                  onChange={(e) => set("port", e.target.value)}
                />
                <Err k="port" />
              </div>
              <div>
                <label className={label} htmlFor="eta">
                  ETA *
                </label>
                <input
                  id="eta"
                  type="datetime-local"
                  className={input}
                  value={f.eta}
                  onChange={(e) => set("eta", e.target.value)}
                />
                <Err k="eta" />
              </div>
              <div>
                <label className={label} htmlFor="crew">
                  Crew size
                </label>
                <input
                  id="crew"
                  inputMode="numeric"
                  className={input}
                  value={f.crew}
                  onChange={(e) => set("crew", e.target.value)}
                />
                <Err k="crew" />
              </div>
              <div>
                <label className={label} htmlFor="stay">
                  Port stay
                </label>
                <input
                  id="stay"
                  placeholder="e.g. 2 days"
                  className={input}
                  value={f.stay}
                  onChange={(e) => set("stay", e.target.value)}
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <fieldset className="md:col-span-2">
                <legend className={label}>Select requirements *</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {requirementOptions.map((o) => {
                    const on = f.requirements.includes(o);
                    return (
                      <label
                        key={o}
                        className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${on ? "border-marine bg-seafoam" : "border-input hover:border-foreground/50"}`}
                      >
                        <input
                          type="checkbox"
                          className="accent-[var(--signal)] h-4 w-4"
                          checked={on}
                          onChange={() =>
                            set(
                              "requirements",
                              on ? f.requirements.filter((x) => x !== o) : [...f.requirements, o],
                            )
                          }
                        />
                        {o}
                      </label>
                    );
                  })}
                </div>
                <Err k="requirements" />
              </fieldset>
              <div className="md:col-span-2">
                <label className={label} htmlFor="notes">
                  Additional notes
                </label>
                <textarea
                  id="notes"
                  rows={5}
                  className={`${input} h-auto py-3`}
                  value={f.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label className={label} htmlFor="nm">
                  Name *
                </label>
                <input
                  id="nm"
                  autoComplete="name"
                  className={input}
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                />
                <Err k="name" />
              </div>
              <div>
                <label className={label} htmlFor="co">
                  Company
                </label>
                <input
                  id="co"
                  autoComplete="organization"
                  className={input}
                  value={f.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </div>
              <div>
                <label className={label} htmlFor="ph">
                  Phone *
                </label>
                <input
                  id="ph"
                  type="tel"
                  autoComplete="tel"
                  className={input}
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
                <Err k="phone" />
              </div>
              <div>
                <label className={label} htmlFor="em">
                  Email *
                </label>
                <input
                  id="em"
                  type="email"
                  autoComplete="email"
                  className={input}
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                <Err k="email" />
              </div>
            </>
          )}
          {step === 4 && (
            <dl className="divide-y border-y md:col-span-2">
              {[
                ["Vessel", `${f.vesselName} · ${f.vesselType}${f.imo ? ` · IMO ${f.imo}` : ""}`],
                [
                  "Port call",
                  `${f.port} · ETA ${f.eta.replace("T", " ")}${f.crew ? ` · ${f.crew} crew` : ""}${f.stay ? ` · ${f.stay}` : ""}`,
                ],
                ["Requirements", f.requirements.join(", ")],
                ["Notes", f.notes || "—"],
                [
                  "Contact",
                  `${f.name}${f.company ? `, ${f.company}` : ""} · ${f.phone} · ${f.email}`,
                ],
              ].map(([k, v], i) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-4">
                  <dt className="eyebrow text-muted-foreground">{k}</dt>
                  <dd className="sm:col-span-2">{v}</dd>
                  <dd className="sm:text-right">
                    <button
                      type="button"
                      onClick={() => setStep(Math.min(i, 3))}
                      className="font-display text-xs uppercase tracking-[0.14em] text-ocean hover:text-signal"
                    >
                      Edit
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className={btn({ variant: "outline" })}
          >
            ← Back
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            {step === 4 && (
              <a
                href={whatsappLink(summary())}
                target="_blank"
                rel="noopener noreferrer"
                className={btn({ variant: "outline" })}
              >
                Send via WhatsApp
              </a>
            )}
            <button type="submit" className={btn()}>
              {step === 4 ? "Send Vessel Request" : "Next →"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
