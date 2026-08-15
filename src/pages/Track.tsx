import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import StatusPlacard from "../components/StatusPlacard";
import { findJob } from "../lib/store";
import type { Job } from "../types";

export default function Track() {
  const [params, setParams] = useSearchParams();
  const [locator, setLocator] = useState(params.get("id") ?? "");
  const [verifier, setVerifier] = useState("");
  const [job, setJob] = useState<Job | null>(null);
  const [failed, setFailed] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = findJob(locator, verifier);
    if (found) {
      setJob(found);
      setFailed(false);
      setParams({ id: found.locator });
      window.scrollTo(0, 0);
    } else {
      setJob(null);
      setFailed(true);
    }
  }

  function reset() {
    setJob(null);
    setFailed(false);
    setLocator("");
    setVerifier("");
    setParams({});
    window.scrollTo(0, 0);
  }

  if (job) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <StatusPlacard job={job} />
          <div style={{ marginTop: 20 }}>
            <button className="btn--link" onClick={reset}>
              ← Look up another project
            </button>
          </div>
          <div className="callout">
            <strong>Something look wrong?</strong> Call (951) 555‑0140 or reply
            to any email from us. We&rsquo;d rather hear about it than have you
            guess.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container container--narrow">
        <p className="eyebrow">Project status</p>
        <h1>Where is my permit right now?</h1>
        <p className="lead" style={{ marginBottom: 30 }}>
          Enter the project number from your confirmation plus the last name on
          the job. No account needed — forward it to whoever needs it.
        </p>

        <form className="lookup" onSubmit={submit}>
          <div className="field">
            <label htmlFor="locator">Project number</label>
            <input
              id="locator"
              className="locator-input"
              value={locator}
              onChange={(e) => setLocator(e.target.value)}
              placeholder="RC-0000"
              autoComplete="off"
              spellCheck={false}
              maxLength={10}
            />
            <p className="hint">
              Two letters, four digits. It&rsquo;s on every email we send.
            </p>
          </div>

          <div className="field">
            <label htmlFor="verifier">Last name on the job</label>
            <input
              id="verifier"
              value={verifier}
              onChange={(e) => setVerifier(e.target.value)}
              placeholder="Surname"
              autoComplete="off"
            />
            <p className="hint">The property street address works too.</p>
          </div>

          <button type="submit" className="btn btn--primary">
            Check status
          </button>

          {failed && (
            <div className="error">
              That combination doesn&rsquo;t match a job. Check the number and
              try again, or call us at (951) 555‑0140.
            </div>
          )}

          <div className="demo-keys">
            <p>
              <strong>Demo projects to try:</strong>
            </p>
            <p>
              <code>RC-4471</code> + <code>Delgado</code> — sitting in plan check
            </p>
            <p>
              <code>RC-4390</code> + <code>Whitfield</code> — needs something
              from the client
            </p>
            <p>
              <code>RC-4102</code> + <code>Serrano</code> — permit issued
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
