'use client'

import { Fragment, useEffect, useState } from 'react'
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

type Tecnico = { email: string; full_name: string }

const TIPOS_MANTENIMIENTO = ['Correctivo E', 'Preventivo', 'Correctivo P', 'Inspección LL']

export default function SolicitudesPage() {
  const supabase = createClient()
  const { user, profile } = useAuth()

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [cargando, setCargando] = useState(true)
  const [asset, setAsset] = useState('')
  const [description, setDescription] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const [filaAsignando, setFilaAsignando] = useState<string | null>(null)
  const [tecnicoSel, setTecnicoSel] = useState('')
  const [tipoSel, setTipoSel] = useState(TIPOS_MANTENIMIENTO[0])
  const [fechaProgramada, setFechaProgramada] = useState('')
  const [horasPlan, setHorasPlan] = useState('1')

  const esSolicitante = profile?.role === 'SOLICITANTE'
  const puedeAsignar =
    profile?.role === 'SUPERVISOR' || profile?.role === 'ADMINISTRADOR' || profile?.role === 'GERENCIA'

  async function cargarDatos() {
    setCargando(true)
    const { data: sol, error: errSol } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (errSol) setError(errSol.message)
    setSolicitudes((sol as Solicitud[]) ?? [])

    if (puedeAsignar) {
      const { data: tec } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('role', 'TECNICO')
        .eq('is_active', true)
      setTecnicos((tec as Tecnico[]) ?? [])
    }

    setCargando(false)
  }

  useEffect(() => {
    cargarDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  async function crearSolicitud() {
    setError('')
    if (!asset.trim() || !description.trim()) {
      setError('Completa el equipo y la descripción.')
      return
    }
    if (!user?.email) return

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
    cargarDatos()
  }

  function abrirAsignacion(sol: Solicitud) {
    setFilaAsignando(sol.id)
    setTecnicoSel('')
    setTipoSel(TIPOS_MANTENIMIENTO[0])
    setFechaProgramada(new Date().toISOString().slice(0, 10))
    setHorasPlan('1')
    setError('')
  }

  async function confirmarAsignacion(sol: Solicitud) {
    if (!tecnicoSel) {
      setError('Selecciona un técnico.')
      return
    }
    setError('')

    const { error: errOt } = await supabase.from('work_orders').insert({
      sol_code: sol.sol_code,
      asset: sol.asset,
      assigned_technician: tecnicoSel,
      maintenance_type: tipoSel,
      scheduled_date: fechaProgramada,
      planned_hh: Number(horasPlan) || 1,
      status: 'Programado',
    })

    if (errOt) {
      setError(errOt.message)
      return
    }

    await supabase.from('service_requests').update({ status: 'Programado' }).eq('id', sol.id)

    setFilaAsignando(null)
    cargarDatos()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Solicitudes de Mantenimiento</h1>
        <p className="text-sm text-slate-400">Registra, consulta y asigna solicitudes de servicio.</p>
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 p-3 rounded-xl text-xs max-w-xl">
          {error}
        </div>
      )}

      {esSolicitante && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl">
          <h2 className="text-sm font-semibold text-white">Nueva solicitud</h2>
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
              {puedeAsignar && <th className="px-4 py-3">Acción</th>}
            </tr>
          </thead>
          <tbody>
            {cargando && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-500">Cargando...</td>
              </tr>
            )}
            {!cargando && solicitudes.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-500">No hay solicitudes todavía.</td>
              </tr>
            )}
            {solicitudes.map((s) => (
              <Fragment key={s.id}>
                <tr className="border-t border-slate-800 text-slate-200">
                  <td className="px-4 py-3 font-semibold">{s.sol_code}</td>
                  <td className="px-4 py-3">{s.asset}</td>
                  <td className="px-4 py-3">{s.description}</td>
                  <td className="px-4 py-3">{s.status ?? 'Registrado'}</td>
                  <td className="px-4 py-3">{s.requester_email}</td>
                  <td className="px-4 py-3">{s.created_at ? new Date(s.created_at).toLocaleString() : '-'}</td>
                  {puedeAsignar && (
                    <td className="px-4 py-3">
                      {(s.status ?? 'Registrado') === 'Registrado' ? (
                        <button onClick={() => abrirAsignacion(s)} className="text-blue-400 hover:underline">
                          Asignar
                        </button>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  )}
                </tr>
                {filaAsignando === s.id && (
                  <tr className="bg-slate-800/50 border-t border-slate-800">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="flex flex-wrap gap-3 items-end">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Técnico</label>
                          <select
                            value={tecnicoSel}
                            onChange={(e) => setTecnicoSel(e.target.value)}
                            className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white"
                          >
                            <option value="">Selecciona...</option>
                            {tecnicos.map((t) => (
                              <option key={t.email} value={t.email}>
                                {t.full_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Tipo</label>
                          <select
                            value={tipoSel}
                            onChange={(e) => setTipoSel(e.target.value)}
                            className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white"
                          >
                            {TIPOS_MANTENIMIENTO.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Fecha programada</label>
                          <input
                            type="date"
                            value={fechaProgramada}
                            onChange={(e) => setFechaProgramada(e.target.value)}
                            className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Horas plan.</label>
                          <input
                            type="number"
                            value={horasPlan}
                            onChange={(e) => setHorasPlan(e.target.value)}
                            className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white w-20"
                          />
                        </div>
                        <button
                          onClick={() => confirmarAsignacion(s)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-xs"
                        >
                          Generar OT
                        </button>
                        <button
                          onClick={() => setFilaAsignando(null)}
                          className="text-slate-400 hover:text-white text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
