'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleLogin = async () => {
    setError('')

    if (!email.trim() || !password) {
      setError('Ingrese correo y contraseña.')
      return
    }

    setCargando(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setCargando(false)

    if (authError) {
      setError(authError.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
          <p className="text-xs text-slate-400">Ingrese su correo y contraseña</p>
        </div>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 p-3 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@empresa.com"
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            disabled={cargando}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-sm cursor-pointer"
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </div>
    </div>
  )
}
