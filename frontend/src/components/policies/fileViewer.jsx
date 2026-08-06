import { useEffect } from "react"
import { IconDocument } from "../Icons.jsx"
import "./fileViewer.css" // Opcional para tus estilos

export default function FileViewerModal({ file, onClose }) {
  // 1. EFECTO: Cerrar el modal al presionar la tecla 'Escape' (limpieza con cleanup)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    // Función de limpieza (cleanup) al desmontar
    return () => {
        window.removeEventListener("keydown", handleKeyDown)
        if (file?.url?.startsWith("blob:")) {
            window.URL.revokeObjectURL(file.url)
        }
        }
    }, [onClose, file])

  // Si no hay archivo seleccionado, no renderizamos nada (renderizado condicional)
  if (!file) return null

  // Supongamos que 'file' tiene { title, url, mimeType }
  const isPdf = file.mimeType?.includes("pdf") || file.url?.endsWith(".pdf")

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation evita que al hacer clic dentro del contenido se cierre el modal */}
      <div className="viewer-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Encabezado del visor */}
        <header className="viewer-header">
          <div className="viewer-title">
            <IconDocument size={20} />
            <h3>{file.title || "Visualizador de documento"}</h3>
          </div>
          
          <div className="viewer-actions">
            {file.rawFileObj && (
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => onDownload(file.rawFileObj)}
              >
                Descargar
              </button>
            )}
            <button className="btn-close" onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
          </div>
        </header>

        {/* Cuerpo del visor con iframe */}
        <main className="viewer-body">
          {isPdf ? (
            <iframe
              src={`${file.url}#toolbar=0`} 
              title={file.title}
              width="100%"
              height="100%"
            />
          ) : (
            <div className="viewer-fallback">
              <p>Este tipo de archivo no se puede previsualizar directamente.</p>
              <a href={file.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                Abrir en nueva pestaña
              </a>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}