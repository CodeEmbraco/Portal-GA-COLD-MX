import { useMemo, useState } from "react"
import { DEPARTMENTS } from "../../data/departments.js"
import {
  IconPlus,
  IconSearch,
  IconTable,
  IconGrid,
  IconArrowLeft,
  IconDocument,
} from "../Icons.jsx"
import LoginModal from "./LoginModal.jsx"
import PolicyFormModal from "./PolicyFormModal.jsx"
import ConfirmDialog from "./ConfirmDialog.jsx"
import PolicyTable from "./PolicyTable.jsx"
import PolicyCards from "./PolicyCards.jsx"
import "./policies.css"

// Ícono simple de Chevron para colapsar/desplegar
function IconChevronDown({ size = 18, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function PoliciesModule({
  policies,
  onCreate,
  onUpdate,
  onDelete,
  isAuthenticated,
  onAuthenticated,
}) {
  const [selectedDept, setSelectedDept] = useState(null)
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState("table") // "table" | "cards"
  
  // Estado para mostrar/ocultar el listado de políticas
  const [isExpanded, setIsExpanded] = useState(true)

  // Control de modales
  const [showLogin, setShowLogin] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [formState, setFormState] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Conteo de políticas por departamento
  const countsByDept = useMemo(() => {
    const map = {}
    for (const p of policies) map[p.department] = (map[p.department] || 0) + 1
    return map
  }, [policies])

  // Políticas filtradas por departamento + búsqueda
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return policies.filter((p) => {
      const matchesDept = !selectedDept || p.department === selectedDept
      const matchesTerm =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.fileName.toLowerCase().includes(term) ||
        p.department.toLowerCase().includes(term)
      return matchesDept && matchesTerm
    })
  }, [policies, selectedDept, search])

  // Ejecuta una acción protegida: si no hay sesión, pide login primero.
  const requireAuth = (action) => {
    if (isAuthenticated) {
      action()
    } else {
      setPendingAction(() => action)
      setShowLogin(true)
    }
  }

  const handleLoginSuccess = () => {
    onAuthenticated()
    setShowLogin(false)
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
  }

  // Lógica de descarga/visualización condicional según si es pública o privada
  const executeDownload = (policy) => {
    // Simulación de descarga del archivo
    const fileUrl = policy.fileUrl || "#"
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = policy.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Si no hay URL real implementada aún, mostramos una alerta informativa
    if (!policy.fileUrl) {
      alert(`Descargando/Abriendo documento: ${policy.fileName}`)
    }
  }

  const handleDownload = (policy) => {
    if (policy.isPrivate) {
      // Si es privada, requiere autenticación
      requireAuth(() => executeDownload(policy))
    } else {
      // Si es pública, se descarga/visualiza directamente
      executeDownload(policy)
    }
  }

  const openCreate = () =>
    requireAuth(() => setFormState({ mode: "create", policy: null }))

  const openEdit = (policy) =>
    requireAuth(() => setFormState({ mode: "edit", policy }))

  const askDelete = (policy) => requireAuth(() => setDeleteTarget(policy))

  const handleSave = (data) => {
    if (formState?.mode === "edit") {
      onUpdate(data)
    } else {
      onCreate(data)
    }
    setFormState(null)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="policies">
      {/* Encabezado del módulo */}
      <div className="policies-head">
        <div className="policies-head-text">
          <span className="policies-eyebrow">
            <IconDocument size={16} /> Standards &amp; Compliance
          </span>
          <h1 className="policies-title">Políticas y Procedimientos</h1>
          <p className="policies-lead">
            Selecciona un departamento para filtrar sus políticas o gestiona los documentos
            normativos de GA COLD Mexico.
          </p>
        </div>
        <button className="btn btn-primary btn-new" onClick={openCreate}>
          <IconPlus size={18} /> Nueva política
        </button>
      </div>

      {/* Selección por departamentos */}
      <section className="dept-section" aria-label="Departamentos">
        <div className="dept-section-header">
          <h2 className="section-label">Departamentos</h2>
          {selectedDept && (
            <button className="btn btn-ghost btn-back" onClick={() => setSelectedDept(null)}>
              <IconArrowLeft size={16} /> Ver todos
            </button>
          )}
        </div>
        <div className="dept-grid">
          {DEPARTMENTS.map((dep) => (
            <button
              key={dep}
              className={`dept-chip ${selectedDept === dep ? "is-active" : ""}`}
              onClick={() => setSelectedDept((cur) => (cur === dep ? null : dep))}
              aria-pressed={selectedDept === dep}
            >
              <span className="dept-name">{dep}</span>
              <span className="dept-count">{countsByDept[dep] || 0}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Barra de herramientas: búsqueda + botón colapsable + cambio de vista */}
      <section className="policies-toolbar" aria-label="Herramientas de listado">
        <div className="toolbar-left">
          <span className="search-box">
            <span className="search-icon">
              <IconSearch size={18} />
            </span>
            <input
              type="search"
              className="search-input"
              placeholder="Buscar por nombre de archivo o departamento…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar políticas"
            />
          </span>
          <span className="results-count">
            {filtered.length} {filtered.length === 1 ? "política" : "políticas"}
            {selectedDept ? ` · ${selectedDept}` : ""}
          </span>
        </div>

        {/* Botón central para Ocultar / Mostrar la información */}
        <div className="toolbar-center">
          <button
            type="button"
            className="btn btn-ghost toggle-expand-btn"
            onClick={() => setIsExpanded((prev) => !prev)}
            title={isExpanded ? "Ocultar políticas" : "Mostrar políticas"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
              fontSize: "0.85rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span>{isExpanded ? "Ocultar políticas" : "Mostrar políticas"}</span>
            <IconChevronDown
              size={18}
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

        <div className="view-toggle" role="group" aria-label="Cambiar vista">
          <button
            className={`view-btn ${viewMode === "table" ? "is-active" : ""}`}
            onClick={() => setViewMode("table")}
            aria-pressed={viewMode === "table"}
          >
            <IconTable size={18} /> Tabla
          </button>
          <button
            className={`view-btn ${viewMode === "cards" ? "is-active" : ""}`}
            onClick={() => setViewMode("cards")}
            aria-pressed={viewMode === "cards"}
          >
            <IconGrid size={18} /> Tarjetas
          </button>
        </div>
      </section>

      {/* Listado condicional */}
      {isExpanded && (
        <>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <IconDocument size={38} />
              </span>
              <h3>No hay políticas para mostrar</h3>
              <p>
                {search || selectedDept
                  ? "Ajusta el filtro o el término de búsqueda."
                  : "Comienza cargando una nueva política."}
              </p>
              <button className="btn btn-primary" onClick={openCreate}>
                <IconPlus size={18} /> Nueva política
              </button>
            </div>
          ) : viewMode === "table" ? (
            <PolicyTable
              policies={filtered}
              onEdit={openEdit}
              onDelete={askDelete}
              onDownload={handleDownload}
            />
          ) : (
            <PolicyCards
              policies={filtered}
              onEdit={openEdit}
              onDelete={askDelete}
              onDownload={handleDownload}
            />
          )}
        </>
      )}

      {/* Modales */}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false)
            setPendingAction(null)
          }}
          onSuccess={handleLoginSuccess}
        />
      )}

      {formState && (
        <PolicyFormModal
          policy={formState.policy}
          defaultDepartment={selectedDept}
          onClose={() => setFormState(null)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Eliminar política"
          message={`¿Seguro que deseas eliminar "${deleteTarget.title}"? Esta acción no se puede deshacer.`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}