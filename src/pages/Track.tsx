import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import StatusPlacard from "../components/StatusPlacard";
import { findJob } from "../lib/store";
import type { Job } from "../types";

/** Formats input into the LL-#### project number pattern (e.g. RC-4471). */
function formatLocator(raw: string): string {
  const alnum = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let letters = "";
  let digits = "";
  for (const ch of alnum) {
    if (letters.length < 2 && digits.length === 0 && /[A-Z]/.test(ch)) {
      letters += ch;
    } else if (digits.length < 4 && /[0-9]/.test(ch)) {
      digits += ch;
    }
  }
  return letters.length === 2 ? `${letters}-${digits}` : letters;
}

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

  function editLocator(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Backspacing right after the auto-inserted dash (e.g. "RC-" -> "RC")
    // should remove the second letter too, not leave the dash to reappear.
    const deletedAutoDash =
      raw.length < locator.length &&
      locator.endsWith("-") &&
      raw === locator.slice(0, -1);
    setLocator(formatLocator(deletedAutoDash ? raw.slice(0, -1) : raw));
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
            <strong>Something look wrong?</strong> Email us at{" "}
            <a href="mailto:socalpermitrunner@gmail.com">
              socalpermitrunner@gmail.com
            </a>{" "}
            or reply to any email from us. We&rsquo;d rather hear about it
            than have you guess.
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
              onChange={editLocator}
              placeholder="RC-0000"
              autoComplete="off"
              spellCheck={false}
              maxLength={7}
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
              try again, or email us at socalpermitrunner@gmail.com.
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
