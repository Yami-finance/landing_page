"use client";

import { useEffect, useRef, useState } from "react";
import {
  AMOUNT_RANGES,
  INTENTS,
  normalizePhone,
  type Intent,
} from "@/lib/waitlist/schema";
import { prefersReducedMotion } from "@/components/motion/useInView";
import { track } from "@/lib/analytics";

const AMOUNT_LABEL: Record<Intent, string> = {
  borrow: "Amount you'd borrow",
  lend: "Amount you'd lend to start",
  both: "Typical amount (either way)",
};

const SHARE_TEXT =
  "I just claimed my spot on Yami — lending between people, on the record. yami.ng";

// Brand-coloured confetti burst on a successful join. Lazy-loaded so the library
// never touches the initial bundle, and skipped entirely under reduced motion.
// A chunk-load failure must never break the join flow — it's decorative.
async function celebrate() {
  if (typeof window === "undefined" || prefersReducedMotion()) return;
  try {
    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#DFFF3B", "#141711", "#16301F"];
    const opts = { origin: { y: 0.7 }, colors, disableForReducedMotion: true };
    confetti({ ...opts, particleCount: 80, spread: 70, startVelocity: 45 });
    setTimeout(
      () =>
        confetti({ ...opts, particleCount: 50, spread: 100, scalar: 0.9, decay: 0.92 }),
      150
    );
  } catch {
    // A failed confetti chunk must never break the join flow.
    return;
  }
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "where", string>>;

export function TicketForm({
  defaultIntent = "both",
  source = "/",
}: {
  defaultIntent?: Intent;
  source?: string;
}) {
  const [intent, setIntent] = useState<Intent>(defaultIntent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [where, setWhere] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState("");
  const [result, setResult] = useState<{ position: number; already: boolean }>({
    position: 0,
    already: false,
  });
  const [posDisplay, setPosDisplay] = useState(0);
  const viewed = useRef(false);

  useEffect(() => {
    setIntent(defaultIntent);
  }, [defaultIntent]);

  // Count the position up to its real value once the success state appears.
  useEffect(() => {
    if (status !== "success") return;
    if (prefersReducedMotion()) {
      setPosDisplay(result.position);
      return;
    }
    const target = result.position;
    const duration = 900;
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setPosDisplay(Math.round(target * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [status, result.position]);

  useEffect(() => {
    if (!viewed.current) {
      viewed.current = true;
      track("waitlist_view");
    }
  }, []);

  function chooseIntent(next: Intent) {
    setIntent(next);
    track("waitlist_intent_selected", { intent: next });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBanner("");
    const nextErrors: FieldErrors = {};
    if (name.trim().length < 2) nextErrors.name = "Enter your name";
    const trimmedEmail = email.trim();
    if (!trimmedEmail) nextErrors.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
      nextErrors.email = "Enter a valid email";
    if (!phone.trim()) nextErrors.phone = "Enter your WhatsApp number";
    else if (!normalizePhone(phone)) nextErrors.phone = "Enter a valid Nigerian number";
    if (where.trim().length < 2) nextErrors.where = "Where are you?";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !amount) {
      if (!amount) setBanner("Pick an amount range.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.trim(),
          phone,
          intent,
          amount_range: amount,
          where,
          source,
        }),
      });

      if (res.status === 422) {
        const data = await res.json();
        const f = data.fields ?? {};
        setErrors({
          name: f.name?.[0],
          email: f.email?.[0],
          phone: f.phone?.[0],
          where: f.where?.[0],
        });
        setStatus("idle");
        return;
      }
      if (res.status === 429) {
        setBanner("Slow down a moment — try again shortly.");
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error("request failed");

      const data = (await res.json()) as { position: number; already: boolean };
      setResult(data);
      setStatus("success");
      celebrate();
      track("waitlist_submitted", {
        intent,
        amount_range: amount,
        where: where.trim().toLowerCase().includes("babcock")
          ? "babcock"
          : "other",
      });
    } catch {
      // Non-blocking — typed input is preserved so they can just retry.
      setBanner("Couldn't record that — try again.");
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-[10px] border-[1.5px] border-ink bg-card shadow-ticket">
      {/* Header */}
      <div className="px-6 pb-5 pt-6 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
          Admit one · Early access
        </p>
        <h3 className="mt-2 text-[26px] font-extrabold leading-tight text-ink">
          Claim your spot
        </h3>
      </div>

      {/* Perforation with punched notches */}
      <div className="relative">
        <div className="border-t-[1.5px] border-dashed border-ink" />
        <span className="absolute -left-[9px] top-0 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-paper" />
        <span className="absolute -right-[9px] top-0 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-paper" />
      </div>

      {/* Body */}
      <div className="px-6 py-6 sm:px-8">
        {status === "success" ? (
          <div>
            <span className="stamp stamp-recorded thump inline-flex text-[13px]">
              ✓ Recorded
            </span>
            <p className="mt-5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              {result.already ? "You're already" : "You're on the list"}
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-[52px] font-medium leading-none tracking-tight text-ink tabular-nums">
                #{posDisplay}
              </span>
              <span className="text-[18px] font-bold text-ink-soft">
                in line
              </span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              We&apos;ll message you on WhatsApp when your cohort opens. Yami
              works better when your people are on it — tell your friend to tell their friends.
            </p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full"
            >
              Share on WhatsApp →
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            {/* Intent toggle */}
            <div className="grid grid-cols-3 overflow-hidden rounded-md border-[1.5px] border-ink">
              {INTENTS.map((opt, i) => {
                const active = intent === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => chooseIntent(opt)}
                    aria-pressed={active}
                    className={`py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors ${
                      i > 0 ? "border-l-[1.5px] border-ink" : ""
                    } ${active ? "bg-green text-ink" : "bg-transparent text-ink-soft hover:text-ink"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-5">
              <Field
                label="Full name"
                error={errors.name}
                value={name}
                onChange={setName}
                autoComplete="name"
              />
              <Field
                label="Email"
                error={errors.email}
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
              <Field
                label="WhatsApp number"
                error={errors.phone}
                value={phone}
                onChange={setPhone}
                type="tel"
                placeholder="0803 000 0000"
                autoComplete="tel"
              />

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {AMOUNT_LABEL[intent]}
                </span>
                <select
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2 w-full border-b-[1.5px] border-ink bg-transparent py-2 text-[15px] text-ink focus:border-green-ink focus:bg-green/10 focus:outline-none"
                >
                  <option value="" disabled>
                    Select amount
                  </option>
                  {AMOUNT_RANGES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>

              <Field
                label="School or city"
                error={errors.where}
                value={where}
                onChange={setWhere}
                placeholder="e.g. Babcock, Lagos"
              />
            </div>

            {banner && (
              <p
                role="alert"
                className="mt-5 rounded-md border-[1.5px] border-ink bg-green/20 px-3 py-2 font-mono text-[12px] text-ink"
              >
                {banner}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn mt-6 w-full disabled:opacity-60"
            >
              {status === "submitting" ? "Recording…" : "Secure my spot →"}
            </button>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              No BVN. No ID. No commitment. Just your place in line.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className="mt-2 w-full border-b-[1.5px] border-ink bg-transparent py-2 text-[15px] text-ink placeholder:text-faint focus:border-green-ink focus:bg-green/10 focus:outline-none"
      />
      {error && (
        <span className="mt-1 block font-mono text-[11px] text-ink">
          {error}
        </span>
      )}
    </label>
  );
}
