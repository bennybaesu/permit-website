import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusPlacard from "../components/StatusPlacard";
import { BLANK_STAGES } from "../data/seed";
import {
  deleteJob,
  nextLocator,
  resetJobs,
  saveJob,
  useJobs,
} from "../lib/store";
import type { Court, DeptState, Job, Stage, StageState } from "../types";

/**
 * Passphrase comes from VITE_ADMIN_KEY at build time. If it isn't set, this
 * fallback applies. THIS IS NOT SECURITY — the value ships in the JS bundle.
 * It only keeps the page out of the way of casual visitors and search engines.
 * Anything genuinely sensitive has to wait for a real backend.
 */
const KEY = (import.meta.env.VITE_ADMIN_KEY as string | undefined) ?? "permit2026";
const SESSION = "permit-track:admin";

const COURTS: { value: Court; label: string }[] = [
  { value: "you", label: "Waiting on you (client)" },
  { value: "city", label: "Waiting on the agency" },
  { value: "us", label: "We're on it" },
  { value: "done", label: "Complete / issued" },
];

const STAGE_STATES: { value: StageState; label: string }[] = [
  { value: "pending", label: "Not started" },
  { value: "active", label: "In progress" },
  { value: "blocked", label: "Blocked — needs client" },
  { value: "done", label: "Done" },
];

const DEPT_STATES: DeptState[] = ["queued", "review", "comments", "approved"];

function todayStamp(): string {
  const d = new Date();
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function Gate({ onPass }: { onPass: () => void }) {
  const [value, setValue] = useState("");
  const [bad, setBad] = useState(false);

  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">Internal</p>
        <h1>Staff sign in</h1>
        <form
          className="lookup"
          onSubmit={(e) => {
            e.preventDefault();
            if (value === KEY) {
              sessionStorage.setItem(SESSION, "1");
              onPass();
            } else {
              setBad(true);
            }
          }}
        >
          <div className="field">
            <label htmlFor="k">Passphrase</label>
            <input
              id="k"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="btn btn--primary" type="submit">
            Sign in
          </button>
          {bad && <div className="error">That passphrase isn&rsquo;t right.</div>}
        </form>
      </div>
    </section>
  );
}

