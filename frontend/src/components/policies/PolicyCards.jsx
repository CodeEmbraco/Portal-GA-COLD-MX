import { IconEdit, IconTrash, IconFile, IconCalendar } from "../Icons.jsx"

function formatDate(iso) {
  if (!iso) return "—"
  const d = new Date(iso + "T00:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
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
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              <span className={`badge ${p.esPrivado ? "badge-private" : "badge-public"}`}>
                {p.esPrivado ? "🔒 Privada" : "🌐 Pública"}
              </span>
              <span className="badge">{p.departamento?.nombre}</span>
            </div>
          </div>

          <h3 className="policy-card-title">{p.titulo}</h3>

          <div className="policy-card-meta">
            <span className="meta-item">
              <IconCalendar size={15} /> {formatDate(p.fechaSubida).split('T')[0]}
            </span>
          </div>

          {p.archivos.length > 0 ? (
            p.archivos.map((file) => (
              <p
                className="policy-card-file"
                title={file.codigo}
                onClick={() => onDownload(file)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {file.codigo}
              </p>
            ))) : (
            <span className="meta-item">Sin archivos</span>
          )}

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