import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { SequenceCanvas } from "@/components/watch/SequenceCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATLAS CHRONOS — Ultra-Premium Titanium Smartwatch" },
      {
        name: "description",
        content:
          "A cinematic exploded view of ATLAS CHRONOS: grade-5 titanium, sapphire optics and the R1 silicon core. Scroll to disassemble the watch, component by component.",
      },
      { property: "og:title", content: "ATLAS CHRONOS — Ultra-Premium Titanium Smartwatch" },
      {
        property: "og:description",
        content:
          "Scroll-driven engineering reveal of the ATLAS CHRONOS: 187 components, one instrument.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

type Range = [number, number];

function useReveal(progress: MotionValue<number>, [start, end]: Range) {
  const fade = 0.055;
  const stops = [start - fade, start + fade, end - fade, end + fade]
    .map((v) => Math.min(1, Math.max(0, v)))
    .reduce<number[]>((acc, v) => {
      const prev = acc[acc.length - 1];
      acc.push(prev !== undefined && v <= prev ? Math.min(1, prev + 0.001) : v);
      return acc;
    }, []);
  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  const y = useTransform(progress, stops, [34, 0, 0, -34]);
  const blur = useTransform(opacity, [0, 1], [10, 0]);
  const filter = useTransform(blur, (b: number) => `blur(${b}px)`);
  return { opacity, y, filter };
}

function Chapter({
  progress,
  range,
  index,
  eyebrow,
  title,
  body,
  stats,
  align = "left",
}: {
  progress: MotionValue<number>;
  range: Range;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  stats?: { k: string; v: string }[];
  align?: "left" | "right" | "center";
}) {
  const { opacity, y, filter } = useReveal(progress, range);
  const position =
    align === "center"
      ? "items-end justify-center pb-20 text-center"
      : align === "right"
        ? "items-center justify-end"
        : "items-center justify-start";

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className={`pointer-events-none absolute inset-0 flex px-6 md:px-16 lg:px-24 ${position}`}
    >
      <div
        className={`absolute inset-y-0 ${
          align === "center"
            ? "inset-x-0 top-auto h-1/2 bg-gradient-to-t from-background/90 to-transparent"
            : align === "right"
              ? "right-0 w-full bg-gradient-to-l from-background/92 via-background/45 to-transparent md:w-3/5"
              : "left-0 w-full bg-gradient-to-r from-background/92 via-background/45 to-transparent md:w-3/5"
        }`}
      />
      <div className={`relative max-w-md ${align === "center" ? "max-w-2xl" : ""}`}>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">{index}</span>
          <span className="h-px w-8 bg-primary/70" />
          <span className="label-eyebrow">{eyebrow}</span>
        </div>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em] whitespace-pre-line text-steel">
          {title}
        </h2>
        <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed font-light text-muted-foreground">
          {body}
        </p>
        {stats && (
          <div className={`mt-8 flex gap-10 ${align === "center" ? "justify-center" : ""}`}>
            {stats.map((s) => (
              <div key={s.k}>
                <div className="font-display text-2xl text-foreground">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Landing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(150);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 42, mass: 0.35 });

  const heroOpacity = useTransform(smooth, [0, 0.07], [1, 0]);
  const heroScale = useTransform(smooth, [0, 0.12], [1, 1.08]);
  const heroY = useTransform(smooth, [0, 0.1], [0, -60]);

  const pct = Math.round((loaded / total) * 100);
  const booting = loaded < total;

  return (
    <main className="grain relative bg-background">
      {/* Preload gate */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: booting ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: booting ? "auto" : "none" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-onyx"
      >
        <div className="label-eyebrow">Atlas Chronos</div>
        <div className="mt-6 h-px w-48 overflow-hidden bg-border">
          <motion.div className="h-full bg-primary" animate={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
          CALIBRATING {String(pct).padStart(3, "0")}%
        </div>
      </motion.div>

      {/* Fixed chrome */}
      <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-gradient-to-b from-background/85 to-transparent px-6 py-6 backdrop-blur-[2px] md:px-10">
        <span className="font-display text-lg tracking-[0.16em] text-foreground">ATLAS</span>
        <span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground md:block">
          CHRONOS · REF. 001 · TITANIUM
        </span>
        <a
          href="#reserve"
          className="border border-border px-4 py-2 font-mono text-[10px] tracking-[0.24em] text-foreground uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Reserve
        </a>
      </header>

      {/* Scrollytelling stage */}
      <section ref={sectionRef} className="relative h-[760vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <SequenceCanvas
              progress={smooth}
              onProgress={(l, t) => {
                setLoaded(l);
                setTotal(t);
              }}
            />
          </motion.div>

          {/* Hero */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-14 text-center"
          >
            <div className="label-eyebrow">Chapter 00 — The Instrument</div>
            <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,9rem)] leading-[0.86] tracking-[-0.035em] text-steel">
              CHRONOS
            </h1>
            <p className="mt-6 max-w-xs font-light text-muted-foreground md:max-w-sm">
              187 components. One instrument. Scroll to take it apart.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.32em] text-muted-foreground">
                SCROLL
              </span>
              <motion.span
                style={{ originY: 0 }}
                animate={{ scaleY: [0.2, 1, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-12 w-px bg-primary/70"
              />
            </div>
          </motion.div>

          <Chapter
            progress={smooth}
            range={[0.16, 0.32]}
            index="01"
            eyebrow="Exterior"
            title={"Grade-5 titanium,\nbrushed by hand"}
            body="A monobloc case machined from a single billet, then finished across eleven passes. 42 grams on the wrist. Immovable in the wind tunnel of daily life."
            stats={[
              { k: "Case", v: "41mm" },
              { k: "Weight", v: "42g" },
            ]}
          />

          <Chapter
            progress={smooth}
            range={[0.36, 0.52]}
            index="02"
            eyebrow="Optics"
            title={"Sapphire, cut\nby light"}
            body="A 1.4mm sapphire crystal grown over sixteen days, laser-cut and polished to an optical tolerance of two microns. Anti-reflective on both faces."
            align="right"
            stats={[
              { k: "Hardness", v: "9 Mohs" },
              { k: "Nits", v: "3000" },
            ]}
          />

          <Chapter
            progress={smooth}
            range={[0.56, 0.72]}
            index="03"
            eyebrow="Silicon"
            title={"The R1 core,\n3-nanometre"}
            body="A dual-die architecture with a dedicated always-on coprocessor, suspended on a copper heat spreader that turns the caseback into a radiator."
            stats={[
              { k: "Process", v: "3nm" },
              { k: "Autonomy", v: "9 days" },
            ]}
          />

          <Chapter
            progress={smooth}
            range={[0.76, 0.9]}
            index="04"
            eyebrow="Sensing"
            title={"Twelve sensors,\none silence"}
            body="Optical cardiology, electrical conduction, blood-oxygen spectrometry and a temperature array — layered under the caseback without a millimetre wasted."
            align="right"
            stats={[
              { k: "Sensors", v: "12" },
              { k: "Sample", v: "1 kHz" },
            ]}
          />

          <Chapter
            progress={smooth}
            range={[0.9, 0.995]}
            index="05"
            eyebrow="Assembly"
            title="Whole again"
            body="187 components returning to a single, sealed object. Certified to 100 metres."
            align="center"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[image:var(--gradient-fade)]" />
        </div>
      </section>

      {/* Specification ledger */}
      <section className="relative border-t border-border px-6 py-28 md:px-16 lg:px-24">
        <div className="label-eyebrow">Technical ledger</div>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-steel">
          Every component accounted for.
        </h2>
        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            {
              t: "Movement",
              d: "R1 dual-die SoC, always-on coprocessor, 64GB vault storage.",
              n: "01",
            },
            { t: "Case", d: "Grade-5 titanium monobloc, 100m water resistance, sapphire caseback.", n: "02" },
            { t: "Display", d: "1.9\" LTPO4 crystal, 1–120Hz, 3000 nits peak brightness.", n: "03" },
            { t: "Power", d: "Solid-state 720mAh cell. Nine days typical, 42 hours under load.", n: "04" },
            { t: "Sensing", d: "ECG, SpO₂, skin temperature array, dual-band GNSS, depth gauge.", n: "05" },
            { t: "Strap", d: "Interchangeable titanium link, vulcanised rubber or Barenia leather.", n: "06" },
          ].map((s) => (
            <div key={s.t} className="group bg-background p-8 transition-colors hover:bg-card">
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary">{s.n}</div>
              <div className="mt-6 font-display text-2xl text-foreground">{s.t}</div>
              <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve */}
      <section
        id="reserve"
        className="relative flex min-h-[70vh] flex-col items-center justify-center border-t border-border px-6 py-28 text-center"
      >
        <div className="label-eyebrow">Limited first series</div>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.94] tracking-[-0.03em] text-steel">
          ATLAS CHRONOS
        </h2>
        <p className="mt-6 max-w-md font-light text-muted-foreground">
          500 pieces, numbered on the caseback. Reservations open to the register first.
        </p>
        <a
          href="#reserve"
          className="mt-10 border border-primary/60 bg-primary/10 px-10 py-4 font-mono text-[11px] tracking-[0.3em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Join the register
        </a>
        <div className="mt-14 hairline max-w-xl" />
        <div className="mt-8 font-mono text-[10px] tracking-[0.28em] text-muted-foreground">
          ATLAS INSTRUMENTS · GENÈVE · MMXXVI
        </div>
      </section>
    </main>
  );
}
