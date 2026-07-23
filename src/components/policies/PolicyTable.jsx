import { IconEdit, IconTrash, IconFile } from "../Icons.jsx"

function formatDate(iso) {
  if (!iso) return "—"
  const d = new Date(iso + "T00:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
}

// Vista de tabla para listar políticas.
export default function PolicyTable({ policies, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="policy-table">
        <thead>
          <tr>
            <th scope="col">Política</th>
            <th scope="col">Departamento</th>
            <th scope="col">Versión</th>
            <th scope="col">Fecha</th>
            <th scope="col">Archivo</th>
            <th scope="col" className="col-actions">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id}>
              <td className="cell-title">{p.title}</td>
              <td>
                <span className="badge">{p.department}</span>
              </td>
              <td className="cell-version">v{p.version}</td>
              <td className="cell-muted">{formatDate(p.date)}</td>
              <td>
                <span className="file-pill">
                  <IconFile size={15} />
                  <span className="file-pill-name">{p.fileName}</span>
                </span>
              </td>
              <td className="col-actions">
                <div className="row-actions">
                  <button
                    className="action-btn"
                    onClick={() => onEdit(p)}
                    aria-label={`Editar ${p.title}`}
                    title="Editar"
                  >
                    <IconEdit size={17} />
                  </button>
                  <button
                    className="action-btn is-danger"
                    onClick={() => onDelete(p)}
                    aria-label={`Eliminar ${p.title}`}
                    title="Eliminar"
                  >
                    <IconTrash size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
