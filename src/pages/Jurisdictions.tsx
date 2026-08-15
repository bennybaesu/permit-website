import { Link } from "react-router-dom";
import { JURISDICTIONS } from "../data/seed";

export default function Jurisdictions() {
  const counties = Array.from(new Set(JURISDICTIONS.map((j) => j.county)));

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Coverage</p>
        <h1>Where we file</h1>
        <p className="lead" style={{ marginBottom: 30 }}>
          Every jurisdiction runs its own process. These are the ones we submit
          to regularly and keep a working file on. Don&rsquo;t see yours? Ask —
          we add jurisdictions as jobs come in.
        </p>

        {counties.map((county) => (
          <div key={county} style={{ marginBottom: 34 }}>
            <h2 style={{ fontSize: 22 }}>{county}</h2>
            <table className="jtable">
              <thead>
                <tr>
                  <th>Jurisdiction</th>
                  <th>Permits issued by</th>
                  <th>Typical first review</th>
                </tr>
              </thead>
              <tbody>
                {JURISDICTIONS.filter((j) => j.county === county).map((j) => (
                  <tr key={j.slug}>
                    <td>
                      <Link to={`/jurisdictions/${j.slug}`}>{j.name}</Link>
                    </td>
                    <td>{j.issuedBy}</td>
                    <td>{j.typicalTurnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="callout">
          <strong>Being inside a city doesn&rsquo;t always mean the city
          issues the permit.</strong>{" "}
          Some cities contract building and safety out to the county or to a
          third-party firm. We check the parcel before we file, every time.
        </div>
      </div>
    </section>
  );
}
