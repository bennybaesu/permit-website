import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">404</p>
        <h1>That page isn&rsquo;t here</h1>
        <p className="lead">
          Looking for a project status? You&rsquo;ll need the project number and
          the last name on the job.
        </p>
        <div className="btn-row">
          <Link to="/track" className="btn btn--primary">
            Track a project
          </Link>
          <Link to="/" className="btn btn--ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
