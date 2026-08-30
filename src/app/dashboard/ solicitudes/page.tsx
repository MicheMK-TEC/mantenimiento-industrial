'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

type Solicitud = {
  id: string
  sol_code: string
  asset: string
  description: string
  status: string | null
  requester_email: string
  created_at: string | null
}

export default function SolicitudesPage() {
  const supabase = createClient()
  const { user, profile } = useAuth()

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [cargando, setCargando] = useState(true)
  const [asset, setAsset] = useState('')
  const [description, setDescription] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const esSolicitante = profile?.role === 'SOLICITANTE'

  async function cargarSolicitudes() {
    setCargando(true)
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setSolicitudes((data as Solicitud[]) ?? [])
    }
    setCargando(false)
  }

  useEffect(() => {
    cargarSolicitudes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function crearSolicitud() {
    setError('')
    if (!asset.trim() || !description.trim()) {
      setError('Completa el equipo y la descripción.')
      return
    }
    if (!user?.email) {
      setError('No se pudo identificar tu correo de usuario.')
      return
    }

    setEnviando(true)
    const { error } = await supabase.from('service_requests').insert({
      asset: asset.trim(),
      description: description.trim(),
      requester_email: user.email,
    })
    setEnviando(false)

    if (error) {
      setError(error.message)
      return
    }

    setAsset('')
    setDescription('')
    cargarSolicitudes()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Solicitudes de Mantenimiento</h1>
        <p className="text-sm text-slate-400">Registra y consulta solicitudes de servicio.</p>
      </div>

      {esSolicitante && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl">
          <h2 className="text-sm font-semibold text-white">Nueva solicitud</h2>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 p-3 rounded-xl text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Máquina / Equipo</label>
            <input
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none"
              placeholder="Ej. Compresor línea 2"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción del problema</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs outline-none"
              rows={3}
              placeholder="Describe la falla..."
            />
          </div>
          <button
            onClick={crearSolicitud}
            disabled={enviando}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-2.5 px-5 rounded-xl text-sm cursor-pointer"
          >
            {enviando ? 'Enviando...' : 'Crear solicitud'}
          </button>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-800 text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-3">ST</th>
              <th className="px-4 py-3">Equipo</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Solicitante</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {cargando && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">Cargando...</td></tr>
            )}
            {!cargando && solicitudes.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">No hay solicitudes todavía.</td></tr>
            )}
            {solicitudes.map((s) => (
              <tr key={s.id} className="border-t border-slate-800 text-slate-200">
                <td className="px-4 py-3 font-semibold">{s.sol_code}</td>
                <td className="px-4 py-3">{s.asset}</td>
                <td className="px-4 py-3">{s.description}</td>
                <td className="px-4 py-3">{s.status ?? 'Registrado'}</td>
                <td className="px-4 py-3">{s.requester_email}</td>
                <td className="px-4 py-3">{s.created_at ? new Date(s.created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
