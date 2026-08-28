'use client'

export default function ReportesPage() {
  const descargarJSON = () => {
    const datosMock = [
      {
        otm_code: "OTM-2026-001",
        activo: "TF01",
        descripcion: "Fuga de aceite en cilindro",
        estado: "Terminado",
        planificador_hh: 4.0,
        tecnico: "Juan Pérez",
        causa_falla: "Desgaste de junta",
        tiempo_inicio: "2026-03-05T08:00",
        tiempo_fin: "2026-03-05T11:30"
      }
    ]
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosMock, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", "historico_mantenimiento_mk.json")
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
        <h1 className="text-xl font-bold text-white mb-2">Módulo de Auditoría e Indicadores SMRP (Administrador)</h1>
        <p className="text-slate-400 text-sm mb-6">Exporte el historial completo de órdenes, tiempos de intervención, repuestos y fallas para el cálculo de MTBF, MTTR y Backlog.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <span className="text-xs text-slate-400 block">MTTR Promedio</span>
            <span className="text-2xl font-black text-blue-400">2.4 Horas</span>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <span className="text-xs text-slate-400 block">MTBF Estimado</span>
            <span className="text-2xl font-black text-emerald-400">312 Horas</span>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <span className="text-xs text-slate-400 block">Backlog de OTs</span>
            <span className="text-2xl font-black text-amber-400">1.2 Semanas</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={descargarJSON}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded text-sm transition shadow"
          >
            Descargar Base Histórica (JSON)
          </button>
          <button 
            onClick={() => alert("Generando exportación CSV relacional...")}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2.5 rounded text-sm transition shadow"
          >
            Descargar Reporte (CSV)
          </button>
        </div>
      </div>
    </div>
  )
}
