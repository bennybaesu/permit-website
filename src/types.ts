/** Who everyone is waiting on. This is the whole point of the tracker. */
export type Court = "you" | "city" | "us" | "done";

/** Where a stage sits in the lifecycle. */
export type StageState = "done" | "active" | "blocked" | "pending";

/** Per-department review state inside the "In review" stage. */
export type DeptState = "approved" | "review" | "comments" | "queued";

export interface Department {
  name: string;
  state: DeptState;
}

export interface Stage {
  key: string;
  title: string;
  state: StageState;
  /** Display date, e.g. "Jul 22, 2026". Only shown when state is "done". */
  completedOn?: string;
  detail: string;
  /** Only present on the "In review" stage. */
  departments?: Department[];
  /** Only present on the "Corrections" stage. */
  correctionRound?: number;
  correctionNote?: string;
}

export interface Job {
  locator: string;
  /** Lowercase strings the public lookup will accept as the second factor. */
  verifiers: string[];
  clientName: string;
  projectType: string;
  jurisdiction: string;
  jurisdictionSlug: string;
  filedOn: string;
  permitNumber?: string;
  court: Court;
  courtHeadline: string;
  courtNote: string;
  lastUpdated: string;
  stages: Stage[];
}

export interface Jurisdiction {
  slug: string;
  name: string;
  county: string;
  issuedBy: string;
  portal: string;
  eSubmittal: boolean;
  fireAuthority: string;
  typicalTurnaround: string;
  notes: string[];
}

export interface ServiceTier {
  slug: string;
  name: string;
  pitch: string;
  includes: string[];
  goodFitIf: string;
}
