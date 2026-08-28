import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MK Consulting - CMMS Industrial',
  description: 'Sistema de Gestión de Mantenimiento y Confiabilidad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Cargador directo de Tailwind CSS para garantizar diseño CMMS profesional */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 font-sans antialiased min-h-screen flex flex-col">
        {/* Barra superior estilo CMMS Enterprise */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white font-black px-3 py-1.5 rounded tracking-wider text-sm shadow">
              MK CONSULTING
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">CMMS & Reliability Core</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-300">
            <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span> Planta Activa</span>
          </div>
        </header>

        {/* Navegación Principal SMRP */}
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex space-x-6 text-sm overflow-x-auto shadow">
          <a href="/dashboard" className="text-slate-300 hover:text-blue-400 font-medium transition">📊 Dashboard & KPIs</a>
          <a href="/dashboard/solicitudes" className="text-slate-300 hover:text-blue-400 font-medium transition">📥 1. Solicitudes (Work Requests)</a>
          <a href="/dashboard/ordenes" className="text-slate-300 hover:text-blue-400 font-medium transition">⚙️ 2. Órdenes de Trabajo (OT)</a>
          <a href="/dashboard/activos" className="text-slate-300 hover:text-blue-400 font-medium transition">🏭 Activos (EAM)</a>
          <a href="/dashboard/reportes" className="text-slate-300 hover:text-blue-400 font-medium transition">📈 Confiabilidad (MTBF/MTTR)</a>
        </nav>

        <main className="flex-1 p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
