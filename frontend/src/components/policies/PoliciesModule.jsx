import { useMemo, useState, useEffect } from "react"
import { usePolicies } from "@hooks/usePolicies"
import { useCatalog } from "@hooks/useCatalog"
import { useFile } from "@hooks/useFile"

import {
  IconPlus,
  IconSearch,
  IconTable,
  IconGrid,
  IconArrowLeft,
  IconDocument,
  IconLock,
} from "../Icons.jsx"
import LoginModal from "./LoginModal.jsx"
import PolicyFormModal from "./PolicyFormModal.jsx"
import ConfirmDialog from "./ConfirmDialog.jsx"
import PolicyTable from "./PolicyTable.jsx"
import PolicyCards from "./PolicyCards.jsx"
import "./policies.css"

export default function PoliciesModule({
  isAuthenticated,
  onAuthenticated,
  onLogout,
}) {
  const [selectedDept, setSelectedDept] = useState(null)
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState("table") // "table" | "cards"

  //Llamamos los hooks
  const { policies, fetchPolicies, createPolicy, updatePolicy, deletePolicy } = usePolicies();
  const { createFile, getFilesByPolicy, downloadFile, isDownloading } = useFile();
  const { catalog: departments = [] } = useCatalog("departamento");

  //El useEffect reacciona cuando hay un cambio en "isAuthenticated".
  //Cuando se monta el componente, trae solamente politicas publicas.
  //Cuando el usuario valida su sesion, se vuelve a ejecutar y trae tambien las politicas privadas si es que aplica.
  useEffect(() => {
    fetchPolicies();
  }, [isAuthenticated, fetchPolicies]);

  //Se ejecuta únicamente cuando el componente se desmonta (al salir del módulo)
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("userInfo");
      if (onLogout) onLogout();
    };
  }, []);

  // Control de modales
  const [showLogin, setShowLogin] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [formState, setFormState] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Conteo de políticas por departamento
  const countsByDept = useMemo(() => {
    const map = {}
    for (const p of policies) {
      const deptId = p.departamentoId ?? p.departamento?.id
      if (deptId != null) {
        map[deptId] = (map[deptId] || 0) + 1
      }
    }
    return map
  }, [policies])

  //Las politicas ya vienen filtradas desde el backend, incluso si el usuario ya está validado
  //Solo filtraremos por departamento si el usuario selecciona uno
  const filtered = useMemo(() => {
    return policies.filter((p) => {
      //Obtenemos el ID del departamento de forma segura
      const deptId = p.departamentoId ?? p.departamento?.id
      const matchesDept = !selectedDept || String(deptId) === String(selectedDept)
      //Buscamos por título de la política (campo del modelo Politica)
      const titleToSearch = p.titulo || p.title || ""
      const matchesSearch = !search || titleToSearch.toLowerCase().includes(search.toLowerCase())
      return matchesDept && matchesSearch
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

  //Se ejecuta cuando el usuario inicia sesión exitosamente
  const handleLoginSuccess = () => {
    onAuthenticated()
    setShowLogin(false)
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
    fetchPolicies();
  }

  //Funciones para crear, actualizar y eliminar politicas usando nuestro hook
  //En esta funcion se manda a llamar el createPolicy del hook y se cambia el estado de formState a null
  const handleCreate = () => {

    requireAuth(() => setFormState({ mode: "create", policy: null }))
  }

  const handleEdit = (policy) => {
    requireAuth(() => setFormState({ mode: "edit", policy }))
  }

  //Maneja la eliminación de una política
  const handleDelete = (target) => requireAuth(async () => {
    const id = typeof target === "object" ? target.id : target;
    const title = typeof target === "object" ? (target.titulo || target.title) : "";

    if (window.confirm(`¿Estás seguro de que deseas eliminar ${title ? `"${title}"` : "esta política"}?`)) {
      try {
        await deletePolicy(id);
        alert("Política eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la política:", error);
        alert(error.message || "Ocurrió un error al eliminar la política.");
      }
    }
  })

  //Guarda la política (Creación o Edición) y sube el archivo si se adjunto uno
  const handleSave = async (data) => {
    try {
      let policyId = data.id;

      if (formState?.mode === "edit") {
        await updatePolicy(data.id, data);
        alert("Política actualizada exitosamente.");
      } else {
        const res = await createPolicy(data);
        policyId = res?.objeto?.id || res?.objetoId;
        alert("Política creada exitosamente.");
      }

      // Si el usuario adjuntó un archivo físico en el formulario, lo subimos
      if (data.rawFile && policyId) {
        const formData = new FormData();
        formData.append("archivo", data.rawFile);
        formData.append("codigo", `COD-${Date.now()}`);
        formData.append("politicaId", policyId);
        // formData.append("ruta", data.rawFile.name);

        await createFile(formData);
      }

      setFormState(null);
    } catch (error) {
      console.error("Error al guardar la política o subir archivo:", error);
      alert(error.message || "Ocurrió un error al guardar la política.");
    }
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
      </div>

      {/* Selección por departamentos */}
      <section className="dept-section" aria-label="Departamentos">
        <div className="dept-section-header">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <h2 className="section-label">Departamentos</h2>
            {selectedDept && (
              <button className="btn btn-ghost btn-back" onClick={() => setSelectedDept(null)}>
                <IconArrowLeft size={16} /> Ver todos
              </button>
            )}
          </div>
          <div className="dept-section-actions">
            <button className="btn-lock" onClick={() => requireAuth(() => { })}>
              <IconLock size={22} />
            </button>
            <button className="btn btn-primary btn-new" onClick={handleCreate}>
              <IconPlus size={18} /> Nueva política
            </button>
          </div>
        </div>
        <div className="dept-grid">
          {departments?.map((dep) => (
            <button
              key={dep.value}
              className={`dept-chip ${selectedDept === dep.value ? "is-active" : ""}`}
              onClick={() => setSelectedDept((cur) => (cur === dep.value ? null : dep.value))}
              aria-pressed={selectedDept === dep.value}
            >
              <span className="dept-name">{dep.label}</span>
              <span className="dept-count">{countsByDept[dep.value] || 0}</span>
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

      {(
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
              <button className="btn btn-primary" onClick={handleCreate}>
                <IconPlus size={18} /> Nueva política
              </button>
            </div>
          ) : viewMode === "table" ? (
            <PolicyTable policies={filtered} onEdit={handleEdit} onDelete={handleDelete} onDownload={downloadFile} />
          ) : (
            <PolicyCards policies={filtered} onEdit={handleEdit} onDelete={handleDelete} onDownload={downloadFile} />
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