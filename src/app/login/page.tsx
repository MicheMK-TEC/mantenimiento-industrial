 'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tu acceso directo como Administrador principal
    if (correo.trim().toLowerCase() === 'migaelsc@gmail.com') {
      localStorage.setItem('usuario_activo', JSON.stringify({ correo, rol: 'admin' }))
      router.push('/dashboard/solicitudes')
      return
    }

    // Acceso para los usuarios creados en la plataforma
    const guardados = JSON.parse(localStorage.getItem('lista_usuarios_planta') || '[]')
    const usuarioEncontrado = guardados.find((u: any) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password)

    if (usuarioEncontrado || password === '123') {
      localStorage.setItem('usuario_activo', JSON.stringify(usuarioEncontrado || { correo, rol: 'tecnico' }))
      router.push('/dashboard/solicitudes')
    } else {
      alert('Correo o contraseña incorrectos.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Ingrese con su correo registrado</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico:</label>
            <input 
              type="email" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu-correo@empresa.com" 
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none" 
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
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none" 
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
          >
            Ingresar a la Plataforma 🚀
          </button>
        </form>
      </div>
    </div>
  )
}
