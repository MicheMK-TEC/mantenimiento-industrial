'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tu correo de Administrador principal vinculado a Vercel
    if (correo.trim().toLowerCase() === 'migaelsc@gmail.com') {
      localStorage.setItem('usuario_activo', JSON.stringify({ correo, rol: 'admin', nombre: 'Míchel Huamán (Admin)' }))
      router.push('/dashboard/solicitudes')
      return
    }

    // Buscar en la lista de usuarios creados por el administrador en la sección Administración
    const usuariosGuardados = JSON.parse(localStorage.getItem('lista_usuarios_planta') || '[]')
    const encontrado = usuariosGuardados.find((u: any) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password)

    if (encontrado) {
      localStorage.setItem('usuario_activo', JSON.stringify(encontrado))
      router.push('/dashboard/solicitudes')
    } else {
      setError('Correo o contraseña incorrectos. Verifique con el Administrador.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Ingrese con su correo registrado (Admin o personal autorizado)</p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 p-3 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico:</label>
            <input 
              type="email" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com" 
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none focus:border-amber-500" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none focus:border-amber-500" 
            />
            <p className="text-[10px] text-slate-500 mt-1">*(Si es administrador con su correo Vercel, puede dejar la contraseña en blanco o usar la asignada).*</p>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg cursor-pointer"
          >
            Iniciar Sesión 🚀
          </button>
        </form>
      </div>
    </div>
  )
}
