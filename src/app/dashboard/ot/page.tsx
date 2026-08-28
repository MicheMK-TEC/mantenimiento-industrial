 'use client'
import { useState } from 'react'

export default function OrdenesTrabajoPage() {
  const [tecnico, setTecnico] = useState('')
  const [reporte, setReporte] = useState('')
  const [horas, setHoras] = useState('')
  const [guardado, setGuardado] = useState(false)

  const handleCierre = (e: React.FormEvent) => {
    e.preventDefault()
    setGuardado(true)
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
      <div className="flex justify-between items-start border-b border-slate-700 pb-4 mb-4">
        <div>
          <span className="bg-amber-950 text-amber-300 text-xs font-bold px-2.5 py-1 rounded border border-amber-800">Pendiente de Asignación / Ejecución</span>
          <h2 className="text-xl font-bold text-white mt-2">OTM-2026-042: Compresora Atlas Copco 02</h2>
        </div>
      </div>

      <form onSubmit={handleCierre} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Asignar Técnico Responsable:</label>
          <select value={tecnico} onChange={(e) => setTecnico(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white" required>
            <option value="">Seleccione técnico calificado...</option>
            <option value="Juan Pérez">Juan Pérez (Especialista Mecánico)</option>
            <option value="Carlos Ruiz">Carlos Ruiz (Especialista Eléctrico / Automatización)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Informe Técnico de Intervención:</label>
          <textarea value={reporte} onChange={(e) => setReporte(e.target.value)} placeholder="Detalle el diagnóstico, refacciones usadas y trabajos correctivos..." className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white h-28" required />
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Horas Hombre Invertidas (HH):</label>
          <input type="number" step="0.5" value={horas} onChange={(e) => setHoras(e.target.value)} placeholder="Ej. 3.5" className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white" required />
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded transition shadow">
          Registrar Cierre y Guardar Historial del Activo
        </button>
        {guardado && (
          <div className="p-3 bg-blue-950 border border-blue-800 text-blue-300 rounded text-sm mt-4">
            ¡Orden de trabajo cerrada y sincronizada con éxito! Los datos han sido actualizados en el historial de confiabilidad.
          </div>
        )}
      </form>
    </div>
  )
}
