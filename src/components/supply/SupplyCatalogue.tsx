import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { allProducts, supplyCategories } from "@/data/supply";

export function SupplyCatalogue({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(supplyCategories[0].id);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return allProducts.filter(
      (p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s),
    );
  }, [q]);

  const cats = supplyCategories.filter((c) => filter === "all" || c.id === filter);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-foreground/15 pb-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter categories" className="flex flex-wrap gap-2">
          {[{ id: "all", title: "All" }, ...supplyCategories].map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`h-10 border px-4 font-display text-xs uppercase tracking-[0.14em] transition-colors ${
                filter === c.id
                  ? "border-marine bg-marine text-marine-foreground"
                  : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <span className="sr-only">Search supplies</span>
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search supplies..."
            className="h-12 w-full border border-input bg-card pl-11 pr-4 text-sm outline-none focus:border-ocean"
          />
        </label>
      </div>

      {q.trim() ? (
        <div className="mt-6" aria-live="polite">
          <div className="grid grid-cols-12 border-b py-3 eyebrow text-muted-foreground">
            <span className="col-span-6">Product</span>
            <span className="col-span-4">Category</span>
            <span className="col-span-2 text-right">Request</span>
          </div>
          {results.length === 0 && (
            <p className="py-8 text-muted-foreground">
              No matches. Tell us what you need in a vessel request — we source beyond this list.
            </p>
          )}
          {results.map((p) => (
            <div key={p.name} className="grid grid-cols-12 items-center border-b py-4">
              <span className="col-span-6 font-display uppercase">{p.name}</span>
              <span className="col-span-4 text-sm text-muted-foreground">{p.category}</span>
              <Link
                to="/request-vessel-quote"
                className="col-span-2 text-right font-display text-xs uppercase tracking-[0.14em] text-ocean hover:text-signal"
              >
                Request →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          {cats.map((c, idx) => {
            const isOpen = openId === c.id || filter !== "all";
            const items = compact && !isOpen ? [] : c.items;
            return (
              <div key={c.id} className="border-b border-foreground/15">
                <button
                  className="flex w-full items-center justify-between py-7 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen && filter === "all" ? null : c.id)}
                >
                  <span className="flex items-baseline gap-6">
                    <span className="font-display text-sm text-ocean">0{idx + 1}</span>
                    <span className="font-display text-2xl uppercase md:text-4xl">{c.title}</span>
                    <span className="hidden text-sm text-muted-foreground sm:inline">
                      {c.items.length} groups
                    </span>
                  </span>
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div
                  className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}
                >
                  <ul className="grid grid-cols-2 gap-x-6 overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((it) => (
                      <li key={it} className="border-t border-foreground/10 py-3 text-sm">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
