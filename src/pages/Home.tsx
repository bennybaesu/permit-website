import { Link } from "react-router-dom";
import { TIERS } from "../data/seed";

const COUNTIES = [
  "Orange County",
  "Los Angeles County",
  "San Bernardino County",
  "Riverside County",
  "San Diego County",
];

/** Highlights a reference to the Permit Servicing tier in its title color. */
function renderTierInclude(text: string) {
  const marker = "Permit Servicing";
  const idx = text.indexOf(marker);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "var(--blueprint)" }}>{marker}</span>
      {text.slice(idx + marker.length)}
    </>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Southern California</p>
            <h1>
              From submittal to approval, we keep things moving.
            </h1>
            <p className="lead">
              Permitting takes time. Chasing it down doesn&rsquo;t have to
              take yours. We handle submittals, corrections, and agency
              follow-ups while keeping you updated from start to finish.
            </p>
            <div className="btn-row">
              <Link to="/start" className="btn btn--primary">
                Start a project
              </Link>
            </div>
            <p className="hint" style={{ marginTop: 18 }}>
              Or email{" "}
              <a href="mailto:socalpermitrunner@gmail.com">
                <strong>socalpermitrunner@gmail.com</strong>
              </a>{" "}
              — we answer.
            </p>
          </div>

          <aside className="hero__aside">
            <h3>Already have a project number?</h3>
            <p>
              Enter it with the last name on the job and see exactly where
              things stand. No account, no password.
            </p>
            <Link to="/track" className="btn btn--onDark btn--sm">
              Check status
            </Link>
          </aside>
        </div>
      </section>

      {/* The differentiator, stated plainly */}
      <section className="section section--dark">
        <div className="container">
          <p className="eyebrow">Why clients stay</p>
          <h2>You&rsquo;ll always know where your permit stands.</h2>
          <p className="lead">
            Permitting can take time. That doesn&rsquo;t mean you should be
            left wondering what&rsquo;s happening. Every job we manage has a
            clear status, a clear next step, and dates attached—so you
            always know where things stand.
          </p>
          <div className="grid grid--3" style={{ marginTop: 30 }}>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#d96f4c" }}>Waiting on you</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                If we need something from you, you&rsquo;ll know exactly what
                it is and when we need it.
              </p>
            </div>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#7fb2d1" }}>Waiting on the agency</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                You&rsquo;ll know every department reviewing it right now,
                and how long each has had it.
              </p>
            </div>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#789783" }}>We&rsquo;re on it</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                When the next step is ours, you&rsquo;ll know what
                we&rsquo;re working on and what comes next. We stay on top of
                the process so you don&rsquo;t have to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier ladder */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h2>Three ways to work with us</h2>
          <div className="grid grid--3">
            {TIERS.map((t) => (
              <article className="card card--tier" key={t.slug}>
                <h3>{t.name}</h3>
                <p style={{ fontSize: 14.5 }}>{t.pitch}</p>
                <ul>
                  {t.includes.slice(0, 4).map((i) => (
                    <li key={i}>{renderTierInclude(i)}</li>
                  ))}
                </ul>
                <div className="fit">
                  <strong>Good fit if</strong>
                  {t.goodFitIf}
                </div>
              </article>
            ))}
          </div>
          <div className="btn-row">
            <Link to="/services" className="btn btn--blue">
              Compare all services
            </Link>
          </div>
        </div>
      </section>

      {/* Audiences — three, not eleven */}
      <section className="section section--tight" style={{ background: "#fcfcfa", borderTop: "1px solid var(--concrete)", borderBottom: "1px solid var(--concrete)" }}>
        <div className="container">
          <p className="eyebrow">Who we work with</p>
          <div className="grid grid--3">
            <div>
              <h3>Contractors</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Restoration, repair, remodels, or ground-up builds — whatever
                the scope.
              </p>
            </div>
            <div>
              <h3>Plan &amp; Engineering Firms</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                You handle the drawings. We handle the permit — filing,
                corrections, and follow-up until it&rsquo;s issued.
              </p>
            </div>
            <div>
              <h3>Homeowners Building</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                We&rsquo;ll walk you through what it takes, start to finish.
              </p>
            </div>
          </div>
          <p className="muted" style={{ fontSize: 15, marginTop: 26 }}>
            Don&rsquo;t see your line of work here? If it needs a permit,
            there&rsquo;s a good chance we can help —{" "}
            <Link to="/contact">ask us</Link>.
          </p>
        </div>
      </section>

      {/* Jurisdictions */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Coverage</p>
          <h2>Where we file</h2>
          <p className="lead" style={{ marginBottom: 22 }}>
            Every county runs it differently. We know the differences.
          </p>
          <ul className="tag-list">
            {COUNTIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="muted" style={{ fontSize: 15 }}>
            Southern California is home base. Outside it? Ask — we&rsquo;ll
            tell you straight whether it&rsquo;s a fit.
          </p>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container">
          <h2>Ready to get your permit moving?</h2>
          <p className="lead">
            Tell us your permitting needs, and we&rsquo;ll get started today.
          </p>
          <div className="btn-row">
            <Link to="/start" className="btn btn--primary">
              Start a project
            </Link>
            <Link to="/contact" className="btn btn--onDark">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
