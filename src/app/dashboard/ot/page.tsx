'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

type OT = {
  id: string
  otm_code: string
  sol_code: string | null
  asset: string
  maintenance_type: string | null
  scheduled_date: string
  assigned_technician: string
  affected_station: string | null
  parts_used: string | null
  failure_cause: string | null
  work_description: string | null
  status: string | null
}

export default function OtPage() {
  const supabase = createClient()
  const { user, profile } = useAuth()

  const [ordenes, setOrdenes] = useState<OT[]>([])
  const [cargando, setCargando] = useState(true)
  const [abierta, setAbierta] = useState<string | null>(null)
  const [form, setForm] = useState({
    affected_station: '',
    parts_used: '',
    failure_cause: '',
    work_description: '',
  })
  const [error, setError] = useState('')

  const esTecnico = profile?.role === 'TECNICO'

  async function cargar() {
    setCargando(true)
    let query = supabase.from('work_orders').select('*').order('scheduled_date', { ascending: false })

    if (esTecnico && user?.email) {
      query = query.eq('assigned_technician', user.email)
    }

    const { data, error } = await query
    if (error) setError(error.message)
    setOrdenes((data as OT[]) ?? [])
    setCargando(false)
  }

  useEffect(() => {
    cargar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  function abrirOt(ot: OT) {
    setAbierta(ot.id)
    setForm({
      affected_station: ot.affected_station ?? '',
      parts_used: ot.parts_used ?? '',
      failure_cause: ot.failure_cause ?? '',
      work_description: ot.work_description ?? '',
    })
    setError('')
  }

  async function guardarAvance(ot: OT) {
    const { error } = await supabase
      .from('work_orders')
      .update({ ...form, status: 'En proceso' })
      .eq('id', ot.id)

    if (error) {
      setError(error.message)
      return
    }
    cargar()
  }

  async function culminarOt(ot: OT) {
    const { error } = await supabase
      .from('work_orders')
      .update({ ...form, status: 'Culminado', end_time: new Date().toISOString() })
      .eq('id', ot.id)

    if (error) {
      setError(error.message)
      return
    }
    setAbierta(null)
    cargar()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Órdenes de Trabajo</h1>
        <p className="text-sm text-slate-400">
          {esTecnico ? 'Tus órdenes asignadas.' : 'Todas las órdenes de trabajo.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 p-3 rounded-xl text-xs max-w-xl">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {cargando && <p className="text-slate-500 text-sm">Cargando...</p>}
        {!cargando && ordenes.length === 0 && <p className="text-slate-500 text-sm">No hay órdenes de trabajo.</p>}

        {ordenes.map((ot) => (
          <div key={ot.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <p className="text-white font-bold text-sm">{ot.otm_code} — {ot.asset}</p>
                <p className="text-xs text-slate-400">
                  Tipo: {ot.maintenance_type ?? '-'} · Programada: {ot.scheduled_date} · Estado: {ot.status ?? 'Programado'}
                </p>
              </div>
              {esTecnico && ot.status !== 'Culminado' && (
                <button onClick={() => abrirOt(ot)} className="text-blue-400 hover:underline text-xs">
                  {abierta === ot.id ? 'Editando...' : 'Registrar trabajo'}
                </button>
              )}
            </div>

            {abierta === ot.id && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Estación afectada</label>
                  <input
                    value={form.affected_station}
                    onChange={(e) => setForm({ ...form, affected_station: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Repuestos utilizados</label>
                  <input
                    value={form.parts_used}
                    onChange={(e) => setForm({ ...form, parts_used: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Causa de la falla</label>
                  <input
                    value={form.failure_cause}
                    onChange={(e) => setForm({ ...form, failure_cause: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Descripción del trabajo realizado</label>
                  <textarea
                    value={form.work_description}
                    onChange={(e) => setForm({ ...form, work_description: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => guardarAvance(ot)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg text-xs"
                  >
                    Guardar avance
                  </button>
                  <button
                    onClick={() => culminarOt(ot)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-xs"
                  >
                    Culminar OT
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
