import { IconShield } from "./Icons.jsx"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <span className="footer-left">
          <span className="footer-badge">
            <IconShield size={18} />
          </span>
          La excelencia administrativa es responsabilidad de todos. Juntos construimos procesos
          confiables y relaciones duraderas.
        </span>
        <span className="footer-right">
          <strong>Nidec</strong> ACIM · IT GA COLD Mexico
        </span>
      </div>
    </footer>
  )
}
