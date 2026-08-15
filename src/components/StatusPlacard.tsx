import type { Court, DeptState, Job, StageState } from "../types";

const COURT_TAG: Record<Court, string> = {
  you: "Waiting on you",
  city: "Waiting on the agency",
  us: "We're on it",
  done: "Complete",
};

const DEPT_LABEL: Record<DeptState, string> = {
  approved: "Approved",
  review: "In review",
  comments: "Comments",
  queued: "Queued",
};

function box(state: StageState) {
  const cls = `stage__box stage__box--${state}`;
  return <div className={cls} aria-hidden="true">{state === "done" ? "✓" : ""}</div>;
}

export default function StatusPlacard({ job }: { job: Job }) {
  return (
    <div className="placard">
      <div className="placard__perf" />

      {job.court === "done" && <div className="stamp">ISSUED</div>}

      <div className="placard__head">
        <div className="placard__locLabel">Project number</div>
        <div className="placard__loc">{job.locator}</div>
        <div className="placard__meta">
          <strong>{job.projectType}</strong>
          {job.jurisdiction}
          {job.permitNumber
            ? ` · Permit #${job.permitNumber}`
            : ` · Filed ${job.filedOn}`}
        </div>
      </div>

      <div className={`court court--${job.court}`}>
        <div className="court__tag">{COURT_TAG[job.court]}</div>
        <p className="court__line">{job.courtHeadline}</p>
        <p className="court__note">{job.courtNote}</p>
      </div>

      <div className="rail">
        {job.stages.map((st, i) => (
          <div
            key={st.key}
            className={`stage${st.state === "pending" ? " stage--pending" : ""}`}
          >
            {box(st.state)}
            <div className="stage__body">
              <div className="stage__n">Stage {i + 1}</div>
              <div className="stage__title">{st.title}</div>
              <p className="stage__detail">{st.detail}</p>

              {st.state === "done" && st.completedOn && (
                <p className="stage__date">✓ {st.completedOn}</p>
              )}

              {st.departments && st.departments.length > 0 && (
                <div className="depts">
                  {st.departments.map((d) => (
                    <div className="dept" key={d.name}>
                      <span>{d.name}</span>
                      <span className={`pill pill--${d.state}`}>
                        {DEPT_LABEL[d.state]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {typeof st.correctionRound === "number" &&
                st.correctionRound > 0 &&
                st.state !== "pending" && (
                  <div className="loop">
                    <div className="loop__h">
                      Correction round {st.correctionRound}
                    </div>
                    {st.correctionNote && <p>{st.correctionNote}</p>}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="placard__foot">
        Last updated {job.lastUpdated} · Questions? Call (951) 555‑0140
      </div>
    </div>
  );
}
