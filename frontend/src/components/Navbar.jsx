import { useState } from "react"
import {
  IconHome,
  IconTarget,
  IconMonitor,
  IconWorkstreams,
  IconChart,
  IconCalendar,
  IconPeople,
  IconMore,
  IconDocument,
  IconSearch,
} from "./Icons.jsx"
import "./Navbar.css"

// Elementos del menu superior. "Policies" reemplaza a "Documents & Utilities".
const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: IconHome },
  { id: "excellence", label: "3Q6S Excellence", Icon: IconTarget },
  { id: "digitalization", label: "Digitalization", Icon: IconMonitor },
  { id: "workstreams", label: "Workstreams", Icon: IconWorkstreams },
  { id: "indicators", label: "Indicators", Icon: IconChart },
  { id: "meetings", label: "Meetings", Icon: IconCalendar },
  { id: "people", label: "People", Icon: IconPeople },
  { id: "policies", label: "Policies", Icon: IconDocument },
  { id: "more", label: "More", Icon: IconMore },
]

export default function Navbar({ activeTab, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (id) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <button className="brand" onClick={() => go("home")} aria-label="Ir al inicio del portal">
          <img src="/nidec-acim-logo.png" alt="Nidec ACIM" className="brand-logo" />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-title">GA COLD Mexico</span>
            <span className="brand-sub">Portal</span>
          </span>
        </button>

        <nav className="nav-links" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-link ${activeTab === id ? "is-active" : ""}`}
              onClick={() => go(id)}
              aria-current={activeTab === id ? "page" : undefined}
            >
              <span className="nav-link-icon">
                <Icon size={20} />
              </span>
              <span className="nav-link-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Buscar en el portal">
            <IconSearch size={20} />
          </button>
          <button
            className="menu-toggle"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Navegación móvil">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`mobile-link ${activeTab === id ? "is-active" : ""}`}
              onClick={() => go(id)}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
