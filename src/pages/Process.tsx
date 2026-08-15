import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    t: "Intake",
    d: "We confirm the jurisdiction from the parcel, not the mailing address. Being inside city limits doesn't always mean the city issues the permit.",
  },
  {
    n: "02",
    t: "Information",
    d: "We collect everything the jurisdiction will ask for up front — owner authorization, contractor license, scope letter — so we're not chasing you mid-review.",
  },
  {
    n: "03",
    t: "Submittal",
    d: "The package goes in checked against that jurisdiction's own list. Most delays start here, with an incomplete application that gets bounced before review even begins.",
  },
  {
    n: "04",
    t: "Plan check",
    d: "Departments review in parallel, not in sequence. Building, fire, planning and public works each have their own queue and finish at different times. One of them is usually the reason a job looks stalled.",
  },
  {
    n: "05",
    t: "Corrections",
    d: "The agency returns comments. We respond and resubmit, which restarts the review clock. Two rounds is normal. Four happens. This is the part nobody warns you about.",
  },
  {
    n: "06",
    t: "Issuance",
    d: "Fees are paid, clearances close out, and the permit card is released to the job site.",
  },
];

export default function Process() {
  return (
    <>
      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">Plain English</p>
          <h1>How permitting actually works</h1>
          <p className="lead">
            Most permit companies sell speed and leave the mechanics vague. Here
            is the real sequence, including the part that goes backwards.
          </p>
        </div>
      </section>

      <section className="section section--tight" style={{ background: "#fcfcfa", borderTop: "1px solid var(--concrete)", borderBottom: "1px solid var(--concrete)" }}>
        <div className="container container--narrow">
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: "58px 1fr",
                gap: 18,
                padding: "22px 0",
                borderBottom: "1px solid var(--concrete)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--terracotta)",
                }}
              >
                {s.n}
              </div>
              <div>
                <h3 style={{ marginBottom: 5 }}>{s.t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15 }}>
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2>Why your job can go backwards</h2>
          <p>
            A flight never un-lands. A permit does. Every correction round sends
            the job back into review with a fresh clock, and a job that&rsquo;s
            been in plan check for sixty days may have been in three separate
            queues in that time.
          </p>
          <p>
            That&rsquo;s exactly why our tracker counts the rounds out loud and
            names the department holding things up, instead of showing you a
            progress bar that only ever moves one direction.
          </p>
          <div className="btn-row">
            <Link to="/track" className="btn btn--blue">
              See a live example
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
