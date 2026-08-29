'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([
    { email: 'usuario.planta@mkconsulting.com', rol: 'Solicitante', permisos: 'Crear Solicitudes (Amarillo)' },
    { email: 'coordinador@mkconsulting.com', rol: 'Planificador', permisos: 'Asignar Técnicos y OTs (Azul)' },
    { email: 'tecnico.mantenimiento@mkconsulting.com', rol: 'Técnico', permisos: 'Llenar Cierre Técnico con Contraseña (Verde)' },
  ])

  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [nuevoRol, setNuevoRol] = useState('Solicitante')

  // Cargar usuarios guardados al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('mk_usuarios')
    if (guardados) {
      try { setUsuarios(JSON.parse(guardados)) } catch (e) {}
    }
  }, [])

  // Guardar usuarios al actualizar
  const guardarUsuarios = (nuevosUsuarios: typeof usuarios) => {
    setUsuarios(nuevosUsuarios)
    localStorage.setItem('mk_usuarios', JSON.stringify(nuevosUsuarios))
  }

  const agregarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    let perms = 'Crear Solicitudes (Amarillo)'
    if (nuevoRol === 'Planificador') perms = 'Asignar Técnicos y OTs (Azul)'
    if (nuevoRol === 'Técnico') perms = 'Llenar Cierre Técnico con Contraseña (Verde)'
    if (nuevoRol === 'Administrador') perms = 'Acceso Total (Amarillo, Azul, Verde y Gestión)'

    const actualizados = [...usuarios, { email: nuevoCorreo, rol: nuevoRol, permisos: perms }]
    guardarUsuarios(actualizados)
    setNuevoCorreo('')
  }

  const eliminarUsuario = (idx: number) => {
    const actualizados = usuarios.filter((_, i) => i !== idx)
    guardarUsuarios(actualizados)
  }

  // Función para exportar la base de datos a CSV liviano
  const descargarCSV = () => {
    const registrosRaw = localStorage.getItem('mk_registros_solicitudes')
    if (!registrosRaw) {
      alert('No hay registros de solicitudes para exportar.')
      return
    }
    const registros = JSON.parse(registrosRaw)
    
    // Cabeceras del CSV
    let csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Fecha Solicitud,ST,Maquina,Descripcion Problema,Usuario,Tecnico,OT,Tipo Mant,Estado,Estacion,Repuestos,Causa,Desc Tecnico,Fecha Fin\n";

    registros.forEach((r: any) => {
      const fila = [
        r.id,
        `"${r.fechaSolicitud}"`,
        r.st,
        `"${r.maquina}"`,
        `"${r.descripcionProblema.replace(/"/g, '""')}"`,
        r.usuario,
        `"${r.tecnicoAsignar}"`,
        r.ot,
        `"${r.tipoMant}"`,
        r.estado,
        `"${r.estacionAfectada}"`,
        `"${r.repuestos}"`,
        `"${r.causa}"`,
        `"${r.descripcionTecnico.replace(/"/g, '""')}"`,
        `"${r.fechaFin}"`
      ].join(",");
      csvContent += fila + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `base_datos_mantenimiento_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Panel de Control del Administrador</h1>
          <p className="text-slate-400 text-xs">Gestión de accesos, habilitación de usuarios y respaldo de base de datos.</p>
        </div>
        <button 
          onClick={descargarCSV}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition shadow flex items-center gap-2"
        >
          📥 Descargar Base de Datos (CSV)
        </button>
      </div>

      {/* Formulario para dar acceso */}
      <form onSubmit={agregarUsuario} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4 shadow-lg">
        <h2 className="text-sm font-bold text-amber-400 uppercase">Habilitar Nuevo Usuario y Permisos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input 
            type="email" 
            placeholder="correo.corporativo@empresa.com" 
            value={nuevoCorreo} 
            onChange={(e) => setNuevoCorreo(e.target.value)}
            className="bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-xs"
            required 
          />
          <select 
            value={nuevoRol} 
            onChange={(e) => setNuevoRol(e.target.value)}
            className="bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-xs"
          >
            <option value="Solicitante">Solicitante (Planta)</option>
            <option value="Planificador">Planificador / Coordinador</option>
            <option value="Técnico">Técnico de Mantenimiento</option>
            <option value="Administrador">Administrador (Acceso Total)</option>
          </select>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded text-xs transition">
            Guardar y Habilitar Acceso
          </button>
        </div>
      </form>

      {/* Tabla de Usuarios */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-300 border-b border-slate-700">
            <tr>
              <th className="p-3">Correo Electrónico</th>
              <th className="p-3">Rol Asignado</th>
              <th className="p-3">Nivel de Acceso</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-slate-200">
            {usuarios.map((u, idx) => (
              <tr key={idx} className="hover:bg-slate-700/50">
                <td className="p-3 font-mono text-blue-400">{u.email}</td>
                <td className="p-3 font-bold">{u.rol}</td>
                <td className="p-3 text-slate-300">{u.permisos}</td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => eliminarUsuario(idx)}
                    className="bg-red-950 text-red-300 border border-red-800 px-2.5 py-1 rounded text-[10px] font-bold"
                  >
                    Revocar
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
