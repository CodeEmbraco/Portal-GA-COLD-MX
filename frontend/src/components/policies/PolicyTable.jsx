import { IconEdit, IconTrash, IconFile } from "../Icons.jsx"

function formatDate(iso) {
  if (!iso) return "—"
  const d = new Date(iso + "T00:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
}

// Vista de tabla para listar políticas.
export default function PolicyTable({ policies, onEdit, onDelete, onDownload, onViewFile}) {
  return (
    <div className="table-wrap">
      <table className="policy-table">
        <thead>
          <tr>
            <th scope="col">Política</th>
            <th scope="col">Departamento</th>
            <th scope="col">Acceso</th>
            {/* <th scope="col">Versión</th> */}
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
              <td className="cell-title">{p.titulo}</td>
              <td>
                <span className="badge">{p.departamento?.nombre}</span>
              </td>
              <td>
                <span className={`badge ${p.esPrivado ? "badge-private" : "badge-public"}`}>
                  {p.esPrivado ? "🔒 Privada" : "🌐 Pública"}
                </span>
              </td>
              {/* <td className="cell-version">v{p.version}</td> */}
              <td className="cell-muted">{formatDate(p.fechaSubida).split('T')[0]}</td>
              <td>
                {p.archivos && p.archivos.length > 0 ? (
                  p.archivos.map((archivo) => (
                    <button
                      key={archivo.id}
                      type="button"
                      className="file-pill"
                      onClick={() => onViewFile(archivo, p)}
                      title={`Previsualizar: ${archivo.codigo}`}
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                    >
                      <IconFile size={15} />
                      <span className="file-pill-name">{archivo.codigo}</span>
                    </button>
                  ))
                ) : (
                  <span className="cell-muted" style={{ fontSize: "0.8em" }}>Sin archivos</span>
                )}
              </td>
              <td className="col-actions">
                <div className="row-actions">
                  <button
                    className="action-btn"
                    onClick={() => onEdit(p)}
                    aria-label={`Editar ${p.titulo}`}
                    title="Editar"
                  >
                    <IconEdit size={17} />
                  </button>
                  <button
                    className="action-btn is-danger"
                    onClick={() => onDelete(p)}
                    aria-label={`Eliminar ${p.titulo}`}
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
