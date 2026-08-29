 'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([
    { email: 'usuario.planta@mkconsulting.com', rol: 'Solicitante', permisos: 'Crear Solicitudes (Amarillo)', pass: 'user123' },
    { email: 'coordinador@mkconsulting.com', rol: 'Planificador', permisos: 'Asignar Técnicos y OTs (Azul)', pass: 'coord123' },
    { email: 'tecnico.mantenimiento@mkconsulting.com', rol: 'Técnico', permisos: 'Llenar Cierre Técnico con Contraseña (Verde)', pass: 'tech123' },
  ])

  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [nuevoRol, setNuevoRol] = useState('Solicitante')
  const [nuevaPass, setNuevaPass] = useState('')
  const [mensajeNotif, setMensajeNotif] = useState('')

  // Cargar usuarios guardados al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('mk_usuarios_cmms')
    if (guardados) {
      try {
        setUsuarios(JSON.parse(guardados))
      } catch (e) {
        console.error("Error al cargar usuarios")
      }
    }
  }, [])

  // Guardar en localStorage cada vez que cambien
  const guardarEnStorage = (nuevosUsuarios: typeof usuarios) => {
    setUsuarios(nuevosUsuarios)
    localStorage.setItem('mk_usuarios_cmms', JSON.stringify(nuevosUsuarios))
  }

  const agregarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoCorreo || !nuevaPass) return

    let perms = 'Crear Solicitudes (Amarillo)'
    if (nuevoRol === 'Planificador') perms = 'Asignar Técnicos y OTs (Azul)'
    if (nuevoRol === 'Técnico') perms = 'Llenar Cierre Técnico con Contraseña (Verde)'

    const actualizados = [...usuarios, { email: nuevoCorreo, rol: nuevoRol, permisos: perms, pass: nuevaPass }]
    guardarEnStorage(actualizados)

    // Simulación de envío de correo de invitación
    setMensajeNotif(`¡Acceso creado! Se envió un correo a ${nuevoCorreo} con su contraseña temporal.`)
    setTimeout(() => setMensajeNotif(''), 5000)

    setNuevoCorreo('')
    setNuevaPass('')
  }

  const eliminarUsuario = (idx: number) => {
    const actualizados = usuarios.filter((_, i) => i !== idx)
    guardarEnStorage(actualizados)
  }

  // Funciones de Descarga Exclusiva para Administrador (Ligeras CSV / SQL)
  const descargarCSV = () => {
    const registrosData = localStorage.getItem('mk_solicitudes_cmms') || '[]'
    const data = JSON.parse(registrosData)
    
    let csvContent = "data:text/csv;charset=utf-8,ID,Fecha,ST,Maquina,Problema,Usuario,Tecnico,OT,TipoMant,Estado\n"
    data.forEach((r: any) => {
      csvContent += `"${r.id}","${r.fechaSolicitud}","${r.st}","${r.maquina}","${r.descripcionProblema.replace(/,/g, '')}","${r.usuario}","${r.tecnicoAsignar}","${r.ot}","${r.tipoMant}","${r.estado}"\n`
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "solicitudes_mantenimiento_mk.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const descargarSQL = () => {
    const registrosData = localStorage.getItem('mk_solicitudes_cmms') || '[]'
    const data = JSON.parse(registrosData)

    let sqlContent = `-- Respaldo de Solicitudes CMMS - MK Consulting\n`
    sqlContent += `CREATE TABLE IF NOT EXISTS solicitudes_mantenimiento (id INT, fecha VARCHAR(50), st VARCHAR(20), maquina VARCHAR(50), problema TEXT);\n`
    
    data.forEach((r: any) => {
      sqlContent += `INSERT INTO solicitudes_mantenimiento VALUES (${r.id}, '${r.fechaSolicitud}', '${r.st}', '${r.maquina}', '${r.descripcionProblema.replace(/'/g, "")}');\n`
    })

    const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'respaldo_cmms_mk.sql'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Panel de Control del Administrador</h1>
            <p className="text-slate-400 text-xs">Gestión centralizada de credenciales, accesos y respaldos de base de datos.</p>
          </div>
          {/* Botones de Descarga Exclusiva Admin */}
          <div className="flex gap-2">
            <button onClick={descargarCSV} className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded text-xs transition shadow">
              📥 Descargar CSV
            </button>
            <button onClick={descargarSQL} className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-3 py-1.5 rounded text-xs transition shadow">
              🗄️ Descargar SQL
            </button>
          </div>
        </div>

        {mensajeNotif && (
          <div className="bg-emerald-950 border border-emerald-700 text-emerald-300 p-3 rounded-lg text-xs mb-4 animate-bounce">
            {mensajeNotif}
          </div>
        )}

        {/* Formulario para Habilitar Usuario y Credencial */}
        <form onSubmit={agregarUsuario} className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6 space-y-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase">Habilitar Nuevo Usuario y Credenciales</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input 
              type="email" 
              placeholder="correo@empresa.com" 
              value={nuevoCorreo} 
              onChange={(e) => setNuevoCorreo(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-xs"
              required 
            />
            <input 
              type="text" 
              placeholder="Contraseña inicial" 
              value={nuevaPass} 
              onChange={(e) => setNuevaPass(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-xs"
              required 
            />
            <select 
              value={nuevoRol} 
              onChange={(e) => setNuevoRol(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-xs"
            >
              <option value="Solicitante">Solicitante (Planta)</option>
              <option value="Planificador">Planificador (Azul)</option>
              <option value="Técnico">Técnico (Verde)</option>
            </select>
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded text-xs transition">
              Crear y Enviar Correo
            </button>
          </div>
        </form>

        {/* Listado de Usuarios Activos */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-700">
              <tr>
                <th className="p-3">Correo Electrónico</th>
                <th className="p-3">Contraseña Asignada</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Permisos</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {usuarios.map((u, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono text-blue-400">{u.email}</td>
                  <td className="p-3 font-mono text-slate-400">{u.pass}</td>
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
    </div>
  )
}
