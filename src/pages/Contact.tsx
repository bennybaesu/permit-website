import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">Contact</p>
        <h1>Talk to a person</h1>
        <p className="lead" style={{ marginBottom: 28 }}>
          Call for anything urgent. We answer during business hours and return
          voicemails the same day.
        </p>

        <dl className="spec">
          <div className="spec__row">
            <dt>Phone</dt>
            <dd>(951) 555&ndash;0140</dd>
          </div>
          <div className="spec__row">
            <dt>Email</dt>
            <dd>jobs@example.com</dd>
          </div>
          <div className="spec__row">
            <dt>Hours</dt>
            <dd>Monday&ndash;Friday, 7:00 AM &ndash; 5:00 PM Pacific</dd>
          </div>
          <div className="spec__row">
            <dt>Service area</dt>
            <dd>Riverside and Orange County</dd>
          </div>
        </dl>

        <div className="btn-row">
          <Link to="/start" className="btn btn--primary">
            Start a project
          </Link>
          <Link to="/track" className="btn btn--ghost">
            Track a project
          </Link>
        </div>
      </div>
    </section>
  );
}
