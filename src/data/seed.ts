import type { Job, Jurisdiction, ServiceTier } from "../types";

/**
 * DEMO DATA.
 * Replace with your own once you're live. The public tracker matches on
 * `locator` + any string in `verifiers` (case-insensitive, prefix match).
 */
export const SEED_JOBS: Job[] = [
  {
    locator: "RC-4471",
    verifiers: ["delgado", "1420 e grand"],
    clientName: "Delgado",
    projectType: "Fire rebuild — full reconstruction",
    jurisdiction: "City of Corona",
    jurisdictionSlug: "corona",
    filedOn: "Jul 22, 2026",
    court: "city",
    courtHeadline: "City of Corona has your plans.",
    courtNote:
      "Day 12 of review. Corona typically returns first comments in 15–20 business days. Nothing is needed from you right now.",
    lastUpdated: "Aug 15, 2026 · 8:15 AM",
    stages: [
      {
        key: "received",
        title: "Received",
        state: "done",
        completedOn: "Jul 18, 2026",
        detail: "Job opened and scope confirmed with your office.",
      },
      {
        key: "information",
        title: "Information",
        state: "done",
        completedOn: "Jul 21, 2026",
        detail:
          "Owner authorization, contractor license and scope letter collected.",
      },
      {
        key: "ready",
        title: "Ready to submit",
        state: "done",
        completedOn: "Jul 22, 2026",
        detail: "Package assembled and checked against Corona's submittal list.",
      },
      {
        key: "review",
        title: "In review",
        state: "active",
        detail: "Submitted to the city. Departments review in parallel.",
        departments: [
          { name: "Building", state: "review" },
          { name: "Fire — Corona FD", state: "approved" },
          { name: "Planning", state: "approved" },
          { name: "Public Works", state: "queued" },
        ],
      },
      {
        key: "corrections",
        title: "Corrections",
        state: "pending",
        detail:
          "If the city returns comments, they'll show here with what we need from you.",
      },
      {
        key: "issued",
        title: "Permit issued",
        state: "pending",
        detail: "Fees paid and permit card released to the job site.",
      },
    ],
  },
  {
    locator: "RC-4390",
    verifiers: ["whitfield", "338 n olive"],
    clientName: "Whitfield",
    projectType: "Room addition + electrical",
    jurisdiction: "Riverside County (unincorporated)",
    jurisdictionSlug: "riverside-county",
    filedOn: "Jun 9, 2026",
    court: "you",
    courtHeadline: "We need a signed owner authorization to respond.",
    courtNote:
      "Due Aug 19. Until we have it we can't resubmit, and the county's correction clock keeps running.",
    lastUpdated: "Aug 14, 2026 · 4:40 PM",
    stages: [
      {
        key: "received",
        title: "Received",
        state: "done",
        completedOn: "Jun 4, 2026",
        detail: "Job opened.",
      },
      {
        key: "information",
        title: "Information",
        state: "done",
        completedOn: "Jun 8, 2026",
        detail: "Initial documents collected.",
      },
      {
        key: "ready",
        title: "Ready to submit",
        state: "done",
        completedOn: "Jun 9, 2026",
        detail: "Package assembled.",
      },
      {
        key: "review",
        title: "In review",
        state: "done",
        completedOn: "Jul 30, 2026",
        detail: "County returned comments on Jul 30.",
        departments: [
          { name: "Building", state: "comments" },
          { name: "Fire — Riverside County", state: "approved" },
          { name: "Environmental Health", state: "comments" },
        ],
      },
      {
        key: "corrections",
        title: "Corrections",
        state: "blocked",
        detail:
          "Building and Environmental Health each returned comments.",
        correctionRound: 2,
        correctionNote:
          "Round 1 cleared Jul 12. This round needs a signed owner authorization from you before we can respond — everything else is already drafted on our side.",
      },
      {
        key: "issued",
        title: "Permit issued",
        state: "pending",
        detail: "Fees paid and permit card released to the job site.",
      },
    ],
  },
  {
    locator: "RC-4102",
    verifiers: ["serrano", "77 via cordoba"],
    clientName: "Serrano",
    projectType: "Fire rebuild — like-for-like",
    jurisdiction: "City of Temecula",
    jurisdictionSlug: "temecula",
    filedOn: "Apr 10, 2026",
    permitNumber: "B26-01844",
    court: "done",
    courtHeadline: "Permit issued Aug 6, 2026.",
    courtNote:
      "Permit card and stamped plans were emailed to your office. Keep both posted on site for inspections.",
    lastUpdated: "Aug 6, 2026 · 11:02 AM",
    stages: [
      {
        key: "received",
        title: "Received",
        state: "done",
        completedOn: "Apr 2, 2026",
        detail: "Job opened.",
      },
      {
        key: "information",
        title: "Information",
        state: "done",
        completedOn: "Apr 9, 2026",
        detail: "Documents collected.",
      },
      {
        key: "ready",
        title: "Ready to submit",
        state: "done",
        completedOn: "Apr 10, 2026",
        detail: "Package assembled.",
      },
      {
        key: "review",
        title: "In review",
        state: "done",
        completedOn: "Jun 18, 2026",
        detail: "All departments cleared.",
        departments: [
          { name: "Building", state: "approved" },
          { name: "Fire — Temecula", state: "approved" },
          { name: "Planning", state: "approved" },
        ],
      },
      {
        key: "corrections",
        title: "Corrections",
        state: "done",
        completedOn: "Jun 16, 2026",
        detail: "One round of comments, cleared in 9 days.",
        correctionRound: 1,
      },
      {
        key: "issued",
        title: "Permit issued",
        state: "done",
        completedOn: "Aug 6, 2026",
        detail: "Fees paid and permit card released.",
      },
    ],
  },
];

