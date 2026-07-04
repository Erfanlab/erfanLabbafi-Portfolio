export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly problem: string;
  readonly solution: string;
  readonly result: string;
  readonly stack: readonly string[];
  readonly featured: boolean;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  /** Small accent used for the card's chart/sparkline motif — a hex value. */
  readonly accent: string;
}
