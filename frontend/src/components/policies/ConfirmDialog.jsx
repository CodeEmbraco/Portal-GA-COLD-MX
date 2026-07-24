import { IconTrash, IconClose } from "../Icons.jsx"

// Cuadro de confirmación reutilizable para acciones destructivas.
export default function ConfirmDialog({ title, message, confirmLabel = "Eliminar", onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onCancel}>
      <div
        className="modal modal-sm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-heading">
            <span className="modal-header-icon is-danger">
              <IconTrash size={20} />
            </span>
            <div>
              <h2 id="confirm-title" className="modal-title">
                {title}
              </h2>
            </div>
          </div>
          <button className="modal-close" onClick={onCancel} aria-label="Cerrar">
            <IconClose size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="confirm-message">{message}</p>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger-solid" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
