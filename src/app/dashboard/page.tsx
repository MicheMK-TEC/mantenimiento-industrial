 export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Control y Confiabilidad</h1>
          <p className="text-slate-400 text-sm">Gestión de Mantenimiento Basada en Estándares SMRP.</p>
        </div>
        <span className="bg-blue-950 border border-blue-800 text-blue-300 px-3 py-1 rounded text-xs font-mono">Modo: Administrador / Planner</span>
      </div>

      {/* Tarjetas de Analítica SMRP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-lg">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Solicitudes Nuevas</p>
          <p className="text-3xl font-black text-amber-400 mt-2">3</p>
          <span className="text-xs text-slate-400 mt-1 block">Pendientes de evaluación</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-lg">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">OTs en Ejecución</p>
          <p className="text-3xl font-black text-blue-400 mt-2">5</p>
          <span className="text-xs text-slate-400 mt-1 block">Asignadas a técnicos</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-lg">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Disponibilidad (A)</p>
          <p className="text-3xl font-black text-emerald-400 mt-2">94.2%</p>
          <span className="text-xs text-emerald-500 mt-1 block">↑ Meta &gt; 92%</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-lg">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Confiabilidad MTBF</p>
          <p className="text-3xl font-black text-indigo-400 mt-2">320 hrs</p>
          <span className="text-xs text-slate-400 mt-1 block">Promedio planta</span>
        </div>
      </div>
    </div>
  )
}
