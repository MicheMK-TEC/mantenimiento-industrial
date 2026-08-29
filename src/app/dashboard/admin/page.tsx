'use client'
import { useState, useEffect } from 'react'

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState('')
  const [nuevoRol, setNuevoRol] = useState('Gestor de Mantenimiento')

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('lista_usuarios_planta') || '[]')
    if (guardados.length === 0) {
      // Datos iniciales por defecto para tus 10 usuarios
      const iniciales = [
        { correo: 'gestor1@mantenimiento.com', password: '123', rol: 'Gestor de Mantenimiento' },
        { correo: 'gestor2@mantenimiento.com', password: '123', rol: 'Gestor de Mantenimiento' },
        { correo: 'gestor3@mantenimiento.com', password: '123', rol: 'Gestor de Mantenimiento' },
        { correo: 'gestor4@mantenimiento.com', password: '123', rol: 'Gestor de Mantenimiento' },
        { correo: 'tecnico1@mantenimiento.com', password: '123', rol: 'Técnico 1' },
        { correo: 'tecnico2@mantenimiento.com', password: '123', rol: 'Técnico 2' },
        { correo: 'tecnico3@mantenimiento.com', password: '123', rol: 'Técnico 3' },
        { correo: 'tecnico4@mantenimiento.com', password: '123', rol: 'Técnico 4' },
        { correo: 'tecnico5@mantenimiento.com', password: '123', rol: 'Técnico 5' },
        { correo: 'tecnico6@mantenimiento.com', password: '123', rol: 'Técnico 6' },
      ]
      localStorage.setItem('lista_usuarios_planta', JSON.stringify(iniciales))
      setUsuarios(iniciales)
    } else {
      setUsuarios(guardados)
    }
  }, [])

  const agregarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevo = { correo: nuevoCorreo, password: nuevoPassword, rol: nuevoRol }
    const actualizado = [...usuarios, nuevo]
    setUsuarios(actualizado)
    localStorage.setItem('lista_usuarios_planta', JSON.stringify(actualizado))
    setNuevoCorreo('')
    setNuevoPassword('')
    alert('¡Usuario creado con éxito!')
  }

  const eliminarUsuario = (correo: string) => {
    if (confirm(`¿Eliminar acceso a ${correo}?`)) {
      const actualizado = usuarios.filter(u => u.correo !== correo)
      setUsuarios(actualizado)
      localStorage.setItem('lista_usuarios_planta', JSON.stringify(actualizado))
    }
  }

  return (
    <div className="space-y-6 p-6 bg-slate-950 min-h-screen text-white">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h1 className="text-xl font-bold text-amber-400">Panel de Administración de Accesos</h1>
        <p className="text-xs text-slate-400">Crea, asigna y controla los correos y contraseñas para los 4 gestores y técnicos del 1 al 6.</p>

        <form onSubmit={agregarUsuario} className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <input 
            type="email" 
            placeholder="correo@empresa.com" 
            value={nuevoCorreo} 
            onChange={(e) => setNuevoCorreo(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs text-white" 
            required 
          />
          <input 
            type="text" 
            placeholder="Contraseña asignada" 
            value={nuevoPassword} 
            onChange={(e) => setNuevoPassword(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs text-white" 
            required 
          />
          <select 
            value={nuevoRol} 
            onChange={(e) => setNuevoRol(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs text-amber-300 font-bold"
          >
            <option value="Gestor de Mantenimiento">Gestor de Mantenimiento</option>
            <option value="Técnico 1">Técnico 1</option>
            <option value="Técnico 2">Técnico 2</option>
            <option value="Técnico 3">Técnico 3</option>
            <option value="Técnico 4">Técnico 4</option>
            <option value="Técnico 5">Técnico 5</option>
            <option value="Técnico 6">Técnico 6</option>
          </select>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer">
            + Crear Credencial
          </button>
        </form>
      </div>

      {/* Lista de usuarios activos */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">Correo Electrónico</th>
              <th className="p-3">Contraseña Asignada</th>
              <th className="p-3">Rol / Perfil</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {usuarios.map((u, index) => (
              <tr key={index} className="hover:bg-slate-800/50">
                <td className="p-3 font-medium text-amber-300">{u.correo}</td>
                <td className="p-3 font-mono text-slate-300">{u.password}</td>
                <td className="p-3 text-slate-200 font-semibold">{u.rol}</td>
                <td className="p-3 text-center">
                  <button onClick={() => eliminarUsuario(u.correo)} className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
