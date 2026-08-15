# CLAUDE.md

## What this is

A marketing site and permit status tracker for a two-person permit expediting
business serving Riverside and Orange County, California. The owners are a
husband (software engineer, writes the code) and wife (does the permitting
work, has the domain knowledge and edits job statuses).

Clients are contractors, plans/engineering firms, insurance restoration
companies, and homeowners rebuilding after fire damage.

**The product thesis in one line:** clients should always know whose court the
ball is in. Every design decision serves that.

## Stack

React 18 · TypeScript (strict) · Vite · React Router 6 · plain CSS

No Tailwind, no CSS-in-JS, no component library. All styling lives in
`src/styles.css` using CSS custom properties.

```bash
npm run dev      # localhost:5173
npm run build    # tsc -b, then vite build → dist/
npm run preview  # serve the production build
```

Deployed to Netlify from `main`. `netlify.toml` and `public/_redirects` both
contain the SPA catch-all redirect — don't remove either, or direct navigation
to routes like `/track` 404s.

## Layout

```
src/
  types.ts               Job, Stage, Department, Jurisdiction, ServiceTier
  data/seed.ts           Demo jobs, jurisdiction records, service tiers
  lib/store.ts           THE ONLY FILE THAT TOUCHES STORAGE
  components/
    Layout.tsx            Nav, footer, page shell (all routes nest in this)
    StatusPlacard.tsx    The client-facing status card
  pages/                 One file per route; see App.tsx for the route table
  styles.css             All styling. Palette tokens at the top.
```

## Hard rules

1. **`src/lib/store.ts` is the storage boundary.** Nothing else may call
   `localStorage`, `fetch`, or any persistence API. Five functions —
   `getJobs`, `saveJob`, `deleteJob`, `findJob`, `resetJobs` — are the entire
   surface. Phase 2 swaps their bodies for API calls; if that swap requires
   touching any other file, the boundary has been violated.

2. **Never widen what the public tracker exposes.** The lookup is a project
   number plus a last name — deliberately weaker than a login. So the client
   view must never show: fee or dollar amounts, uploaded documents, full street
   addresses, personal contact details, or any other client's jobs. If a task
   asks for one of these on `/track`, flag the tradeoff before implementing.

3. **The correction loop stays visible.** Permits go backwards; correction
   rounds are counted and shown. Never replace the stage rail with a linear
   progress bar or percentage. A client watching progress reverse with no
   explanation is the exact failure this product exists to prevent.

4. **Plan check is parallel, not sequential.** The "In review" stage holds
   independent department states (Building, Fire, Planning, Public Works,
   Environmental Health). Never collapse them into one status — the whole point
   is showing which department is the holdup.

5. **Ball-in-court is required on every job.** One of: `you` (client),
   `city` (agency), `us` (our team), `done`. The banner at the top of the
   placard is the most important element on the page.

6. **No new dependencies without asking.** The build is deliberately small.

## Design system

Palette is defined once as CSS custom properties at the top of `styles.css`.
Use the variables, never raw hex values in components.

| Token | Hex | Role |
| --- | --- | --- |
| `--blueprint` | `#255C78` | Headings, nav, links, "waiting on agency" |
| `--charcoal` | `#20282B` | Body text, dark sections, footer |
| `--paper` | `#F4F0E8` | Page background |
| `--concrete` | `#D8D8D2` | Borders, rules, card edges |
| `--terracotta` | `#D96F4C` | CTAs, eyebrows, "waiting on you" |
| `--sage` | `#789783` | Completed stages, issued stamp |
| `--studio` | `#FCFCFA` | Cards, nav bar, clean space |

Type: Archivo (display/headings), IBM Plex Sans (body), IBM Plex Mono (data,
labels, eyebrows, project numbers). Loaded from Google Fonts in `index.html`.

Quality floor, non-negotiable: responsive to mobile, visible keyboard focus,
`prefers-reduced-motion` respected. Contractors read this on phones in trucks.

## Voice

Plain and direct. Write from the reader's side of the screen.

- Name things the way a contractor would, not the way the system works
- Never use unexplained jargon in client-facing copy — "AHJ" is a competitor's
  mistake we're deliberately not repeating
- Buttons say what happens: "Check status", not "Submit"
- Errors explain what went wrong and what to do next; they don't apologize
- Say the number of days. Vagueness is what clients distrust.

## Domain vocabulary

- **Jurisdiction** — the city or county whose rules apply
- **Issuing agency** — who actually takes the submittal. NOT always the same as
  the jurisdiction: some cities contract building & safety out to the county or
  to a third-party firm. `Job.jurisdiction` is display text; this distinction is
  real and shows up in `Jurisdiction.issuedBy`.
- **Plan check** — agency review of submitted drawings
- **Corrections** — comments returned by the agency; responding restarts the
  review clock. Two rounds is normal, four happens.
- **AHJ** — Authority Having Jurisdiction. Fine internally, never in client copy.
- **Owner-builder vs licensed professional** — two intake paths with different
  required documents. `/start` splits on this before showing the form.

## Current phase

**Phase 1 (now).** Jobs live in browser `localStorage`. Edits in `/admin` are
per-device — the wife's laptop and a client's phone see different data. This is
intentional: real UI, real workflow, zero backend cost. Not multi-user, not
production-safe for live jobs.

**Phase 2.** Real backend, email + SMS on status change. SMS consent is already
captured at intake.

**Phase 3.** Poll or scrape jurisdiction portals so status updates itself. Only
worth it at volume. Don't build this early — it's the fun part and the part
that doesn't matter yet.

## Security, stated honestly

The `/admin` passphrase (`VITE_ADMIN_KEY`, fallback `permit2026`) is compiled
into the JS bundle and readable by anyone who views source. It hides the page
from casual visitors and crawlers. It is not access control. Do not describe it
as secure, and do not build features that assume it is.

## Placeholders still in the code

Flag these if a task touches them — they are not real yet:

- Phone `(951) 555-0140`, email `jobs@example.com` — appear in `Contact.tsx`,
  `Layout.tsx`, `StatusPlacard.tsx`, `Track.tsx`, `Start.tsx`
- Business name and the `PERMIT·TRACK` wordmark
- `About.tsx` — entirely placeholder copy
- Jurisdiction records in `seed.ts` — plausible but not verified
- `/start` doesn't submit anywhere
- No privacy policy or terms (required before collecting SMS consent)

## Working style

- Prefer editing existing files over adding new ones
- Match the surrounding code; it's consistent on purpose
- Run `npm run build` before finishing — it type-checks
- When a task is ambiguous about client-facing copy, ask rather than invent
- Small PRs. Netlify builds a preview per PR, and the owners review on phones.
