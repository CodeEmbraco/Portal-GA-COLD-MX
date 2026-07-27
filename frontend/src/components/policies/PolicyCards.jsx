import { IconEdit, IconTrash, IconFile, IconCalendar } from "../Icons.jsx"

function formatDate(iso) {
  if (!iso) return "—"
  const d = new Date(iso + "T00:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
}

function fileType(name) {
  const ext = name.split(".").pop()?.toUpperCase()
  return ext && ext.length <= 4 ? ext : "DOC"
}

// Vista de tarjetas para listar políticas.
export default function PolicyCards({ policies, onEdit, onDelete, onDownload }) {
  return (
    <div className="cards-grid">
      {policies.map((p) => (
        <article key={p.id} className="policy-card">
          <div className="policy-card-top">
            <span className="file-type" aria-hidden="true">
              <IconFile size={20} />
              <span className="file-type-ext">{fileType(p.fileName)}</span>
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              <span className={`badge ${p.isPrivate ? "badge-private" : "badge-public"}`}>
                {p.isPrivate ? "🔒 Privada" : "🌐 Pública"}
              </span>
              <span className="badge">{p.department}</span>
            </div>
          </div>

          <h3 className="policy-card-title">{p.title}</h3>

          <div className="policy-card-meta">
            <span className="meta-item">
              <IconCalendar size={15} /> {formatDate(p.date)}
            </span>
            <span className="meta-item meta-version">v{p.version}</span>
          </div>

          <p
            className="policy-card-file"
            title={p.fileName}
            onClick={() => onDownload(p)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {p.fileName}
          </p>

          <div className="policy-card-actions">
            <button className="btn btn-outline btn-sm" onClick={() => onEdit(p)}>
              <IconEdit size={16} /> Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(p)}>
              <IconTrash size={16} /> Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}