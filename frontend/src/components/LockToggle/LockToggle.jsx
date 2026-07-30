import React from 'react';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import './LockToggle.css';

const LockToggle = ({ isAuthenticated, onLogin, onLogout }) => {

    const handleToggle = () => {
        if (!isAuthenticated) {
            // 1. Si no está autenticado, requerir login
            onLogin(() => {
                // Callback que se ejecuta cuando el login fue exitoso
            });
        } else {
            // 2. Si ya está autenticado, quitar credenciales / logout
            if (onLogout) {
                onLogout();
            }
        }
    };

    return (
        <button
            type="button"
            className={`lock-toggle ${isAuthenticated ? 'active' : ''}`}
            onClick={handleToggle}
            aria-pressed={isAuthenticated}
            title={isAuthenticated ? "Haz clic para cerrar sesión" : "Haz clic para autenticarte"}
        >
            <div className="lock-toggle-thumb">
                {isAuthenticated ? (
                    <IconLockOpen size={16} className="toggle-icon" />
                ) : (
                    <IconLock size={16} className="toggle-icon" />
                )}
            </div>
        </button>
    );
};

export default LockToggle;