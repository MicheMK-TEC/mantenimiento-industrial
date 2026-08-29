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
        { id: 1, equipo: 'Compresor de Tornillo #02', descripcion: 'Fuga de aceite en línea de descarga.', prioridad: 'Alta', planta: 'Planta 01', estado: 'Pendiente', fecha: '2026-08-28' },
        { id: 2, equipo: 'Faja Transportadora L-04', descripcion: 'Desalineación de banda.', prioridad: 'Media', planta: 'Planta 01', estado: 'En Proceso', fecha: '2026-08-27' }
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
      ...nuevaSolicitud,
      estado: 'Pendiente',
      fecha: new Date().toISOString().split('T')[0]
    }

    const actualizadas = [item, ...solicitudes]
    setSolicitudes(actualizadas)
    localStorage.setItem('lista_solicitudes_cmms', JSON.stringify(actualizadas))
    setNuevaSolicitud({ equipo: '', descripcion: '', prioridad: 'Media', planta: 'Planta 01' })
    alert('Solicitud registrada con éxito.')
  }

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    const actualizadas = solicitudes.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s)
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
            <p className="text-xs text-slate-400 mt-1">
              Usuario: <span className="text-amber-400 font-semibold">{usuarioActivo?.correo || 'Invitado'}</span> | Rol: <span className="uppercase text-amber-400 font-bold">{rolActual}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/usuarios')}
              className="bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-xl border border-slate-700 transition cursor-pointer"
            >
              👥 Gestionar Usuarios
            </button>
            <button
              onClick={cerrarSesion}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs
