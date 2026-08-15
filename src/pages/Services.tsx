import { Link } from "react-router-dom";
import { TIERS } from "../data/seed";

export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Services</p>
        <h1>Pick the version that fits your job</h1>
        <p className="lead" style={{ marginBottom: 34 }}>
          Most people arrive knowing they need &ldquo;permit help&rdquo; and not
          much more. Each option below ends by telling you who it&rsquo;s for, so
          you can sort yourself before you call.
        </p>

        <div className="grid grid--2">
          {TIERS.map((t) => (
            <article className="card card--tier" key={t.slug}>
              <h2 style={{ fontSize: 22 }}>{t.name}</h2>
              <p>{t.pitch}</p>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 8,
                }}
              >
                Includes
              </p>
              <ul>
                {t.includes.map((i) => (
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

        <div className="callout" style={{ marginTop: 34 }}>
          <strong>What we don&rsquo;t do.</strong> We aren&rsquo;t architects or
          engineers, so we don&rsquo;t stamp drawings. When a job needs plans we
          bring in our engineering partner and manage them alongside the permit.
        </div>

        <div className="btn-row">
          <Link to="/start" className="btn btn--primary">
            Start a project
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Not sure which? Ask us
          </Link>
        </div>
      </div>
    </section>
  );
}
