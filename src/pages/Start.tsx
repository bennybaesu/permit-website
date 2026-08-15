import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { JURISDICTIONS } from "../data/seed";

type Path = null | "pro" | "owner";

export default function Start() {
  const [path, setPath] = useState<Path>(null);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    // Phase 1: no backend. Wire this to Netlify Forms or your inbox before launch.
    setSent(true);
    window.scrollTo(0, 0);
  }

  if (sent) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <div className="saved">
            Thanks — that&rsquo;s everything we need to get started.
          </div>
          <h1>We&rsquo;ll confirm the jurisdiction and get back to you</h1>
          <p className="lead">
            Usually same day. You&rsquo;ll get a project number by email, and you
            can check status any time without an account.
          </p>
          <div className="callout">
            <strong>Developer note:</strong> this form doesn&rsquo;t submit
            anywhere yet. Add <code>data-netlify=&quot;true&quot;</code> to the
            form element, or point it at your own endpoint, before you take real
            work through it.
          </div>
          <Link to="/" className="btn btn--ghost">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  if (!path) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">Start a project</p>
          <h1>First — who&rsquo;s pulling this permit?</h1>
          <p className="lead" style={{ marginBottom: 30 }}>
            The two paths need different documents, so we split them here
            instead of making you scroll past questions that don&rsquo;t apply.
          </p>

          <div className="grid grid--2">
            <article className="card card--tier">
              <h3>Licensed professional</h3>
              <p style={{ fontSize: 15 }}>
                A contractor, architect, engineer or plans firm pulling under a
                license.
              </p>
              <ul>
                <li>CSLB license number and classification</li>
                <li>Workers&rsquo; comp certificate</li>
                <li>Business license for the jurisdiction</li>
              </ul>
              <button
                className="btn btn--primary"
                onClick={() => setPath("pro")}
              >
                Continue as a professional
              </button>
            </article>

            <article className="card card--tier">
              <h3>Owner&ndash;builder</h3>
              <p style={{ fontSize: 15 }}>
                A property owner pulling the permit in their own name.
              </p>
              <ul>
                <li>Proof of ownership</li>
                <li>Owner&ndash;builder declaration</li>
                <li>Notarized authorization for us to act as your agent</li>
              </ul>
              <button
                className="btn btn--primary"
                onClick={() => setPath("owner")}
              >
                Continue as an owner
              </button>
            </article>
          </div>
        </div>
      </section>
    );
  }

  const pro = path === "pro";

  return (
    <section className="section">
      <div className="container container--narrow">
        <button className="btn--link" onClick={() => setPath(null)}>
          ← Change path
        </button>
        <h1 style={{ marginTop: 14 }}>
          {pro ? "Licensed professional" : "Owner–builder"} intake
        </h1>
        <p className="lead" style={{ marginBottom: 28 }}>
          Everything the jurisdiction will ask for, collected once, so we
          don&rsquo;t come back to you mid-review.
        </p>

        <form className="lookup" onSubmit={submit}>
          <h3>Project</h3>
          <div className="field">
            <label htmlFor="addr">Property address</label>
            <input id="addr" required placeholder="Street address" />
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" required />
            </div>
            <div className="field">
              <label htmlFor="zip">ZIP</label>
              <input id="zip" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="jur">Jurisdiction (if you know it)</label>
            <select id="jur" defaultValue="">
              <option value="">Not sure — confirm for me</option>
              {JURISDICTIONS.map((j) => (
                <option key={j.slug} value={j.slug}>
                  {j.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="scope">Scope of work</label>
            <textarea
              id="scope"
              required
              placeholder="Replace fire-damaged roof structure and rebuild rear bedroom to original footprint."
            />
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="val">Estimated job value</label>
              <input id="val" placeholder="$" />
            </div>
            <div className="field">
              <label htmlFor="plans">Do you have stamped plans?</label>
              <select id="plans" defaultValue="no">
                <option value="yes">Yes, ready to submit</option>
                <option value="progress">In progress</option>
                <option value="no">No, we need drawings</option>
              </select>
            </div>
          </div>

          <h3 style={{ marginTop: 26 }}>
            {pro ? "License information" : "Ownership"}
          </h3>
          {pro ? (
            <>
              <div className="row">
                <div className="field">
                  <label htmlFor="cslb">CSLB license number</label>
                  <input id="cslb" required />
                </div>
                <div className="field">
                  <label htmlFor="class">Classification</label>
                  <input id="class" placeholder="B, C-39, etc." />
                </div>
              </div>
              <div className="field">
                <label htmlFor="wc">Workers&rsquo; comp policy number</label>
                <input id="wc" />
              </div>
            </>
          ) : (
            <>
              <div className="field">
                <label htmlFor="own">Name as it appears on title</label>
                <input id="own" required />
              </div>
              <div className="field">
                <label htmlFor="occ">Is this your primary residence?</label>
                <select id="occ" defaultValue="yes">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </>
          )}

          <h3 style={{ marginTop: 26 }}>Contact</h3>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" required />
            </div>
            <div className="field">
              <label htmlFor="co">Company</label>
              <input id="co" />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" required />
            </div>
          </div>

          <div className="field">
            <label
              htmlFor="sms"
              style={{ display: "flex", gap: 10, textTransform: "none", letterSpacing: 0, fontSize: 14, fontFamily: "var(--body)" }}
            >
              <input
                id="sms"
                type="checkbox"
                style={{ width: "auto", marginTop: 3 }}
              />
              <span>
                Text me updates about this project. You agree to receive text
                messages about your project, including status updates and
                document requests. Consent is not required to use our services.
                Message frequency varies; message and data rates may apply.
                Reply STOP to unsubscribe.
              </span>
            </label>
          </div>

          <button type="submit" className="btn btn--primary">
            Submit project
          </button>
        </form>
      </div>
    </section>
  );
}
