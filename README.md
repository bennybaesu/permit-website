# SoCal Permit Service — Phase 1 shell

React 18 + TypeScript + Vite. No backend, no database, no paid services.

Everything here maps to Phase 1 of the plan: a marketing site, a public status
lookup keyed on a project number, and an internal console where you set those
statuses by hand.

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build locally
```

---

## Try the tracker

Go to **/track** and enter:

| Project number | Second factor | What you'll see |
| --- | --- | --- |
| `RC-4471` | `Delgado` | Sitting in plan check — parallel department review, ball with the city |
| `RC-4390` | `Whitfield` | Correction round 2 — ball with the client, blocked stage |
| `RC-4102` | `Serrano` | Permit issued — completed rail with the ISSUED stamp |

The second factor also accepts the street address (`1420 e grand`,
`338 n olive`, `77 via cordoba`). Matching is case-insensitive and
prefix-based, so "delg" works.

---

## The admin console

**URL:** `/admin` — there's no link to it anywhere in the site nav. Type it in.

**Passphrase:** `permit2026`

Change it by setting `VITE_ADMIN_KEY` — locally in a `.env` file, and in
Netlify under Site configuration → Environment variables:

```
VITE_ADMIN_KEY=whatever-you-pick
```

### What you can do in there

- Pick a job from the left column, or hit **+ New job** for a fresh one with an
  auto-assigned project number
- Set **ball in court** — waiting on you / waiting on the agency / we're on it /
  complete. This drives the colored banner at the top of the client's view
- Write the headline and detail the client reads
- Per stage: set status, completion date, and the description shown publicly
- Set each department's review state inside the "In review" stage
- Set the correction round number and note
- Edit the lookup answers (which last names or addresses unlock the job)
- **Live preview** at the bottom shows exactly what the client sees as you type

Changes save when you press **Save changes**. "Last updated" stamps itself.

### ⚠️ Read this before you use it for real work

Jobs are stored in **the browser's localStorage**. That means edits made on
your wife's laptop are visible on your wife's laptop only. A client on their
phone still sees the seed data.

That's intentional for Phase 1 — it lets you run the real UI against real
workflows for $0 while you find out whether the model is right. But it is
**not multi-user and not a database.** Don't run a live job through it.

When you're ready to fix that, every storage call is isolated in
`src/lib/store.ts` — five functions: `getJobs`, `saveJob`, `deleteJob`,
`findJob`, `resetJobs`. Swap their bodies for `fetch()` calls against a real
API and nothing else in the app changes.

Good next steps, cheapest first: Netlify Functions + a hosted Postgres
(Neon or Supabase both have free tiers), or Supabase directly if you want auth
and a database in one.

---

## Security posture, stated plainly

The admin passphrase is compiled into the JavaScript bundle. Anyone who views
source can find it. It keeps the page out of the way of casual visitors and
search crawlers; it is not access control.

Before real client data goes in:

- Move job data server-side behind a real session
- Rate-limit the public lookup endpoint
- Keep fee amounts, documents, full addresses, and any other client's jobs out
  of the public view — the tracker deliberately shows none of these today

---

## Deploy to Netlify (free)

### 1. Push to GitHub

```bash
cd permit-site
git init
git add .
git commit -m "SoCal Permit Service: phase 1 shell"
git branch -M main
```

Create an empty repo on github.com (no README, no .gitignore — you have both),
then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/permit-site.git
git push -u origin main
```

### 2. Connect Netlify

1. Sign in at [app.netlify.com](https://app.netlify.com) with your GitHub account
2. **Add new site → Import an existing project → GitHub**
3. Authorize Netlify, then pick `permit-site`
4. Netlify reads `netlify.toml` and fills these in automatically — confirm they say:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Before deploying, open **Add environment variables** and set
   `VITE_ADMIN_KEY` to your chosen passphrase
6. **Deploy site**

First build takes about a minute. You'll get a URL like
`https://spontaneous-marzipan-a1b2c3.netlify.app`.

### 3. Rename it

Site configuration → Site details → **Change site name** → e.g.
`socal-permit-service` → your URL becomes `https://socal-permit-service.netlify.app`.

### 4. Every push redeploys

Push to `main` and Netlify rebuilds automatically. Pull requests get their own
preview URL, which is handy for showing your wife a change before it's live.

### Two things that matter for a React router app

Both are already handled, but so you know why they're there:

- **`netlify.toml`** has a catch-all redirect to `/index.html`. Without it,
  someone loading `yoursite.netlify.app/track` directly gets a 404, because
  Netlify looks for a file at that path and React Router never gets a chance to
  handle it.
- **`public/_redirects`** is the same rule in Netlify's other supported format,
  as a belt-and-braces backup.

### Keeping it private while you're still building

Site configuration → Access & security → **Password protection** (available on
the free tier) puts a single password in front of the whole site. Worth turning
on until the copy is real — you don't want Google indexing placeholder text or
a fake phone number.

---

## What to replace before this is real

- [ ] Hours, and confirm the service area copy against where jobs actually come from (`Contact.tsx`, `Layout.tsx`, `StatusPlacard.tsx`)
- [ ] `About.tsx` — your real names and a photo. In a two-person business the people are the pitch
- [ ] Real jurisdiction data in `src/data/seed.ts` — currently only Riverside and Orange County cities, but the copy now claims all of Southern California; add San Diego, LA and San Bernardino jurisdictions or narrow the copy back down
- [ ] Wire `/start` to somewhere. Easiest: add `data-netlify="true"` and a `name` to the `<form>` in `Start.tsx` and Netlify Forms captures submissions for free
- [ ] Privacy policy and terms — required if you're collecting SMS consent
- [ ] Real pricing decision: publish it or don't, but pick

---

## Structure

```
src/
  types.ts               Job, Stage, Department, Jurisdiction shapes
  data/seed.ts           Demo jobs, jurisdiction records, service tiers
  lib/store.ts           ← the ONLY file that touches storage
  components/
    Layout.tsx           Nav, footer, page shell
    StatusPlacard.tsx    The client-facing status card
  pages/
    Home.tsx  Services.tsx  Jurisdictions.tsx  JurisdictionDetail.tsx
    Process.tsx  Track.tsx  Start.tsx  About.tsx  Contact.tsx
    Admin.tsx  NotFound.tsx
  styles.css             All styling; palette tokens at the top
```

## Palette

Defined once as CSS custom properties at the top of `src/styles.css`.

| Token | Hex | Used for |
| --- | --- | --- |
| `--blueprint` | `#255C78` | Headings, nav, links, "waiting on agency" |
| `--charcoal` | `#20282B` | Body text, dark sections, footer |
| `--paper` | `#F4F0E8` | Page background |
| `--concrete` | `#D8D8D2` | Borders, rules, card edges |
| `--terracotta` | `#D96F4C` | CTAs, eyebrows, "waiting on you" |
| `--sage` | `#789783` | Completed stages, "issued" stamp |
| `--studio` | `#FCFCFA` | Cards, nav bar, clean space |
