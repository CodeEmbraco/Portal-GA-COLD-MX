import { useEffect, useRef, useState } from "react"
import { DEPARTMENTS } from "../../data/departments.js"
import { IconClose, IconFile } from "../Icons.jsx"

// Modal de formulario para crear o editar una politica.
// Recibe `policy` cuando se edita; null cuando se crea.
export default function PolicyFormModal({ policy, defaultDepartment, onClose, onSave }) {
  const isEditing = Boolean(policy)
  const firstFieldRef = useRef(null)

  const [form, setForm] = useState({
    title: policy?.title ?? "",
    date: policy?.date ?? new Date().toISOString().slice(0, 10),
    department: policy?.department ?? defaultDepartment ?? "",
    version: policy?.version ?? "",
    fileName: policy?.fileName ?? "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    firstFieldRef.current?.focus()
  }, [])

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) update("fileName", file.name)
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = "Ingresa un título."
    if (!form.date) next.date = "Selecciona una fecha."
    if (!form.department) next.department = "Selecciona un departamento."
    if (!form.version.trim()) next.version = "Indica la versión."
    if (!form.fileName.trim()) next.fileName = "Adjunta un archivo."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      ...policy,
      title: form.title.trim(),
      date: form.date,
      department: form.department,
      version: form.version.trim(),
      fileName: form.fileName.trim(),
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
              className={`field-input ${errors.title ? "is-invalid" : ""}`}
              value={form.title}
              placeholder="Ej. Política de Control de Calidad"
              onChange={(e) => update("title", e.target.value)}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field-label">Fecha</span>
              <input
                type="date"
                className={`field-input ${errors.date ? "is-invalid" : ""}`}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </label>

            <label className="field">
              <span className="field-label">Versión</span>
              <input
                type="text"
                className={`field-input ${errors.version ? "is-invalid" : ""}`}
                value={form.version}
                placeholder="Ej. 1.0"
                onChange={(e) => update("version", e.target.value)}
              />
              {errors.version && <span className="field-error">{errors.version}</span>}
            </label>
          </div>

          <label className="field">
            <span className="field-label">Departamento</span>
            <select
              className={`field-input ${errors.department ? "is-invalid" : ""}`}
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            >
              <option value="">Selecciona un departamento…</option>
              {DEPARTMENTS.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
            {errors.department && <span className="field-error">{errors.department}</span>}
          </label>

          <div className="field">
            <span className="field-label">Adjuntar archivo (PDF, DOCX, XLSX…)</span>
            <label className={`file-drop ${errors.fileName ? "is-invalid" : ""}`}>
              <span className="file-drop-icon">
                <IconFile size={22} />
              </span>
              <span className="file-drop-text">
                {form.fileName ? (
                  <strong className="file-name">{form.fileName}</strong>
                ) : (
                  <>
                    <strong>Haz clic para seleccionar</strong> o arrastra tu documento
                  </>
                )}
              </span>
              <input
                type="file"
                className="file-input-hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={handleFile}
              />
            </label>
            {errors.fileName && <span className="field-error">{errors.fileName}</span>}
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
