// Env-gated analytics (§3). No-ops unless Plausible or PostHog is present on the
// page, so nothing ships until Murewa wires a provider. Never pass PII.
type Props = Record<string, string | number | boolean | undefined>;

type PlausibleWindow = Window & {
  plausible?: (event: string, opts?: { props?: Props }) => void;
  posthog?: { capture?: (event: string, props?: Props) => void };
};

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  const w = window as PlausibleWindow;
  if (typeof w.plausible === "function") {
    w.plausible(event, props ? { props } : undefined);
  } else if (typeof w.posthog?.capture === "function") {
    w.posthog.capture(event, props);
  }
}
