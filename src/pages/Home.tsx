import { Link } from "react-router-dom";
import { JURISDICTIONS, TIERS } from "../data/seed";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Riverside &amp; Orange County</p>
            <h1>
              We pull the permits so your crews aren&rsquo;t sitting idle.
            </h1>
            <p className="lead">
              Permit filing, plan check corrections and agency follow-up for
              contractors, plans firms and homeowners. You always know where
              your job stands and who&rsquo;s holding it up.
            </p>
            <div className="btn-row">
              <Link to="/start" className="btn btn--primary">
                Start a project
              </Link>
              <Link to="/track" className="btn btn--ghost">
                Track a project
              </Link>
            </div>
            <p className="hint" style={{ marginTop: 18 }}>
              Or call <strong>(951) 555‑0140</strong> — we answer.
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
          <h2>You&rsquo;ll never wonder whose fault the delay is.</h2>
          <p className="lead">
            Most permitting goes quiet for weeks and everyone assumes the worst.
            Every job we run shows one of three things at any moment: waiting on
            you, waiting on the agency, or we&rsquo;re on it — with dates
            attached.
          </p>
          <div className="grid grid--3" style={{ marginTop: 30 }}>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#d96f4c" }}>Waiting on you</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                The exact document we need and the date we need it by. No vague
                &ldquo;pending client.&rdquo;
              </p>
            </div>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#7fb2d1" }}>Waiting on the agency</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                Which department, how many days elapsed, and what that
                jurisdiction typically takes.
              </p>
            </div>
            <div className="card card--flat" style={{ borderColor: "#3a4548" }}>
              <h3 style={{ color: "#789783" }}>We&rsquo;re on it</h3>
              <p style={{ color: "rgba(252,252,250,.75)", margin: 0 }}>
                What we&rsquo;re actively doing, timestamped. Silence is what
                makes people assume you&rsquo;ve dropped the ball.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier ladder */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h2>Four ways to work with us</h2>
          <p className="lead" style={{ marginBottom: 30 }}>
            Each one ends by telling you whether it&rsquo;s the right fit, so you
            don&rsquo;t have to call to find out.
          </p>
          <div className="grid grid--4">
            {TIERS.map((t) => (
              <article className="card card--tier" key={t.slug}>
                <h3>{t.name}</h3>
                <p style={{ fontSize: 14.5 }}>{t.pitch}</p>
                <ul>
                  {t.includes.slice(0, 4).map((i) => (
                    <li key={i}>{i}</li>
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
              <h3>Restoration &amp; repair contractors</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Fire, water and structural repair work where the claim clock is
                already running.
              </p>
            </div>
            <div>
              <h3>Plans &amp; engineering firms</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                You draw it, we file it. White-label permitting so you never
                staff a permit desk.
              </p>
            </div>
            <div>
              <h3>Homeowners rebuilding</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                One person who speaks the city&rsquo;s language and explains
                yours back to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jurisdictions */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Coverage</p>
          <h2>Where we file</h2>
          <p className="lead" style={{ marginBottom: 22 }}>
            We keep a working file on every jurisdiction we submit to — which
            portal, which forms, which reviewer quirks, what it actually takes.
          </p>
          <ul className="tag-list">
            {JURISDICTIONS.map((j) => (
              <li key={j.slug}>
                <Link to={`/jurisdictions/${j.slug}`} style={{ textDecoration: "none" }}>
                  {j.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/jurisdictions" className="btn btn--ghost">
            See all jurisdictions
          </Link>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container">
          <h2>Ready to hand one off?</h2>
          <p className="lead">
            Tell us the address and scope. We&rsquo;ll confirm the jurisdiction
            and what it takes, usually same day.
          </p>
          <div className="btn-row">
            <Link to="/start" className="btn btn--primary">
              Start a project
            </Link>
            <Link to="/contact" className="btn btn--onDark">
              Ask a question first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