/** A fresh job template used by the admin "New job" button. */
export const BLANK_STAGES = (): Job["stages"] => [
  { key: "received", title: "Received", state: "active", detail: "Job opened." },
  {
    key: "information",
    title: "Information",
    state: "pending",
    detail: "Gathering what the jurisdiction requires.",
  },
  {
    key: "ready",
    title: "Ready to submit",
    state: "pending",
    detail: "Package assembled and checked against the submittal list.",
  },
  {
    key: "review",
    title: "In review",
    state: "pending",
    detail: "With the agency. Departments review in parallel.",
    departments: [
      { name: "Building", state: "queued" },
      { name: "Fire", state: "queued" },
      { name: "Planning", state: "queued" },
    ],
  },
  {
    key: "corrections",
    title: "Corrections",
    state: "pending",
    detail:
      "If the agency returns comments, they'll show here with what we need from you.",
  },
  {
    key: "issued",
    title: "Permit issued",
    state: "pending",
    detail: "Fees paid and permit card released to the job site.",
  },
];

export const JURISDICTIONS: Jurisdiction[] = [
  {
    slug: "corona",
    name: "Corona",
    county: "Riverside County",
    issuedBy: "City of Corona — Building Division",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Corona Fire Department",
    typicalTurnaround: "15–20 business days to first comments",
    notes: [
      "Separate fire review runs in parallel with building.",
      "Confirm school district fees before final issuance.",
    ],
  },
  {
    slug: "riverside-county",
    name: "Riverside County (unincorporated)",
    county: "Riverside County",
    issuedBy: "Riverside County Building & Safety (TLMA)",
    portal: "TLMA online services",
    eSubmittal: true,
    fireAuthority: "Riverside County Fire Marshal",
    typicalTurnaround: "20–30 business days to first comments",
    notes: [
      "Plan check is outsourced to a third-party firm — comments come back on their letterhead.",
      "Environmental Health review required for septic and well.",
      "Also issues permits for some contract cities.",
    ],
  },
  {
    slug: "temecula",
    name: "Temecula",
    county: "Riverside County",
    issuedBy: "City of Temecula — Building & Safety",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Riverside County Fire (contract)",
    typicalTurnaround: "15–20 business days to first comments",
    notes: ["Like-for-like fire rebuilds follow a streamlined path."],
  },
  {
    slug: "murrieta",
    name: "Murrieta",
    county: "Riverside County",
    issuedBy: "City of Murrieta — Building & Safety",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Murrieta Fire & Rescue",
    typicalTurnaround: "15–25 business days to first comments",
    notes: [],
  },
  {
    slug: "anaheim",
    name: "Anaheim",
    county: "Orange County",
    issuedBy: "City of Anaheim — Building Division",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Anaheim Fire & Rescue",
    typicalTurnaround: "15–20 business days to first comments",
    notes: [],
  },
  {
    slug: "irvine",
    name: "Irvine",
    county: "Orange County",
    issuedBy: "City of Irvine — Building & Safety",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Orange County Fire Authority",
    typicalTurnaround: "15–20 business days to first comments",
    notes: ["OCFA review is a separate submittal with its own clock."],
  },
  {
    slug: "santa-ana",
    name: "Santa Ana",
    county: "Orange County",
    issuedBy: "City of Santa Ana — Building Safety",
    portal: "City online permit portal",
    eSubmittal: true,
    fireAuthority: "Orange County Fire Authority",
    typicalTurnaround: "20–25 business days to first comments",
    notes: [],
  },
  {
    slug: "orange-county",
    name: "Orange County (unincorporated)",
    county: "Orange County",
    issuedBy: "OC Public Works — Building & Safety",
    portal: "County online permit portal",
    eSubmittal: true,
    fireAuthority: "Orange County Fire Authority",
    typicalTurnaround: "20–30 business days to first comments",
    notes: ["Unincorporated pockets are small but scattered — verify by parcel."],
  },
];

export const TIERS: ServiceTier[] = [
  {
    slug: "permit-management",
    name: "Permit project management",
    pitch: "You already have stamped plans. We push them through the city.",
    includes: [
      "Jurisdiction routing and submittal",
      "Application preparation and filing as your authorized agent",
      "Plan check correction responses and resubmittals",
      "Department follow-up through approval",
      "Live status tracking for your whole team",
    ],
    goodFitIf:
      "You have drawings ready and want someone who already knows what this city asks for.",
  },
  {
    slug: "full-service",
    name: "Full-service permitting",
    pitch: "From drawings to permit card, one team owns the whole thing.",
    includes: [
      "Plan preparation through our engineering partner",
      "Everything in permit project management",
      "Engineering and consultant coordination",
      "Fee calculation and payment handling",
    ],
    goodFitIf:
      "You need drawings and permits, and you'd rather call one number than four.",
  },
  {
    slug: "restoration",
    name: "Insurance restoration permitting",
    pitch: "Repair and rebuild work, priced and paced for insurance timelines.",
    includes: [
      "Fire, water and structural repair permits",
      "Like-for-like and streamlined rebuild pathways",
      "Volume pricing for restoration contractors",
      "Documentation formatted for carriers and adjusters",
    ],
    goodFitIf:
      "You run restoration jobs and need permits that keep pace with the claim.",
  },
  {
    slug: "consulting",
    name: "Feasibility & consulting",
    pitch: "Answers before anyone spends money on drawings.",
    includes: [
      "Which jurisdiction actually issues this permit",
      "What the city will require for your scope",
      "Realistic timeline and fee estimate",
      "Whether the project is viable as proposed",
    ],
    goodFitIf:
      "You need to know what you're walking into before you commit.",
  },
];
