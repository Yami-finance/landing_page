// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — Formatting Utilities
//
// Centralized formatters for currency and dates. Every component that displays
// Naira amounts or timestamps must use these functions to ensure consistency.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a number as Nigerian Naira.
 *
 * @example
 * ```ts
 * formatNaira(2000000)  // "₦2,000,000"
 * formatNaira(42500)    // "₦42,500"
 * formatNaira(0)        // "₦0"
 * ```
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

/**
 * Format a number as Naira with decimals for precision display.
 *
 * @example
 * ```ts
 * formatNairaDecimal(557500) // "₦557,500.00"
 * ```
 */
export function formatNairaDecimal(amount: number): string {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format an ISO date string as a short readable date.
 *
 * @example
 * ```ts
 * formatDate('2026-09-01') // "1 Sep 2026"
 * ```
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format an ISO date string as date + time.
 *
 * @example
 * ```ts
 * formatDateTime('2026-09-01T14:30:00Z') // "1 Sep 2026, 14:30"
 * ```
 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${date}, ${time}`;
}

/**
 * Format a percentage for display.
 *
 * @example
 * ```ts
 * formatPercent(0.085) // "8.5%"
 * formatPercent(0.115) // "11.5%"
 * ```
 */
export function formatPercent(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`;
}
