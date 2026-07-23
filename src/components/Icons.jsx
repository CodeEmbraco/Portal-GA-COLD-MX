// Coleccion de iconos en SVG puro (linea) para evitar librerias externas.
// Todos heredan el color mediante "currentColor" y aceptan un tamaño opcional.

const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
})

export function IconHome({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}

export function IconTarget({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
      <path d="m17 7 3-3" />
    </svg>
  )
}

export function IconMonitor({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 12l3-3 2 2 4-4" />
    </svg>
  )
}

export function IconWorkstreams({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <path d="M7 21c6 0 3-6 9-6" />
      <path d="M7 21c-3 0-3-4 0-4s4-3 1-5-3-4 1-4" />
      <circle cx="16" cy="15" r="1.4" fill="currentColor" />
      <path d="M17 3h2v2" />
    </svg>
  )
}

export function IconChart({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m20 20-4.5-4.5" />
      <path d="M8 11.5v1.5M10.5 9v4M13 10v3" />
    </svg>
  )
}

export function IconPeople({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M16 14.5a4.5 4.5 0 0 1 4.5 4.5" />
    </svg>
  )
}

export function IconDocument({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </svg>
  )
}

export function IconClipboard({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4V3h6v1" />
      <path d="m8.5 11 2 2 4-4" />
      <path d="M8.5 17h5" />
    </svg>
  )
}

export function IconBook({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <path d="M12 6C10 4 6 4 4 5v13c2-1 6-1 8 1 2-2 6-2 8-1V5c-2-1-6-1-8 1z" />
      <path d="M12 6v13" />
    </svg>
  )
}

export function IconCalendar({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="5" width="16" height="16" rx="1.5" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </svg>
  )
}

export function IconMore({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <circle cx="6" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function IconSearch({ size = 20 }) {
  return (
    <svg {...base(size)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

export function IconShield({ size = 22 }) {
  return (
    <svg {...base(size)}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconPlus({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconEdit({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="M14 5l5 5" />
      <path d="M4 20l1-4L16 5l3 3L8 19z" />
    </svg>
  )
}

export function IconTrash({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7v13h12V7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function IconTable({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="5" width="16" height="14" rx="1" />
      <path d="M4 10h16M4 15h16M10 5v14" />
    </svg>
  )
}

export function IconGrid({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  )
}

export function IconLock({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </svg>
  )
}

export function IconUser({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

export function IconClose({ size = 20 }) {
  return (
    <svg {...base(size)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function IconChevron({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function IconFile({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export function IconArrowLeft({ size = 18 }) {
  return (
    <svg {...base(size)}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}
