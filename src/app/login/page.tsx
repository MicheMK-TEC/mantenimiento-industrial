'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CORREO_ADMIN = 'migaelschneider@gmail.com'

const USUARIOS_BASE = [
  { id: 'JUANPC', rol: 'usuario' },
  { id: 'ROMEROPS', rol: 'usuario' },
  { id: 'MESSIPS', rol: 'usuario' },
  { id: 'PORDEP', rol: 'usuario' },
  { id: 'ANDREFG', rol: 'gestor' },
  { id: 'MERVINPO', rol: 'gestor' },
  { id: 'DAYANAPE', rol: 'gestor' },
  { id: 'JOSEVP', rol: 'tecnico' },
  { id: 'JORGEPR', rol: 'tecnico' },
  { id: 'IRVNGED', rol: 'tecnico' },
  { id: 'KAISERQW', rol: 'tecnico' },
]

export default function LoginPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const valor = usuario.trim()

    if (valor.toLowerCase() === CORREO_ADMIN.toLowerCase()) {
      localStorage.setItem('usuario_activo', JSON.stringify({ id: 'ADMIN', rol: 'admin' }))
      router.push('/dashboard')
      return
    }

    let listaCompleta = JSON.parse(localStorage.getItem('lista_usuarios_planta') || 'null')
    if (!listaCompleta) {
      listaCompleta = USUARIOS_BASE.map(u => ({ ...u, password: '123' }))
      localStorage.setItem('lista_usuarios_planta', JSON.stringify(listaCompleta))
    }

    const encontrado = listaCompleta.find(
      (u: any) => u.id.toUpperCase() === valor.toUpperCase() && u.password === password
    )

    if (encontrado) {
      localStorage.setItem('usuario_activo', JSON.stringify(encontrado))
      router.push('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Ingrese su usuario o correo de administrador</p>
        </div>
        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 p-3 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Usuario / Correo:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ej. JOSEVP o tu correo"
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
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
