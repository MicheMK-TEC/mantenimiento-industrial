'use client'
import { useState } from 'react'

export default function SolicitudesPage() {
  const [activo, setActivo] = useState('TF01')
  const [otroActivo, setOtroActivo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleCrearSolicitud = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de inserción a Supabase simulada para el ejemplo visual
    setMensaje('¡Solicitud registrada con éxito bajo el código SOL-00001!')
    setDescripcion('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-slate-900 text-white rounded-xl">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <span className="text-xs text-slate-400">Registrados</span>
          <p className="text-2xl font-bold text-amber-400">4</p>
        </div>
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <span className="text-xs text-slate-400">En Proceso</span>
          <p className="text-2xl font-bold text-blue-400">2</p>
        </div>
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <span className="text-xs text-slate-400">Terminados (Hoy)</span>
          <p className="text-2xl font-bold text-emerald-400">5</p>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h1 className="text-lg font-bold mb-4">Nueva Solicitud de Mantenimiento</h1>
        <form onSubmit={handleCrearSolicitud} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Seleccionar Activo:</label>
            <select 
              value={activo} 
              onChange={(e) => setActivo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-sm"
            >
              <option value="TF01">TF01 - Línea de Termoformado 01</option>
              <option value="TF02">TF02 - Línea de Termoformado 02</option>
              <option value="Otros">Otros (Especificar)</option>
            </select>
          </div>

          {activo === 'Otros' && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Especifique el Activo:</label>
              <input 
                type="text" 
                value={otroActivo} 
                onChange={(e) => setOtroActivo(e.target.value)}
                placeholder="Nombre del equipo..." 
                className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-sm"
                required 
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Descripción del Problema:</label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Detalle la anomalía detectada..." 
              className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-sm h-28"
              required 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-2.5 rounded transition">
            Registrar Solicitud
          </button>

          {mensaje && <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded text-sm text-center">{mensaje}</div>}
        </form>
      </div>
    </div>
  )
}
