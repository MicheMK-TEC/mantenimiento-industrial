 'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [rolSeleccionado, setRolSeleccionado] = useState('admin')

  const handleIngresar = (e: React.FormEvent) => {
    e.preventDefault()
    // Guardamos el rol elegido en la memoria del navegador para que la plataforma se adapte
    localStorage.setItem('rol_activo', rolSeleccionado)
    router.push('/dashboard/solicitudes')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Seleccione su perfil de acceso para ingresar a planta</p>
        </div>

        <form onSubmit={handleIngresar} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Perfil / Rol de Usuario:</label>
            <select 
              value={rolSeleccionado} 
              onChange={(e) => setRolSeleccionado(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-amber-400 font-bold text-sm outline-none focus:border-amber-500"
            >
              <option value="admin">👑 Administrador (Acceso Total a todo)</option>
              <option value="coordinador">🛠️ Coordinador / Planificador</option>
              <option value="tecnico">🔧 Técnico de Mantenimiento</option>
              <option value="usuario">👤 Usuario Solicitante (Planta)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            Ingresar a la Plataforma 🚀
          </button>
        </form>
      </div>
    </div>
  )
}
