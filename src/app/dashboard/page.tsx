'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const supabase = createClient()
  const { profile } = useAuth()
  const [solicitudes, setSolicitudes] = useState<{ status: string | null }[]>([])
  const [ordenes, setOrdenes] = useState<{ status: string | null }[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const [{ data: sol }, { data: ot }] = await Promise.all([
        supabase.from('service_requests').select('status'),
        supabase.from('work_orders').select('status'),
      ])
      setSolicitudes(sol ?? [])
      setOrdenes(ot ?? [])
      setCargando(false)
    }
    cargar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function contar(lista: { status: string | null }[], estado: string) {
    return lista.filter((x) => (x.status ?? 'Registrado') === estado).length
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400">Indicadores generales, {profile?.full_name}.</p>
      </div>

      {cargando ? (
        <p className="text-slate-500 text-sm">Cargando indicadores...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-4">Solicitudes</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Registradas: {contar(solicitudes, 'Registrado')}</li>
              <li>Programadas: {contar(solicitudes, 'Programado')}</li>
              <li>En proceso: {contar(solicitudes, 'En proceso')}</li>
              <li className="font-bold text-white pt-2 border-t border-slate-800">Total: {solicitudes.length}</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-4">Órdenes de Trabajo</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Programadas: {contar(ordenes, 'Programado')}</li>
              <li>En proceso: {contar(ordenes, 'En proceso')}</li>
              <li>Culminadas: {contar(ordenes, 'Culminado')}</li>
              <li className="font-bold text-white pt-2 border-t border-slate-800">Total: {ordenes.length}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
