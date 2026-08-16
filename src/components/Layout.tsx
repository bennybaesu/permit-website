import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/jurisdictions", label: "Where we file" },
  { to: "/process", label: "How permitting works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  // Collapse the mobile menu whenever the route changes.
  const close = () => setOpen(false);

  return (
    <header className={open ? "nav open" : "nav"}>
      <div className="nav__inner">
        <Link to="/" className="brand" onClick={close}>
          SOCAL<span>·</span>PERMIT
        </Link>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={close}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__cta">
          <Link
            to="/track"
            onClick={close}
            className={
              loc.pathname === "/track"
                ? "btn btn--blue btn--sm"
                : "btn btn--ghost btn--sm"
            }
          >
            Track a project
          </Link>
          <Link to="/start" onClick={close} className="btn btn--primary btn--sm">
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h4>SoCal Permit Service</h4>
            <p style={{ margin: 0 }}>
              Building permit expediting for contractors, plans firms and
              homeowners across Southern California.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/services">All services</Link>
              </li>
              <li>
                <Link to="/services">Permit project management</Link>
              </li>
              <li>
                <Link to="/services">Insurance restoration</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Where we file</h4>
            <ul>
              <li>
                <Link to="/jurisdictions/corona">Corona</Link>
              </li>
              <li>
                <Link to="/jurisdictions/riverside-county">
                  Riverside County
                </Link>
              </li>
              <li>
                <Link to="/jurisdictions">See all jurisdictions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Clients</h4>
            <ul>
              <li>
                <Link to="/track">Track a project</Link>
              </li>
              <li>
                <Link to="/start">Start a project</Link>
              </li>
              <li>
                <Link to="/process">How permitting works</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          © {new Date().getFullYear()} SoCal Permit Service. Demo site —
          legal pages still needed before going live.
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="shell">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
