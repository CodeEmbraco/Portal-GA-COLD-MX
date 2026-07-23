import {
  IconTarget,
  IconMonitor,
  IconWorkstreams,
  IconChart,
  IconPeople,
  IconDocument,
  IconClipboard,
  IconBook,
  IconShield,
  IconChevron,
} from "./Icons.jsx"
import "./Home.css"

// Accesos principales del portal. "Policies" sustituye a "Documents & Utilities".
const ACCESS_CARDS = [
  { id: "excellence", title: "3Q6S Excellence", Icon: IconTarget },
  { id: "digitalization", title: "Digitalization", Icon: IconMonitor },
  { id: "workstreams", title: "Workstreams", Icon: IconWorkstreams },
  { id: "indicators", title: "Indicators", Icon: IconChart },
  { id: "people", title: "People", Icon: IconPeople },
  { id: "policies", title: "Policies", Icon: IconDocument, highlight: true },
]

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title text-balance">
            GA COLD MEXICO
            <br />
            ADMINISTRATIVE PORTAL
          </h1>
          <span className="hero-rule" aria-hidden="true" />
          <p className="hero-desc text-pretty">
            Punto único de acceso para el equipo administrativo de GA COLD Mexico: personas,
            indicadores, workstreams y la gestión centralizada de políticas y procedimientos.
          </p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-dots" />
          <div className="hero-shield">
            <IconShield size={64} />
          </div>
        </div>
      </section>

      {/* Tarjetas de acceso */}
      <section aria-label="Accesos principales" className="access-grid">
        {ACCESS_CARDS.map(({ id, title, Icon, highlight }) => (
          <button
            key={id}
            className={`access-card ${highlight ? "is-highlight" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <span className="access-icon">
              <Icon size={30} />
            </span>
            <span className="access-title">{title}</span>
            <span className="access-underline" aria-hidden="true" />
          </button>
        ))}
      </section>

      {/* Tarjetas anchas */}
      <section aria-label="Recursos destacados" className="feature-grid">
        <button className="feature-card" onClick={() => onNavigate("policies")}>
          <span className="feature-icon">
            <IconClipboard size={34} />
          </span>
          <span className="feature-body">
            <span className="feature-title">Standards &amp; Compliance</span>
            <span className="feature-desc">
              Políticas, procedimientos y estándares que rigen nuestra cultura administrativa.
            </span>
          </span>
          <span className="feature-arrow" aria-hidden="true">
            <IconChevron size={20} />
          </span>
        </button>

        <button className="feature-card" onClick={() => onNavigate("policies")}>
          <span className="feature-icon">
            <IconBook size={34} />
          </span>
          <span className="feature-body">
            <span className="feature-title">Knowledge Hub</span>
            <span className="feature-desc">
              Guías, lecciones aprendidas y mejores prácticas reunidas en un solo lugar.
            </span>
          </span>
          <span className="feature-arrow" aria-hidden="true">
            <IconChevron size={20} />
          </span>
        </button>
      </section>
    </div>
  )
}
