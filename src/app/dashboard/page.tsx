 'use client'
import { useState } from 'react'

export default function OrdenesTrabajoPage() {
  // Simulación de una OTM registrada que llega del solicitante
  const [otm] = useState({
    code: 'OTM-2026-001',
    asset: 'TF01 - Línea de Termoformado 01',
    description: 'Fuga de aceite en cilindro hidráulico principal.',
    status: 'Registrado'
  })

  // Estados de Planificación
  const [plannedHH, setPlannedHH] = useState('4.0')
  const [scheduledDate, setScheduledDate] = useState('2026-03-05')
  const [technician, setTechnician] = useState('Juan Pérez')
  const [currentStatus, setCurrentStatus] = useState('Registrado')

  // Estados de Cierre Técnico
  const [failureCause, setFailureCause] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [repuestos, setRepuestos] = useState([{ name: 'Sello O-Ring 20mm', qty: 2 }])
  const [nuevoRepuesto, setNuevoRepuesto] = useState('')
  const [nuevaCantidad, setNuevaCantidad] = useState(1)
  const [guardadoExitoso, setGuardadoExitoso] = useState(false)

  const agregarRepuesto = () => {
    if (nuevoRepuesto.trim()) {
      setRepuestos([...repuestos, { name: nuevoRepuesto, qty: nuevaCantidad }])
      setNuevoRepuesto('')
      setNuevaCantidad(1)
    }
  }

  const handleGuardarOT = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStatus('Terminado')
    setGuardadoExitoso(true)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Cabecera de la OTM */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-start border-b border-slate-700 pb-4 mb-4">
          <div>
            <span className={`text-xs font-bold uppercase px-3 py-1 rounded border ${
              currentStatus === 'Registrado' ? 'bg-amber-950 text-amber-300 border-amber-800' :
              currentStatus === 'En Proceso' ? 'bg-blue-950 text-blue-300 border-blue-800' :
              'bg-emerald-950 text-emerald-300 border-emerald-800'
            }`}>
              Estado: {currentStatus}
            </span>
            <h1 className="text-2xl font-black text-white mt-2">{otm.code}: {otm.asset}</h1>
            <p className="text-slate-300 text-sm mt-1"><strong className="text-slate-400">Problema reportado:</strong> {otm.description}</p>
          </div>
        </div>

        <form onSubmit={handleGuardarOT} className="space-y-6">
          {/* SECCIÓN 1: PLANIFICACIÓN (Rol Planificador) */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">1. Bloque de Planificación y Asignación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Horas Hombre (HH Programadas):</label>
                <input 
                  type="number" 
                  step="0.5" 
                  value={plannedHH} 
                  onChange={(e) => setPlannedHH(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha Programada:</label>
                <input 
                  type="date" 
                  value={scheduledDate} 
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Técnico Encargado:</label>
                <select 
                  value={technician} 
                  onChange={(e) => setTechnician(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                  required
                >
                  <option value="Juan Pérez">Juan Pérez (Mecánica)</option>
                  <option value="Carlos Ruiz">Carlos Ruiz (Automatización)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: CIERRE TÉCNICO (Rol Técnico - MTTR) */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">2. Formulario de Cierre e Informe Técnico</h2>
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Causa Raíz de la Falla / Diagnóstico:</label>
              <textarea 
                value={failureCause} 
                onChange={(e) => setFailureCause(e.target.value)}
                placeholder="Desgaste prematuro de junta tórica por sobrepresión..."
                className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded text-white text-sm h-24"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha y Hora de Inicio (Técnico):</label>
                <input 
                  type="datetime-local" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha y Hora de Fin (Técnico):</label>
                <input 
                  type="datetime-local" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                  required 
                />
              </div>
            </div>

            {/* Gestión de Repuestos */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Repuestos y Materiales Utilizados:</label>
              <ul className="space-y-1 mb-3">
                {repuestos.map((item, index) => (
                  <li key={index} className="text-xs bg-slate-800 p-2 rounded flex justify-between items-center border border-slate-700">
                    <span className="text-slate-200">{item.name}</span>
                    <span className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded font-mono">Cant: {item.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Nombre del repuesto..." 
                  value={nuevoRepuesto} 
                  onChange={(e) => setNuevoRepuesto(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                />
                <input 
                  type="number" 
                  min="1" 
                  value={nuevaCantidad} 
                  onChange={(e) => setNuevaCantidad(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
                />
                <button 
                  type="button" 
                  onClick={agregarRepuesto} 
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium transition"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg transition"
          >
            Guardar y Registrar Cierre Definitivo de OTM
          </button>

          {guardadoExitoso && (
            <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-lg text-sm text-center">
              ¡Orden de Trabajo cerrada exitosamente! Los datos han sido integrados al motor analítico para el cálculo automático de MTTR y Disponibilidad.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

