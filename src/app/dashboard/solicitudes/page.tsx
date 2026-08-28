'use client'
import { useState } from 'react'

export default function SolicitudesPage() {
  const [equipo, setEquipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviado, setEnviado] = useState(false)
  const correlativo = 'OTM-2026-042'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
      <h1 className="text-xl font-bold text-white mb-2">1. Registro de Solicitud de Mantenimiento (Work Request)</h1>
      <p className="text-slate-400 text-sm mb-6">El sistema asignará un código correlativo automático para su posterior conversión en Orden de Trabajo.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Código Correlativo Generado:</label>
          <input type="text" value={correlativo} disabled className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-blue-400 font-mono font-bold" />
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Activo / Equipo:</label>
          <input type="text" value={equipo} onChange={(e) => setEquipo(e.target.value)} placeholder="Ej. Compresora Atlas Copco 02" className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white" required />
        </div>
        <div>
          <label className="block text-xs uppercase font-bold text-slate-300 mb-1">Descripción de la Anomalía:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describa el síntoma o falla detectada..." className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white h-28" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded transition shadow">
          Emitir Solicitud a Planeamiento
        </button>
        {enviado && (
          <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded text-sm mt-4">
            ¡Solicitud registrada correctamente bajo el código <b>{correlativo}</b>! Ya se encuentra disponible en la bandeja de Órdenes de Trabajo para su planificación y asignación técnica.
          </div>
        )}
      </form>
    </div>
  )
}
