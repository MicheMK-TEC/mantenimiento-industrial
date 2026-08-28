'use client'
import { useState } from 'react'

export default function SolicitudesPage() {
  // Simulamos un correlativo automático para la planta
  const [codigoOT] = useState('OTM-2026-001')
  const [equipo, setEquipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [exito, setExito] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setExito(true)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-slate-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Registro de Solicitud de Mantenimiento</h1>
        <p className="text-sm text-slate-500 mb-6">El sistema generará un código correlativo para control de planta.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Código Correlativo Asignado:</label>
            <input 
              type="text" 
              value={codigoOT} 
              disabled 
              className="w-full p-2 bg-slate-100 border border-slate-300 rounded-md font-mono font-bold text-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Equipo / Máquina:</label>
            <input 
              type="text" 
              value={equipo} 
              onChange={(e) => setEquipo(e.target.value)} 
              placeholder="Ej. Línea de Termoformado 01" 
              className="w-full p-2 border border-slate-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Descripción de la Falla:</label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              placeholder="Detalle el problema detectado..." 
              className="w-full p-2 border border-slate-300 rounded-md h-24"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Generar Solicitud y Enviar a Mantenimiento
          </button>

          {exito && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-sm mt-4">
              ¡Solicitud registrada con éxito bajo el código <b>{codigoOT}</b>! Ya está lista para la asignación del técnico.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
