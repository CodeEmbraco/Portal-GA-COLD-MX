//react
import { useEffect, useState } from "react"

//Componentes
import Navbar from "./components/Navbar.jsx"
import Home from "./components/Home.jsx"
import PoliciesModule from "./components/policies/PoliciesModule.jsx"
import Placeholder from "./components/Placeholder.jsx"
import Footer from "./components/Footer.jsx"

// mockPolicies
//  import { INITIAL_POLICIES } from "./test/mockPolicies.js"

// Genera un id unico simple para nuevas politicas.
const newId = () => `pol-${Date.now()}-${Math.floor(Math.random() * 1000)}`

export default function App() {
  const [activeTab, setActiveTab] = useState("home")

  //Estado para mantener la autenticacion
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Al cambiar de pestaña, subimos el scroll al inicio.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeTab])

  //Si el usuario cambia de pagina, limpiamos el sessionStorage
  useEffect(() => {
    if (activeTab !== "policies") {
      sessionStorage.removeItem("token")
      setIsAuthenticated(false)
    }
  }, [activeTab])

  //renderContent: Renderiza el contenido de la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={setActiveTab} />
      case "policies":
        return (
          <PoliciesModule
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
