export interface Stat {
  readonly id: string;
  readonly label: string;
  /** Numeric target for the count-up animation. Omit when `display` is set. */
  readonly value?: number;
  readonly suffix?: string;
  /** Use for non-numeric figures (e.g. "Thousands") that skip the count-up entirely. */
  readonly display?: string;
}