export default function Admin() {
  const jobs = useJobs();
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION) === "1"
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Job | null>(null);
  const [saved, setSaved] = useState(false);

  // Select the first job once the list is available.
  useEffect(() => {
    if (!selected && jobs.length) setSelected(jobs[0].locator);
  }, [jobs, selected]);

  // Load the selected job into an editable draft.
  useEffect(() => {
    const j = jobs.find((x) => x.locator === selected);
    setDraft(j ? structuredClone(j) : null);
    setSaved(false);
  }, [selected, jobs]);

  const preview = useMemo(() => draft, [draft]);

  if (!authed) return <Gate onPass={() => setAuthed(true)} />;

  function patch(fields: Partial<Job>) {
    setDraft((d) => (d ? { ...d, ...fields } : d));
    setSaved(false);
  }

  function patchStage(i: number, fields: Partial<Stage>) {
    setDraft((d) => {
      if (!d) return d;
      const stages = d.stages.map((s, n) => (n === i ? { ...s, ...fields } : s));
      return { ...d, stages };
    });
    setSaved(false);
  }

  function patchDept(si: number, di: number, state: DeptState) {
    setDraft((d) => {
      if (!d) return d;
      const stages = d.stages.map((s, n) => {
        if (n !== si || !s.departments) return s;
        const departments = s.departments.map((dep, m) =>
          m === di ? { ...dep, state } : dep
        );
        return { ...s, departments };
      });
      return { ...d, stages };
    });
    setSaved(false);
  }

  function commit() {
    if (!draft) return;
    const job: Job = {
      ...draft,
      locator: draft.locator.trim().toUpperCase(),
      lastUpdated: todayStamp(),
      verifiers: draft.verifiers
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean),
    };
    saveJob(job);
    setSelected(job.locator);
    setSaved(true);
  }

  function createJob() {
    const loc = nextLocator();
    const job: Job = {
      locator: loc,
      verifiers: ["newclient"],
      clientName: "New client",
      projectType: "Describe the scope",
      jurisdiction: "City of ",
      jurisdictionSlug: "corona",
      filedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      court: "us",
      courtHeadline: "We've opened your job.",
      courtNote: "We're confirming the jurisdiction and what it will require.",
      lastUpdated: todayStamp(),
      stages: BLANK_STAGES(),
    };
    saveJob(job);
    setSelected(loc);
  }

  return (
    <>
      <div className="admin-bar">
        <span>Permit Track — staff console</span>
        <span className="spacer" />
        <button
          className="btn--link"
          style={{ color: "#d96f4c" }}
          onClick={createJob}
        >
          + New job
        </button>
        <button
          className="btn--link"
          style={{ color: "#fcfcfa" }}
          onClick={() => {
            if (confirm("Reset all jobs back to the demo data?")) {
              resetJobs();
              setSelected(null);
            }
          }}
        >
          Reset demo data
        </button>
        <button
          className="btn--link"
          style={{ color: "#fcfcfa" }}
          onClick={() => {
            sessionStorage.removeItem(SESSION);
            setAuthed(false);
          }}
        >
          Sign out
        </button>
      </div>

      <section className="section section--tight">
        <div className="container">
          <div className="warnbox">
            <strong>Phase 1 storage.</strong> Jobs are saved in this
            browser&rsquo;s local storage. Edits here are visible on this machine
            only — they will not reach a client on a different device. That is
            expected for launch. When you&rsquo;re ready, replace the four
            functions in <code>src/lib/store.ts</code> with API calls and the
            rest of the app keeps working unchanged.
          </div>

          <div className="admin-grid">
            {/* Job list */}
            <div className="joblist">
              {jobs.map((j) => (
                <button
                  key={j.locator}
                  className={j.locator === selected ? "selected" : ""}
                  onClick={() => setSelected(j.locator)}
                >
                  <span className="jl-loc">{j.locator}</span>
                  <span className="jl-meta">
                    {j.clientName} — {j.jurisdiction}
                  </span>
                </button>
              ))}
              {jobs.length === 0 && (
                <p style={{ padding: 16, margin: 0 }} className="muted">
                  No jobs yet. Use “New job” above.
                </p>
              )}
            </div>

            {/* Editor */}
            {draft ? (
              <div className="editor">
                {saved && (
                  <div className="saved">
                    Saved. The public tracker now shows this.{" "}
                    <Link to={`/track?id=${draft.locator}`}>
                      Open the client view →
                    </Link>
                  </div>
                )}

                <h3>Job details</h3>
                <div className="row">
                  <div className="field">
                    <label htmlFor="loc">Project number</label>
                    <input
                      id="loc"
                      value={draft.locator}
                      onChange={(e) => patch({ locator: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cn">Client name</label>
                    <input
                      id="cn"
                      value={draft.clientName}
                      onChange={(e) => patch({ clientName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="vf">
                    Lookup answers (comma separated, lowercase)
                  </label>
                  <input
                    id="vf"
                    value={draft.verifiers.join(", ")}
                    onChange={(e) =>
                      patch({ verifiers: e.target.value.split(",") })
                    }
                  />
                  <p className="hint">
                    Any of these will unlock the job alongside the project
                    number. Usually the last name and the street address.
                  </p>
                </div>

                <div className="row">
                  <div className="field">
                    <label htmlFor="pt">Project type</label>
                    <input
                      id="pt"
                      value={draft.projectType}
                      onChange={(e) => patch({ projectType: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="ju">Jurisdiction</label>
                    <input
                      id="ju"
                      value={draft.jurisdiction}
                      onChange={(e) => patch({ jurisdiction: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label htmlFor="fo">Filed on</label>
                    <input
                      id="fo"
                      value={draft.filedOn}
                      onChange={(e) => patch({ filedOn: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="pn">Permit number (once issued)</label>
                    <input
                      id="pn"
                      value={draft.permitNumber ?? ""}
                      onChange={(e) =>
                        patch({ permitNumber: e.target.value || undefined })
                      }
                    />
                  </div>
                </div>

                <h3>Ball in court</h3>
                <div className="field">
                  <label htmlFor="ct">Who is everyone waiting on?</label>
                  <select
                    id="ct"
                    value={draft.court}
                    onChange={(e) => patch({ court: e.target.value as Court })}
                  >
                    {COURTS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="ch">Headline</label>
                  <input
                    id="ch"
                    value={draft.courtHeadline}
                    onChange={(e) => patch({ courtHeadline: e.target.value })}
                  />
                  <p className="hint">
                    One plain sentence. &ldquo;City of Corona has your
                    plans.&rdquo;
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="cno">Detail</label>
                  <textarea
                    id="cno"
                    value={draft.courtNote}
                    onChange={(e) => patch({ courtNote: e.target.value })}
                  />
                  <p className="hint">
                    If you&rsquo;re waiting on the client, name the document and
                    the date it&rsquo;s due.
                  </p>
                </div>

                <h3>Stages</h3>
                {draft.stages.map((st, i) => (
                  <div className="editor__stage" key={st.key}>
                    <strong style={{ fontFamily: "var(--display)" }}>
                      {i + 1}. {st.title}
                    </strong>
                    <div className="row" style={{ marginTop: 10 }}>
                      <div className="field">
                        <label htmlFor={`s-${st.key}`}>Status</label>
                        <select
                          id={`s-${st.key}`}
                          value={st.state}
                          onChange={(e) =>
                            patchStage(i, {
                              state: e.target.value as StageState,
                            })
                          }
                        >
                          {STAGE_STATES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`d-${st.key}`}>Completed on</label>
                        <input
                          id={`d-${st.key}`}
                          value={st.completedOn ?? ""}
                          placeholder="Jul 22, 2026"
                          onChange={(e) =>
                            patchStage(i, {
                              completedOn: e.target.value || undefined,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor={`t-${st.key}`}>
                        What the client sees
                      </label>
                      <textarea
                        id={`t-${st.key}`}
                        value={st.detail}
                        onChange={(e) => patchStage(i, { detail: e.target.value })}
                      />
                    </div>

                    {st.departments && (
                      <div className="stack">
                        <label>Departments reviewing in parallel</label>
                        {st.departments.map((dep, di) => (
                          <div
                            key={dep.name}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 160px",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: 14.5 }}>{dep.name}</span>
                            <select
                              aria-label={`${dep.name} status`}
                              value={dep.state}
                              onChange={(e) =>
                                patchDept(i, di, e.target.value as DeptState)
                              }
                            >
                              {DEPT_STATES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}

                    {st.key === "corrections" && (
                      <div className="row" style={{ marginTop: 12 }}>
                        <div className="field">
                          <label htmlFor={`cr-${st.key}`}>
                            Correction round
                          </label>
                          <input
                            id={`cr-${st.key}`}
                            type="number"
                            min={0}
                            value={st.correctionRound ?? 0}
                            onChange={(e) =>
                              patchStage(i, {
                                correctionRound: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="field">
                          <label htmlFor={`cnote-${st.key}`}>Round note</label>
                          <input
                            id={`cnote-${st.key}`}
                            value={st.correctionNote ?? ""}
                            onChange={(e) =>
                              patchStage(i, {
                                correctionNote: e.target.value || undefined,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="btn-row">
                  <button className="btn btn--primary" onClick={commit}>
                    Save changes
                  </button>
                  <Link
                    to={`/track?id=${draft.locator}`}
                    className="btn btn--ghost"
                  >
                    Open client view
                  </Link>
                  <button
                    className="btn btn--ghost"
                    onClick={() => {
                      if (confirm(`Delete ${draft.locator}?`)) {
                        deleteJob(draft.locator);
                        setSelected(null);
                      }
                    }}
                  >
                    Delete job
                  </button>
                </div>
              </div>
            ) : (
              <div className="editor">
                <p className="muted">Select a job on the left, or create one.</p>
              </div>
            )}
          </div>

          {/* Live preview */}
          {preview && (
            <div style={{ marginTop: 46 }}>
              <p className="eyebrow">Live preview — what the client sees</p>
              <div style={{ maxWidth: 720 }}>
                <StatusPlacard job={preview} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
