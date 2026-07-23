import {
  IconTarget,
  IconMonitor,
  IconWorkstreams,
  IconChart,
  IconCalendar,
  IconPeople,
  IconMore,
  IconArrowLeft,
} from "./Icons.jsx"
import "./Placeholder.css"

const META = {
  excellence: { title: "3Q6S Excellence", Icon: IconTarget },
  digitalization: { title: "Digitalization", Icon: IconMonitor },
  workstreams: { title: "Workstreams", Icon: IconWorkstreams },
  indicators: { title: "Indicators", Icon: IconChart },
  meetings: { title: "Meetings", Icon: IconCalendar },
  people: { title: "People", Icon: IconPeople },
  more: { title: "More", Icon: IconMore },
}

// Vista de marcador de posición para las secciones aún no desarrolladas.
export default function Placeholder({ tab, onNavigate }) {
  const meta = META[tab] || { title: "Sección", Icon: IconMore }
  const { title, Icon } = meta

  return (
    <div className="placeholder">
      <span className="placeholder-icon">
        <Icon size={44} />
      </span>
      <h1 className="placeholder-title">{title}</h1>
      <p className="placeholder-text">
        Este módulo forma parte del Portal GA COLD Mexico y estará disponible próximamente. El
        módulo <strong>Policies</strong> es el que se encuentra completamente funcional en este
        prototipo.
      </p>
      <div className="placeholder-actions">
        <button className="btn btn-outline" onClick={() => onNavigate("home")}>
          <IconArrowLeft size={16} /> Volver al inicio
        </button>
        <button className="btn btn-primary" onClick={() => onNavigate("policies")}>
          Ir a Policies
        </button>
      </div>
    </div>
  )
}
