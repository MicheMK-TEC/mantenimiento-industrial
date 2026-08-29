'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [autorizado, setAutorizado] = useState(false)
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario_activo') || 'null')
    if (!usuario || !usuario.correo) {
      router.replace('/login')
    } else {
      setAutorizado(true)
    }
    setVerificando(false)
  }, [router])

  if (verificando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Verificando acceso...
      </div>
    )
  }

  if (!autorizado) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
