import { Link, useParams } from "react-router-dom";
import { JURISDICTIONS } from "../data/seed";

export default function JurisdictionDetail() {
  const { slug } = useParams();
  const j = JURISDICTIONS.find((x) => x.slug === slug);

  if (!j) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <h1>We don&rsquo;t have a page for that one yet</h1>
          <p className="lead">
            It may still be somewhere we file. Ask us and we&rsquo;ll confirm.
          </p>
          <Link to="/jurisdictions" className="btn btn--ghost">
            See all jurisdictions
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">{j.county}</p>
        <h1>Permits in {j.name}</h1>
        <p className="lead" style={{ marginBottom: 28 }}>
          What it actually takes to get a permit issued here, based on the jobs
          we&rsquo;ve filed.
        </p>

        <dl className="spec">
          <div className="spec__row">
            <dt>Permits issued by</dt>
            <dd>{j.issuedBy}</dd>
          </div>
          <div className="spec__row">
            <dt>Submittal</dt>
            <dd>
              {j.portal}
              {j.eSubmittal
                ? " — electronic submittal accepted"
                : " — paper submittal required"}
            </dd>
          </div>
          <div className="spec__row">
            <dt>Fire review</dt>
            <dd>{j.fireAuthority} — separate review, separate clock</dd>
          </div>
          <div className="spec__row">
            <dt>Typical first review</dt>
            <dd>{j.typicalTurnaround}</dd>
          </div>
        </dl>

        {j.notes.length > 0 && (
          <>
            <h2 style={{ fontSize: 22, marginTop: 34 }}>Worth knowing</h2>
            <ul>
              {j.notes.map((n) => (
                <li key={n} style={{ marginBottom: 6 }}>
                  {n}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="btn-row">
          <Link to="/start" className="btn btn--primary">
            Start a project in {j.name}
          </Link>
          <Link to="/jurisdictions" className="btn btn--ghost">
            All jurisdictions
          </Link>
        </div>
      </div>
    </section>
  );
}
