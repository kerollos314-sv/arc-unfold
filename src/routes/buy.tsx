import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Configure & Reserve — ATLAS CHRONOS" },
      {
        name: "description",
        content:
          "Choose your ATLAS CHRONOS: Essential, Enthusiast or Skeleton Edition. Secure checkout, free insured global shipping and a 5-year international warranty.",
      },
      { property: "og:title", content: "Configure & Reserve — ATLAS CHRONOS" },
      {
        property: "og:description",
        content: "Three mechanical references, one instrument. Configure your ATLAS CHRONOS.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuyPage,
});

const MODELS = [
  {
    id: "essential",
    name: "The Essential",
    price: 199,
    specs: ["Grade-5 titanium case", "Automatic movement", "Fluoroelastomer strap"],
  },
  {
    id: "enthusiast",
    name: "The Enthusiast",
    price: 349,
    badge: "Most Popular",
    specs: ["High-beat movement", "Titanium bracelet", "Exhibition caseback"],
  },
  {
    id: "skeleton",
    name: "The Skeleton Edition",
    price: 499,
    specs: ["Open-heart skeleton dial", "Hand-finished rotor", "Presentation box"],
  },
] as const;

function PayMark({ label }: { label: string }) {
  return (
    <div className="flex h-8 items-center justify-center border border-border px-3 font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
      {label}
    </div>
  );
}

function BuyPage() {
  const [selected, setSelected] = useState<string>("enthusiast");
  const model = MODELS.find((m) => m.id === selected) ?? MODELS[1];

  return (
    <main className="grain min-h-screen bg-background pt-20">
      <div className="grid lg:grid-cols-2">
        {/* Visual */}
        <div className="relative lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <div className="relative flex h-[46vh] items-center justify-center overflow-hidden bg-onyx lg:h-full">
            <img
              src="/assets/sequence/0001.webp"
              alt="ATLAS CHRONOS titanium mechanical watch, fully assembled"
              className="h-full w-full object-cover opacity-90"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,oklch(0.08_0.004_260/0.85)_100%)]" />
            <div className="pointer-events-none absolute bottom-8 left-8">
              <div className="label-eyebrow">Reference 001</div>
              <div className="mt-2 font-display text-3xl text-steel">{model.name}</div>
            </div>
          </div>
        </div>

        {/* Configurator */}
        <div className="px-6 py-14 md:px-12 lg:px-16">
          <div className="label-eyebrow">Step 01 — Choose your model</div>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1] tracking-[-0.02em] text-steel">
            Configure your Chronos
          </h1>

          <div className="mt-10 space-y-4">
            {MODELS.map((m) => {
              const active = m.id === selected;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelected(m.id)}
                  aria-pressed={active}
                  className={`relative w-full border p-6 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                      : "border-border bg-card/40 hover:border-muted-foreground/40"
                  }`}
                >
                  {"badge" in m && m.badge && (
                    <span className="absolute -top-2 right-6 bg-primary px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-primary-foreground uppercase">
                      {m.badge}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-2xl text-foreground">{m.name}</div>
                      <ul className="mt-3 space-y-1.5">
                        {m.specs.map((s) => (
                          <li
                            key={s}
                            className="flex items-center gap-2 text-sm font-light text-muted-foreground"
                          >
                            <Check size={13} className="text-primary" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-foreground">${m.price}</div>
                      <div
                        className={`mt-3 ml-auto flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? "border-primary bg-primary" : "border-border"
                        }`}
                      >
                        {active && <Check size={12} className="text-primary-foreground" />}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step 2 */}
          <div className="mt-16 label-eyebrow">Step 02 — Payment</div>
          <div className="mt-6 border border-border bg-card/40 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-light text-muted-foreground">{model.name}</span>
              <span className="font-mono text-foreground">${model.price}.00</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-light text-muted-foreground">Insured global shipping</span>
              <span className="font-mono text-muted-foreground">Included</span>
            </div>
            <div className="mt-5 hairline" />
            <div className="mt-5 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
                Total due today
              </span>
              <span className="font-display text-3xl text-steel">${model.price}.00</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 w-full bg-primary py-4 font-mono text-[11px] tracking-[0.3em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Proceed to payment
          </button>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-primary" />
              <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                Secure checkout
              </span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {["Apple Pay", "G Pay", "Visa", "MC", "Stripe"].map((p) => (
                <PayMark key={p} label={p} />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 border border-border p-4">
              <Truck size={16} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="text-sm text-foreground">Free global insured shipping</div>
                <div className="mt-1 text-xs font-light text-muted-foreground">
                  Tracked, signature on delivery.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-border p-4">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="text-sm text-foreground">5-year international warranty</div>
                <div className="mt-1 text-xs font-light text-muted-foreground">
                  Servicing at any ATLAS atelier.
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="mt-12 inline-block font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            ← Back to the instrument
          </Link>
        </div>
      </div>
    </main>
  );
}