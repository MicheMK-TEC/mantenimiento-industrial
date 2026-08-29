'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([
    { email: 'usuario.planta@mkconsulting.com', rol: 'Solicitante', permisos: 'Crear Solicitudes (Amarillo)' },
    { email: 'coordinador@mkconsulting.com', rol: 'Planificador', permisos: 'Asignar Técnicos y OTs (Azul)' },
    { email: 'tecnico.mantenimiento@mkconsulting.com', rol: 'Técnico', permisos: 'Llenar Cierre Técnico con Contraseña (Verde)' },
  ])

  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [nuevoRol, setNuevoRol] = useState('Solicitante')

  const agregarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    let perms = 'Crear Solicitudes (Amarillo)'
    if (nuevoRol === 'Planificador') perms = 'Asignar Técnicos y OTs (Azul)'
    if (nuevoRol === 'Técnico') perms = 'Llenar Cierre Técnico con Contraseña (Verde)'

    setUsuarios([...usuarios, { email: nuevoCorreo, rol: nuevoRol, permisos: perms }])
    setNuevoCorreo('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
        <h1 className="text-xl font-bold text-white mb-2">Panel de Control del Administrador (Control de Accesos)</h1>
        <p className="text-slate-400 text-sm mb-6">Como Administrador, aquí puedes habilitar cuentas de correo corporativo y definir exactamente hasta dónde pueden cambiar información en el sistema.</p>

        {/* Formulario para dar acceso a nuevo usuario */}
        <form onSubmit={agregarUsuario} className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6 space-y-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase">Habilitar Nuevo Usuario por Correo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input 
              type="email" 
              placeholder="correo.corporativo@empresa.com" 
              value={nuevoCorreo} 
              onChange={(e) => setNuevoCorreo(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-xs"
              required 
            />
            <select 
              value={nuevoRol} 
              onChange={(e) => setNuevoRol(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-xs"
            >
              <option value="Solicitante">Solicitante (Planta)</option>
              <option value="Planificador">Planificador / Coordinador</option>
              <option value="Técnico">Técnico de Mantenimiento</option>
            </select>
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded text-xs transition">
              Habilitar Acceso
            </button>
          </div>
        </form>

        {/* Tabla de Usuarios Habilitados */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-700">
              <tr>
                <th className="p-3">Correo Electrónico</th>
                <th className="p-3">Rol Asignado</th>
                <th className="p-3">Nivel de Acceso Permitido</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {usuarios.map((u, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono text-blue-400">{u.email}</td>
                  <td className="p-3 font-bold">{u.rol}</td>
                  <td className="p-3 text-slate-300">{u.permisos}</td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => setUsuarios(usuarios.filter((_, i) => i !== idx))}
                      className="bg-red-950 text-red-300 border border-red-800 px-2.5 py-1 rounded text-[10px] font-bold"
                    >
                      Revocar Acceso
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
