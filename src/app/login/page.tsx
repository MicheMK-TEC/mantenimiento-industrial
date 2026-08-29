'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CORREO_ADMIN = 'migae@gmail.com'

export default function LoginPage() {
  const router = useRouter()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const correoLimpio = correo.trim().toLowerCase()

    if (correoLimpio === CORREO_ADMIN.toLowerCase()) {
      localStorage.setItem('usuario_activo', JSON.stringify({ correo: correoLimpio, rol: 'admin' }))
      router.push('/dashboard')
      return
    }

    const guardados = JSON.parse(localStorage.getItem('lista_usuarios_planta') || '[]')
    const usuarioEncontrado = guardados.find(
      (u: any) => u.correo.toLowerCase() === correoLimpio && u.password === password
    )

    if (usuarioEncontrado) {
      localStorage.setItem('usuario_activo', JSON.stringify(usuarioEncontrado))
      router.push('/dashboard')
    } else {
      setError('Correo o contraseña incorrectos. Verifique con el Administrador.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Ingrese con su correo y contraseña registrada</p>
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
              placeholder="tu-correo@empresa.com"
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
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
          >
            Ingresar a la Plataforma
          </button>
        </form>
      </div>
    </div>
  )
}
