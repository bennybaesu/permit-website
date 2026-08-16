import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">Contact</p>
        <h1>Talk to a person</h1>
        <p className="lead" style={{ marginBottom: 28 }}>
          Email for anything, urgent or not. We answer during business hours
          and reply the same day.
        </p>

        <dl className="spec">
          <div className="spec__row">
            <dt>Email</dt>
            <dd>
              <a href="mailto:socalpermitrunner@gmail.com">
                socalpermitrunner@gmail.com
              </a>
            </dd>
          </div>
          <div className="spec__row">
            <dt>Hours</dt>
            <dd>Monday&ndash;Friday, 7:00 AM &ndash; 5:00 PM Pacific</dd>
          </div>
          <div className="spec__row">
            <dt>Service area</dt>
            <dd>Southern California</dd>
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
