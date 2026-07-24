import { useEffect, useState } from "react"
import Navbar from "./components/Navbar.jsx"
import Home from "./components/Home.jsx"
import PoliciesModule from "./components/policies/PoliciesModule.jsx"
import Placeholder from "./components/Placeholder.jsx"
import Footer from "./components/Footer.jsx"
import { INITIAL_POLICIES } from "./data/mockPolicies.js"

// Genera un id unico simple para nuevas politicas.
const newId = () => `pol-${Date.now()}-${Math.floor(Math.random() * 1000)}`

export default function App() {
  const [activeTab, setActiveTab] = useState("home")

  // Estado local que simula la persistencia de datos durante la sesion.
  const [policies, setPolicies] = useState(INITIAL_POLICIES)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Al cambiar de pestaña, subimos el scroll al inicio.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeTab])

  const handleCreate = (data) => {
    setPolicies((prev) => [{ ...data, id: newId() }, ...prev])
  }

  const handleUpdate = (data) => {
    setPolicies((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)))
  }

  const handleDelete = (id) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id))
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={setActiveTab} />
      case "policies":
        return (
          <PoliciesModule
            policies={policies}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isAuthenticated={isAuthenticated}
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        )
      default:
        return <Placeholder tab={activeTab} onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="app-shell">
      <Navbar activeTab={activeTab} onNavigate={setActiveTab} />
      <main className="page">{renderContent()}</main>
      <Footer />
    </div>
  )
}
