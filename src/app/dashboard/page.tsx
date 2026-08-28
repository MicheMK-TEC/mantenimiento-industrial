 'use client'
import { useState } from 'react'

export default function OrdenesTrabajoPage() {
  const [trabajoRealizado, setTrabajoRealizado] = useState('')
  const [horasHombre, setHorasHombre] = useState('')
  const [estado, setEstado] = useState('En Proceso')
  const [guardado, setGuardado] = useState(false)

  const handleGuardarTecnico = (e: React.FormEvent) => {
    e.preventDefault()
    setGuardado(true)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Órdenes de Trabajo - Ejecución del Técnico</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-6">
        <h3 className="font-bold text-lg text-slate-800 mb-2">Solicitud #101: Falla en Compresora Principal</h3>
        <p className="text-slate-600 text-sm mb-4">Reportado por: Operaciones | Estado actual: <span className="text-amber-600 font-semibold">{estado}</span></p>

        <form onSubmit={handleGuardarTecnico} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Informe Técnico / Acciones Realizadas:</label>
            <textarea 
              value={trabajoRealizado} 
              onChange={(e) => setTrabajoRealizado(e.target.value)}
              placeholder="Describa el diagnóstico, cambio de piezas o soldadura realizada..."
              className="w-full p-2 border border-slate-300 rounded-md h-28"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horas Invertidas (HH):</label>
              <input 
                type="number" 
                value={horasHombre} 
                onChange={(e) => setHorasHombre(e.target.value)}
                placeholder="Ej. 2.5"
                className="w-full p-2 border border-slate-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cambiar Estado de la OT:</label>
              <select 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md"
              >
                <option value="En Proceso">En Proceso</option>
                <option value="Esperando Repuestos">Esperando Repuestos</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 font-medium">
            Guardar Avance Técnico
          </button>

          {guardado && <p className="text-green-600 font-medium mt-2">¡Información del técnico registrada y actualizada correctamente!</p>}
        </form>
      </div>
    </div>
  )
}
