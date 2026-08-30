'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

function aCsv(filas: any[]): string {
  if (filas.length === 0) return ''
  const columnas = Object.keys(filas[0])
  const encabezado = columnas.join(',')
  const cuerpo = filas
    .map((f) => columnas.map((c) => `"${String(f[c] ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n')
  return `${encabezado}\n${cuerpo}`
}

function descargar(nombre: string, contenido: string) {
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const supabase = createClient()
  const { profile } = useAuth()
  const [exportando, setExportando] = useState('')

  const esAdmin = profile?.role === 'ADMINISTRADOR'

  async function exportar(tabla: 'service_requests' | 'work_orders' | 'profiles') {
    setExportando(tabla)
    const { data, error } = await supabase.from(tabla).select('*')
    setExportando('')
    if (error || !data) return
    descargar(`${tabla}_${new Date().toISOString().slice(0, 10)}.csv`, aCsv(data))
  }

  if (!esAdmin) {
    return (
      <div className="text-slate-400 text-sm">
        Esta sección es solo para el administrador.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Administración</h1>
        <p className="text-sm text-slate-400">Exportación de datos (solo administrador).</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-md">
        <h2 className="text-sm font-semibold text-white">Exportar a CSV</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => exportar('service_requests')}
            disabled={exportando === 'service_requests'}
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl text-left disabled:opacity-50"
          >
            {exportando === 'service_requests' ? 'Exportando...' : '📄 Solicitudes de mantenimiento'}
          </button>
          <button
            onClick={() => exportar('work_orders')}
            disabled={exportando === 'work_orders'}
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl text-left disabled:opacity-50"
          >
            {exportando === 'work_orders' ? 'Exportando...' : '🛠️ Órdenes de trabajo'}
          </button>
          <button
            onClick={() => exportar('profiles')}
            disabled={exportando === 'profiles'}
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl text-left disabled:opacity-50"
          >
            {exportando === 'profiles' ? 'Exportando...' : '👤 Usuarios'}
          </button>
        </div>
      </div>
    </div>
  )
}
