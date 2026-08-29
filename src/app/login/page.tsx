'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('Administrador (Míchel)')

  const handleIngresar = (e: React.FormEvent) => {
    e.preventDefault()
    // Guardamos el rol activo en el navegador para que la web sepa quién entró
    localStorage.setItem('usuario_activo', usuarioSeleccionado)
    // Redirigimos directo al panel principal o solicitudes
    router.push('/dashboard/solicitudes')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MANTENIMIENTO PRO</h1>
          <p className="text-xs text-slate-400">Seleccione su usuario o rol para ingresar directamente a planta:</p>
        </div>

        <form onSubmit={handleIngresar} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Usuario / Rol Autorizado:</label>
            <select 
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-amber-400 font-bold p-3 rounded-xl text-sm outline-none focus:border-amber-500"
            >
              <option value="Administrador">👑 Administrador (Acceso Total)</option>
              <option value="Coordinador de Mantenimiento">🛠️ Coordinador / Planificador</option>
              <option value="Técnico Mecánico/Eléctrico">🔧 Técnico de Mantenimiento</option>
              <option value="Solicitante Planta 01">👤 Solicitante (Planta 01)</option>
              <option value="Solicitante Planta 02">👤 Solicitante (Planta 02)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            INGRESAR A LA PLATAFORMA DIRECTO
          </button>
        </form>
      </div>
    </div>
  )
}
