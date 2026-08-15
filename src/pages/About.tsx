import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">About</p>
        <h1>A permit desk you don&rsquo;t have to staff</h1>
        <p className="lead">
          We started doing permits as a service inside a family engineering
          practice — fire rebuilds, repair work, additions for small contractors
          who didn&rsquo;t have anyone to send to the counter. We do the same
          thing now for anyone who needs it.
        </p>
        <h2 style={{ marginTop: 30 }}>How we work</h2>
        <p>
          Two people, deliberately. You get the same person on every job, who
          already knows what your city asked for last time. We&rsquo;d rather be
          the best in eight jurisdictions than mediocre in fifty.
        </p>
        <h2 style={{ marginTop: 24 }}>What we don&rsquo;t do</h2>
        <p>
          We don&rsquo;t stamp drawings — that takes a licensed architect or
          engineer, and we bring ours in when a job needs it. We file, we track,
          we respond to corrections, and we tell you the truth about timelines.
        </p>
        <div className="callout">
          <strong>Replace this page.</strong> Put your real names, a photo, and
          the actual number of jobs filed here. In a two-person business, the
          people are the pitch.
        </div>
        <div className="btn-row">
          <Link to="/start" className="btn btn--primary">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
