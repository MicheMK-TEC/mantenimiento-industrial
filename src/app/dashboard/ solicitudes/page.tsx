'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SolicitudesMantenimientoPage() {
  const router = useRouter()
  const [rolActual, setRolActual] = useState('admin')
  const [usuarioActivo, setUsuarioActivo] = useState<any>(null)
  const [solicitudes, setSolicitudes] = useState<any[]>([])
  const [nuevaSolicitud, setNuevaSolicitud] = useState({
    equipo: '',
    descripcion: '',
    prioridad: 'Media',
    planta: 'Planta 01'
  })

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem('usuario_activo') || 'null')
    const rolGuardado = localStorage.getItem('rol_activo')

    if (activo) {
      setUsuarioActivo(activo)
      if (activo.rol) setRolActual(activo.rol)
    } else if (rolGuardado) {
      setRolActual(rolGuardado)
    }

    const solicitudesGuardadas = JSON.parse(localStorage.getItem('lista_solicitudes_cmms') || '[]')
    if (solicitudesGuardadas.length > 0) {
      setSolicitudes(solicitudesGuardadas)
    } else {
      const iniciales = [
        { id: 1, equipo: 'Compresor de Tornillo #02', descripcion: 'Fuga de aceite en linea de descarga.', prioridad: 'Alta', planta: 'Planta 01', estado: 'Pendiente', fecha: '2026-08-28' },
        { id: 2, equipo: 'Faja Transportadora L-04', descripcion: 'Desalineacion de banda.', prioridad: 'Media', planta: 'Planta 01', estado: 'En Proceso', fecha: '2026-08-27' }
      ]
      setSolicitudes(iniciales)
      localStorage.setItem('lista_solicitudes_cmms', JSON.stringify(iniciales))
    }
  }, [])

  const handleCrearSolicitud = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevaSolicitud.equipo || !nuevaSolicitud.descripcion) return

    const item = {
      id: Date.now(),
      equipo: nuevaSolicitud.equipo,
      descripcion: nuevaSolicitud.descripcion,
      prioridad: nuevaSolicitud.prioridad,
      planta: nuevaSolicitud.planta,
      estado: 'Pendiente',
      fecha: new Date().toISOString().split('T')[0]
    }

    const actualizadas = [item, ...solicitudes]
    setSolicitudes(actualizadas)
    localStorage.setItem('lista_solicitudes_cmms', JSON.stringify(actualizadas))
    setNuevaSolicitud({ equipo: '', descripcion: '', prioridad: 'Media', planta: 'Planta 01' })
  }

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    const actualizadas = solicitudes.map(function (s) {
      if (s.id === id) {
        return Object.assign({}, s, { estado: nuevoEstado })
      }
      return s
    })
    setSolicitudes(actualizadas)
    localStorage.setItem('lista_solicitudes_cmms', JSON.stringify(actualizadas))
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_activo')
    localStorage.removeItem('rol_activo')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl gap-4 shadow-xl">
          <div>
            <h1 className="text-xl font-bold text-white">MK CONSULTING - CMMS</h1>
            <p className="text-xs text-slate-400 mt-1">Usuario y rol activo en sesion.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={function () { router.push('/dashboard/admin') }} className="bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-xl border border-slate-700 transition cursor-pointer">
              Gestionar Usuarios
            </button>
            <button onClick={cerrarSesion} className="bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-red-400 text-xs px-4 py-2 rounded-xl border border-red-500 border-opacity-30 transition cursor-pointer">
              Cerrar Sesion
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">Registrar Nueva Solicitud</h2>
          <form onSubmit={handleCrearSolicitud} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Equipo:</label>
              <input type="text" value={nuevaSolicitud.equipo} onChange={function (e) { setNuevaSolicitud(Object.assign({}, nuevaSolicitud, { equipo: e.target.value })) }} placeholder="Ej. Bomba P-01" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs text-white outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Descripcion:</label>
              <input type="text" value={nuevaSolicitud.descripcion} onChange={function (e) { setNuevaSolicitud(Object.assign({}, nuevaSolicitud, { descripcion: e.target.value })) }} placeholder="Detalle el problema" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs text-white outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Prioridad:</label>
              <select value={nuevaSolicitud.prioridad} onChange={function (e) { setNuevaSolicitud(Object.assign({}, nuevaSolicitud, { prioridad: e.target.value })) }} className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs text-white outline-none">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Critica">Critica</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-3 rounded-xl text-xs transition cursor-pointer">
                Crear Solicitud
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Ordenes Registradas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Equipo</th>
                  <th className="p-3">Descripcion</th>
                  <th className="p-3">Prioridad</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {solicitudes.map(function (s) {
                  return (
                    <tr key={s.id} className="hover:bg-slate-800 transition">
                      <td className="p-3 text-slate-400">{s.fecha}</td>
                      <td className="p-3 font-semibold text-white">{s.equipo}</td>
                      <td className="p-3 text-slate-300">{s.descripcion}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-500 bg-opacity-20 text-amber-400">{s.prioridad}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-500 bg-opacity-20 text-blue-400">{s.estado}</span>
                      </td>
                      <td className="p-3 text-center space-x-2">
                        <button onClick={function () { cambiarEstado(s.id, 'En Proceso') }} className="bg-blue-600 bg-opacity-20 hover:bg-opacity-100 text-blue-400 hover:text-white px-2 py-1 rounded text-xs transition cursor-pointer">
                          En Proceso
                        </button>
                        <button onClick={function () { cambiarEstado(s.id, 'Completado') }} className="bg-emerald-600 bg-opacity-20 hover:bg-opacity-100 text-emerald-400 hover:text-white px-2 py-1 rounded text-xs transition cursor-pointer">
                          Completar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
