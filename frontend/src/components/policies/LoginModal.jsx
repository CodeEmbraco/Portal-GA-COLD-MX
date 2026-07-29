//react
import { useEffect, useRef, useState } from "react"

//hook
import { useAuthenticated } from "@hooks/useAuthenticated"

//Iconos
import { IconLock, IconUser, IconClose } from "@components/Icons.jsx"

// Credenciales de prueba por defecto (mock, solo front-end).
// const VALID_USER = "admin"
// const VALID_PASS = "123"

export default function LoginModal({ onClose, onSuccess }) {

  const { login, isAuthenticated } = useAuthenticated();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const firstFieldRef = useRef(null)

  useEffect(() => {
    firstFieldRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      correo: username.trim(),
      contraseña: password,
    };

    try {
      const response = await login(loginData);
      console.log("Respuesta del servidor:", response);
      if (response.resultado === 200) {
        setError("");
        onSuccess();
      } else {
        setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
    }
  };

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modal modal-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-heading">
            <span className="modal-header-icon">
              <IconLock size={20} />
            </span>
            <div>
              <h2 id="login-title" className="modal-title">
                Autenticación requerida
              </h2>
              <p className="modal-subtitle">Solo personal autorizado puede gestionar políticas.</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <IconClose size={20} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Usuario</span>
            <span className="field-input-wrap">
              <span className="field-icon">
                <IconUser size={18} />
              </span>
              <input
                ref={firstFieldRef}
                type="text"
                className="field-input has-icon"
                value={username}
                autoComplete="username"
                placeholder="admin"
                onChange={(e) => setUsername(e.target.value)}
              />
            </span>
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <span className="field-input-wrap">
              <span className="field-icon">
                <IconLock size={18} />
              </span>
              <input
                type="password"
                className="field-input has-icon"
                value={password}
                autoComplete="current-password"
                placeholder="••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <p className="login-hint">
            Credenciales de prueba — usuario: <strong>admin</strong> · contraseña: <strong>123</strong>
          </p>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
