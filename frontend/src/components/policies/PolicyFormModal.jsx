import { useEffect, useRef, useState, useMemo } from "react"
import { IconClose, IconFile } from "../Icons.jsx"
import { useCatalog } from "../../hooks/useCatalog.js"

// Modal de formulario para crear o editar una política.
// Recibe `policy` cuando se edita; null cuando se crea.
export default function PolicyFormModal({ policy, defaultDepartment, onClose, onSave }) {
  const { catalog: departments = [] } = useCatalog("departamento")
  const isEditing = Boolean(policy)
  const firstFieldRef = useRef(null)

  const [form, setForm] = useState({
    titulo: policy?.titulo ?? policy?.title ?? "",
    departamentoId: policy?.departamentoId ?? policy?.department ?? defaultDepartment ?? "",
    esPrivado: policy?.esPrivado ?? policy?.isPrivate ?? true,
    // Campos visuales secundarios (opcionales)
    fecha: policy?.fechaSubida ? policy.fechaSubida.split("T")[0] : new Date().toISOString().slice(0, 10),
    nombreArchivo: policy?.nombreArchivo ?? "",
  })
  const [errors, setErrors] = useState({})

  const availableDepartments = useMemo(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    // Si el usuario es admin, muestra todas las opciones.
    if (userInfo.rol === "Admin") return departments
    // Si no es admin, solo muestra su departamento.
    return departments.filter((dep) => dep.value === userInfo.departamentoId)
  }, [departments])

  useEffect(() => {
    firstFieldRef.current?.focus()
  }, [])

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      update("nombreArchivo", file.name)
      update("rawFile", file)
    }
  }

  const validate = () => {
    const next = {}
    if (!form.titulo.trim()) next.titulo = "Ingresa un título."
    if (!form.departamentoId) next.departamentoId = "Selecciona un departamento."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSave({
      ...(policy?.id ? { id: policy.id } : {}),
      titulo: form.titulo.trim(),
      departamentoId: Number(form.departamentoId),
      esPrivado: Boolean(form.esPrivado),
      rawFile: form.rawFile,
    })
  }

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modal modal-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-heading">
            <div>
              <h2 id="form-title" className="modal-title">
                {isEditing ? "Editar política" : "Nueva política"}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? "Actualiza la información del documento."
                  : "Carga manual de un nuevo documento normativo."}
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <IconClose size={20} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Título breve de la política</span>
            <input
              ref={firstFieldRef}
              type="text"
              className={`field-input ${errors.titulo ? "is-invalid" : ""}`}
              value={form.titulo}
              placeholder="Ej. Política de Control de Calidad"
              onChange={(e) => update("titulo", e.target.value)}
            />
            {errors.titulo && <span className="field-error">{errors.titulo}</span>}
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field-label">Departamento</span>
              <select
                className={`field-input ${errors.departamentoId ? "is-invalid" : ""}`}
                value={form.departamentoId}
                onChange={(e) => update("departamentoId", e.target.value)}
              >
                <option value="">Selecciona un departamento…</option>
                {availableDepartments.map((dep) => (
                  <option key={dep.value} value={dep.value}>
                    {dep.label}
                  </option>
                ))}
              </select>
              {errors.departamentoId && <span className="field-error">{errors.departamentoId}</span>}
            </label>

            <label className="field">
              <span className="field-label">Visibilidad / Acceso</span>
              <select
                className="field-input"
                value={form.esPrivado ? "private" : "public"}
                onChange={(e) => update("esPrivado", e.target.value === "private")}
              >
                <option value="public">🌐 Pública (Acceso libre)</option>
                <option value="private">🔒 Privada (Personal autorizado)</option>
              </select>
            </label>
          </div>

          <div className="field">
            <span className="field-label">Adjuntar archivo (PDF)</span>
            <label className={`file-drop ${errors.nombreArchivo ? "is-invalid" : ""}`}>
              <span className="file-drop-icon">
                <IconFile size={22} />
              </span>
              <span className="file-drop-text">
                {form.nombreArchivo ? (
                  <strong className="file-name">{form.nombreArchivo}</strong>
                ) : (
                  <>
                    <strong>Haz clic para seleccionar</strong> o arrastra tu documento
                  </>
                )}
              </span>
              <input
                type="file"
                className="file-input-hidden"
                accept=".pdf"
                onChange={handleFile}
              />
            </label>
            {errors.nombreArchivo && <span className="field-error">{errors.nombreArchivo}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Guardar cambios" : "Crear política"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
