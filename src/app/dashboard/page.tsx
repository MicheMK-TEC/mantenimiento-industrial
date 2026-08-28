 'use client'
import { useState } from 'react'

export default function SolicitudesPage() {
  const [equipo, setEquipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se conectará con tu tabla de Supabase para guardar la solicitud
    setMensaje('¡Solicitud registrada con éxito! El equipo de mantenimiento ha sido notificado.')
    setEquipo('')
    setDescripcion('')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Gestión de Solicitudes de Mantenimiento</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Crear Nueva Solicitud de Fallo</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre o Código del Equipo / Activo:</label>
          <input 
            type="text" 
            value={equipo} 
            onChange={(e) => setEquipo(e.target.value)} 
            placeholder="Ej. Compresora Principal 01" 
            className="w-full p-2 border border-slate-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción de la Falla o Requerimiento:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Detalle los síntomas o motivo de la intervención..." 
            className="w-full p-2 border border-slate-300 rounded-md h-24"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
          Registrar Solicitud
        </button>

        {mensaje && <p className="mt-4 text-green-600 font-medium">{mensaje}</p>}
      </form>
    </div>
  )
}
