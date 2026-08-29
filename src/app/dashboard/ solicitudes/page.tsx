'use client'
import { useState, useEffect } from 'react'

const TECNICOS = ['JOSEVP', 'JORGEPR', 'IRVNGED', 'KAISERQW']

export default function SolicitudesPage() {
  const [sesion, setSesion] = useState<any>(null)
  const [registros, setRegistros] = useState<any[]>([])
  const [modal, setModal] = useState<any>(null)
  const [modalTipo, setModalTipo] = useState('')

  const [maquina, setMaquina] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem('usuario_activo') || 'null')
    setSesion(activo)
    const guardados = JSON.parse(localStorage.getItem('lista_solicitudes_cmms') || '[]')
    setRegistros(guardados)
  }, [])

  const guardar = (lista: any[]) => {
    setRegistros(lista)
    localStorage.setItem('lista_solicitudes_cmms', JSON.stringify(lista))
  }

  const crearSolicitud = (e: React.FormEvent) => {
    e.preventDefault()
    const numero = registros.length + 1
    const nuevo = {
      id: Date.now(),
      fechaSolicitud: new Date().toLocaleString(),
      st: `ST-${String(numero).padStart(4, '0')}`,
      maquina,
      descripcion,
      usuario: sesion.id,
      tecnicoAsignado: '',
      ot: '',
      tipoMant: '',
      estado: 'Registrado',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: ''
    }
    guardar([nuevo, ...registros])
    setMaquina('')
    setDescripcion('')
  }

  const guardarGestor = () => {
    const tec = (document.getElementById('gTecnico') as HTMLSelectElement).value
    const tipo = (document.getElementById('gTipo') as HTMLSelectElement).value
    const est = (document.getElementById('gEstado') as HTMLSelectElement).value
    const numeroOt = registros.filter(r => r.ot).length + 1
    const actualizado = registros.map(r =>
      r.id === modal.id
        ? { ...r, tecnicoAsignado: tec, tipoMant: tipo, estado: est, ot: r.ot || `OTM-${String(numeroOt).padStart(4, '0')}` }
        : r
    )
    guardar(actualizado)
    setModal(null)
  }

  const guardarTecnico = () => {
    const estacion = (document.getElementById('tEstacion') as HTMLInputElement).value
    const rep = (document.getElementById('tRepuestos') as HTMLInputElement).value
    const cau = (document.getElementById('tCausa') as HTMLInputElement).value
    const desc = (document.getElementById('tDescripcion') as HTMLTextAreaElement).value
    const fin = (document.getElementById('tFechaFin') as HTMLInputElement).value
    const actualizado = registros.map(r =>
      r.id === modal.id
        ? { ...r, estacionAfectada: estacion, repuestos: rep, causa: cau, descripcionTecnico: desc, fechaFin: fin, estado: 'Terminado' }
        : r
    )
    guardar(actualizado)
    setModal(null)
  }

  const descargarCSV = () => {
    const encabezados = ['Fecha Solicitud', 'N ST', 'Maquina', 'Descripcion Problema', 'Usuario', 'Tecnico Asignado', 'N OT', 'Tipo Mant', 'Estado', 'Estacion Afectada', 'Repuestos', 'Causa', 'Descripcion Tecnico', 'Fecha Fin']
    const filas = registros.map(r => [
      r.fechaSolicitud, r.st, r.maquina, r.descripcion, r.usuario, r.tecnicoAsignado, r.ot, r.tipoMant, r.estado, r.estacionAfectada, r.repuestos, r.causa, r.descripcionTecnico, r.fechaFin
    ])
    let csv = encabezados.join(',') + '\n'
    filas.forEach(fila => {
      csv += fila.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',') + '\n'
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'solicitudes_mantenimiento.csv'
    link.click()
  }

  if (!sesion) return <div className="text-white p-8">Cargando...</div>

  const rol = sesion.rol
  const registrosVisibles = rol === 'tecnico' ? registros.filter(r => r.tecnicoAsignado === sesion.id) : registros

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div>
          <h1 className="text-xl font-bold text-white">Solicitudes de Mantenimiento</h1>
          <p className="text-xs text-slate-400">Usuario: <span className="text-amber-400 font-bold">{sesion.id}</span> | Rol: <span className="uppercase text-amber-400 font-bold">{rol}</span></p>
        </div>
        {rol === 'admin' && (
          <button onClick={descargarCSV} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-sm cursor-pointer">
            Descargar CSV
          </button>
        )}
      </div>

      {rol === 'usuario' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold uppercase text-amber-400">Registrar Nueva Solicitud</h2>
          <form onSubmit={crearSolicitud} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={maquina} onChange={e => setMaquina(e.target.value)} placeholder="Maquina / Equipo" className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs text-white" required />
            <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripcion del problema" className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs text-white" required />
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-3 rounded-xl text-xs cursor-pointer">Registrar Solicitud</button>
          </form>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="text-center font-bold">
              <th colSpan={5} className="bg-amber-100 text-amber-950 py-2 border-r border-amber-300">SOLICITUD (Usuario)</th>
              <th colSpan={4} className="bg-blue-900 text-white py-2 border-r border-blue-700">Gestor</th>
              <th colSpan={5} className="bg-emerald-900 text-white py-2">Técnico</th>
            </tr>
            <tr className="bg-slate-950 text-slate-300 border-b border-slate-700">
              <th className="p-2 border-r border-slate-800">Fecha</th>
              <th className="p-2 border-r border-slate-800">N° ST</th>
              <th className="p-2 border-r border-slate-800">Máquina</th>
              <th className="p-2 border-r border-slate-800">Descripción</th>
              <th className="p-2 border-r border-slate-700">Usuario</th>
              <th className="p-2 border-r border-blue-950 bg-blue-950/40">Técnico</th>
              <th className="p-2 border-r border-blue-950 bg-blue-950/40">N° OT</th>
              <th className="p-2 border-r border-blue-950 bg-blue-950/40">Tipo Mant</th>
              <th className="p-2 border-r border-slate-700 bg-blue-950/40">Estado</th>
              <th className="p-2 border-r border-emerald-950 bg-emerald-950/40">Estación</th>
              <th className="p-2 border-r border-emerald-950 bg-emerald-950/40">Repuestos</th>
              <th className="p-2 border-r border-emerald-950 bg-emerald-950/40">Causa</th>
              <th className="p-2 border-r border-emerald-950 bg-emerald-950/40">Descripción</th>
              <th className="p-2 bg-emerald-950/40">Fecha Fin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {registrosVisibles.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50">
                <td className="p-2 border-r border-slate-800">{item.fechaSolicitud}</td>
                <td className="p-2 border-r border-slate-800 text-amber-400 font-bold">{item.st}</td>
                <td className="p-2 border-r border-slate-800">{item.maquina}</td>
                <td className="p-2 border-r border-slate-800 max-w-xs truncate">{item.descripcion}</td>
                <td className="p-2 border-r border-slate-700">{item.usuario}</td>
                <td
                  onClick={() => { if (rol === 'gestor' || rol === 'admin') { setModal(item); setModalTipo('gestor') } }}
                  className={`p-2 border-r border-blue-950/40 bg-blue-950/10 ${(rol === 'gestor' || rol === 'admin') ? 'cursor-pointer hover:bg-blue-900/30' : ''}`}
                >
                  {item.tecnicoAsignado || (rol === 'gestor' || rol === 'admin' ? 'Asignar ✏️' : '-')}
                </td>
                <td className="p-2 border-r border-blue-950/40 bg-blue-950/10">{item.ot || '-'}</td>
                <td className="p-2 border-r border-blue-950/40 bg-blue-950/10">{item.tipoMant || '-'}</td>
                <td className="p-2 border-r border-slate-700 bg-blue-950/10">{item.estado}</td>
                <td
                  onClick={() => { if (rol === 'tecnico' || rol === 'admin') { setModal(item); setModalTipo('tecnico') } }}
                  className={`p-2 border-r border-emerald-950/40 bg-emerald-950/10 ${(rol === 'tecnico' || rol === 'admin') ? 'cursor-pointer hover:bg-emerald-900/30' : ''}`}
                >
                  {item.estacionAfectada || (rol === 'tecnico' || rol === 'admin' ? 'Llenar ✏️' : '-')}
                </td>
                <td className="p-2 border-r border-emerald-950/40 bg-emerald-950/10">{item.repuestos || '-'}</td>
                <td className="p-2 border-r border-emerald-950/40 bg-emerald-950/10">{item.causa || '-'}</td>
                <td className="p-2 border-r border-emerald-950/40 bg-emerald-950/10">{item.descripcionTecnico || '-'}</td>
                <td className="p-2 bg-emerald-950/10">{item.fechaFin || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && modalTipo === 'gestor' && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-blue-600 p-6 rounded-xl max-w-md w-full space-y-3">
            <h2 className="text-lg font-bold text-blue-400">Asignar y Programar ({modal.st})</h2>
            <select id="gTecnico" defaultValue={modal.tecnicoAsignado} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
              <option value="">Seleccione técnico</option>
              {TECNICOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select id="gTipo" defaultValue={modal.tipoMant} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
              <option value="">Tipo de mantenimiento</option>
              <option value="Correctivo E">Correctivo E</option>
              <option value="Preventivo">Preventivo</option>
              <option value="Correctivo P">Correctivo P</option>
              <option value="Inspección LL">Inspección LL</option>
            </select>
            <select id="gEstado" defaultValue={modal.estado} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
              <option value="Registrado">Registrado</option>
              <option value="Programado">Programado</option>
              <option value="En proceso">En proceso</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button onClick={guardarGestor} className="flex-1 bg-blue-600 text-white font-bold py-2 rounded text-xs cursor-pointer">Guardar</button>
              <button onClick={() => setModal(null)} className="bg-slate-700 text-white py-2 px-4 rounded text-xs cursor-pointer">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modal && modalTipo === 'tecnico' && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-emerald-600 p-6 rounded-xl max-w-md w-full space-y-3">
            <h2 className="text-lg font-bold text-emerald-400">Cierre Técnico ({modal.ot})</h2>
            <input id="tEstacion" type="text" defaultValue={modal.estacionAfectada} placeholder="Estación afectada" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
            <input id="tRepuestos" type="text" defaultValue={modal.repuestos} placeholder="Repuestos utilizados" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
            <input id="tCausa" type="text" defaultValue={modal.causa} placeholder="Causa" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
            <textarea id="tDescripcion" defaultValue={modal.descripcionTecnico} placeholder="Descripción del trabajo" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs h-20" />
            <input id="tFechaFin" type="datetime-local" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
            <div className="flex gap-2 pt-2">
              <button onClick={guardarTecnico} className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded text-xs cursor-pointer">Guardar Cierre</button>
              <button onClick={() => setModal(null)} className="bg-slate-700 text-white py-2 px-4 rounded text-xs cursor-pointer">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
