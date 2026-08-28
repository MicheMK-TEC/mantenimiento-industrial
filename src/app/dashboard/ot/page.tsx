 'use client'
import { useState } from 'react'

export default function OrdenesTrabajoPage() {
  const [tecnico, setTecnico] = useState('')
  const [diagnostico, setDiagnostico] = useState('')
  const [horas, setHoras] = useState('')
  const [guardado, setGuardado] = useState(false)

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    setGuardado(true)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-slate-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div>
            <span className="text-xs font-bold uppercase px-2 py-1 bg-amber-100 text-amber-800 rounded">Pendiente de Ejecución</span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">OTM-2026-001: Línea de Termoformado 01</h2>
          </div>
        </div>

        <form onSubmit={handleGuardar} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Asignar Técnico Responsable:</label>
            <select 
              value={tecnico} 
              onChange={(e) => setTecnico(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded-md bg-white"
              required
            >
              <option value="">Seleccione un técnico...</option>
              <option value="Juan Pérez">Juan Pérez (Mecánica / Soldadura)</option>
              <option value="Carlos Ruiz">Carlos Ruiz (Automatización / Electricidad)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Informe Técnico / Trabajos Realizados:</label>
            <textarea 
              value={diagnostico} 
              onChange={(e) => setDiagnostico(e.target.value)} 
              placeholder="Describa el cambio de repuestos, ajustes o diagnóstico..." 
              className="w-full p-2 border border-slate-300 rounded-md h-28"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Horas Hombre Invertidas (HH):</label>
            <input 
              type="number" 
              step="0.5"
              value={horas} 
              onChange={(e) => setHoras(e.target.value)} 
              placeholder="Ej. 2.0" 
              className="w-full p-2 border border-slate-300 rounded-md"
              required
            />
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-700 transition">
            Guardar Cierre de Orden y Reporte Técnico
          </button>

          {guardado && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-sm mt-4">
              ¡Información registrada correctamente! El reporte del técnico y las horas han sido guardados en el sistema.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
