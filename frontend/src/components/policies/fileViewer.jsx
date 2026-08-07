import { useEffect, useState } from "react"
import { IconDocument } from "../Icons.jsx"
import "./fileViewer.css"

export default function FileViewerModal({ file, onClose, onDownload }) {
  const [isKeyPressed, setIsKeyPressed] = useState(false)
  const [isMouseInside, setIsMouseInside] = useState(false)
  const [isViolated, setIsViolated] = useState(false)

  const puedeDescargar = file?.politicaObj?.acciones?.descargar ?? true;
  const esVisorLibre = file?.politicaObj?.acciones?.visor ?? false;

  useEffect(() => {

    if (esVisorLibre) return;

    const activeKeys = new Set()

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
        return
      }

      if (isViolated) return

      activeKeys.add(e.code)

      const isKeyA = e.key === "a" || e.key === "A"

      if (!isKeyA || activeKeys.size > 1) {
        setIsViolated(true)
      } else {
        e.preventDefault()
        setIsKeyPressed(true)
      }
    }

    const handleKeyUp = (e) => {
      activeKeys.delete(e.code)
      if (e.key === "a" || e.key === "A" || activeKeys.size === 0) {
        setIsKeyPressed(false)
      }
    }

    const handleBlur = () => {
      if (document.activeElement && document.activeElement.tagName === "IFRAME") {
        setIsViolated(true)
        window.focus()
        if (document.activeElement) document.activeElement.blur()
        return
      }

      activeKeys.clear()
      setIsKeyPressed(false)
      setIsMouseInside(false)
    }

    const safetyInterval = setInterval(() => {
      if (document.activeElement && document.activeElement.tagName === "IFRAME") {
        if (!isViolated) {
          setIsViolated(true)
          window.focus()
          document.activeElement.blur()
        }
      }
    }, 150)

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)

    return () => {
      clearInterval(safetyInterval)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)

      if (file?.url?.startsWith("blob:")) {
        window.URL.revokeObjectURL(file.url)
      }
    }
  }, [onClose, file, isViolated])

  if (!file) return null

  const isPdf = file.mimeType?.includes("pdf") || file.url?.endsWith(".pdf")
  const isDocumentVisible = esVisorLibre || (!isViolated && isKeyPressed && isMouseInside)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="viewer-container" onClick={(e) => e.stopPropagation()}>
        
        <header className="viewer-header">
          <div className="viewer-title">
            <IconDocument size={20} />
            <h3>{file.title || "Visualizador de documento"}</h3>
          </div>
          
          <div className="viewer-actions">
            {puedeDescargar && (
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={() => {
                if (onDownload && file.rawFileObj) {
                  onDownload(file.rawFileObj)
                } else {
                  console.error("Falta el objeto del archivo o la función onDownload")
                }
              }}
            >
              Descargar
            </button>
            )}
            
            <button className="btn-close" onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
          </div>
        </header>
        <main 
          className={`viewer-body ${!isDocumentVisible ? "is-blurred" : ""}`}
          onMouseEnter={() => ! esVisorLibre && !isViolated && setIsMouseInside(true)}
          onMouseLeave={() => {
            if (!esVisorLibre) {
              setIsMouseInside(false)
              setIsKeyPressed(false)
            }
          }}
          onMouseDown={() => {
            if (!esVisorLibre && !isViolated) setIsViolated(true)
          }}
          onContextMenu={(e) => {
            if (!esVisorLibre) {
              e.preventDefault()
              if (!isViolated) setIsViolated(true)
            }
          }}
        >
          {!esVisorLibre && (
            <>
            {isViolated ? (
              <div className="protection-overlay">
                <div className="protection-card error-card">
                  <span className="protection-icon"></span>
                  <h4>Acción no permitida</h4>
                  <p>
                    Por razones de seguridad, no está permitido hacer clic sobre el documento protegido ni presionar teclas adicionales. Abre un nuevo visor
                  </p>
                </div>
              </div>
            ) : (
              !isDocumentVisible && (
                <div className="protection-overlay">
                  <div className="protection-card">
                    <span className="protection-icon"></span>
                    <h4>Contenido Protegido</h4>
                    <p>
                      Pasa el cursor sobre el área y mantén presionada la tecla <strong>A</strong> para consultar el documento.
                    </p>
                  </div>
                </div>
              )
            )}
          </>
        )}
          {isPdf ? (
            <iframe
              src={`${file.url}#toolbar=0`} 
              title={file.title}
              width="100%"
              height="100%"
              style={{ pointerEvents: !isDocumentVisible ? "none" : "auto" }}
            />
          ) : (
            <div className="viewer-fallback">
              <p>Este tipo de archivo no se puede previsualizar directamente.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}