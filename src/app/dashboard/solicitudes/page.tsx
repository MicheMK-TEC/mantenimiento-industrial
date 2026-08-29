'use client'
import { useState, useEffect } from 'react'

export default function SolicitudesMantenimientoPage() {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      fechaSolicitud: '02/03/2026 16:00:00',
      st: 'ST-0001',
      maquina: 'TMF-01',
      descripcionProblema: 'Apoyo en la tmf.1 (necesitamos evaluar una guarda a los piñones)',
      usuario: 'H.F',
      tecnicoAsignar: 'ELECTRICO',
      ot: 'OTM -0001',
      tipoMant: 'Correctivo E.',
      estado: 'En proceso',
      estacionAfectada: 'Zana 01',
      repuestos: 'Guarda metalica (1)',
      causa: 'Desgaste mecánico',
      descripcionTecnico: 'Instalación de protección completada',
      fechaFin: '02/03/2026 18:00:00'
    },
    {
      id: 2,
      fechaSolicitud: '03/03/2026 16:00:00',
      st: 'ST-0002',
      maquina: 'EXT - 02',
      descripcionProblema: 'Baja de temperatura en zona 10',
      usuario: 'JZ',
      tecnicoAsignar: 'MECANICO',
      ot: 'OTM -0002',
      tipoMant: 'Preventivo',
      estado: 'PROGRAMADO',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '-'
    }
  ])

  // Cargar de localStorage
  useEffect(() => {
    const guardados = localStorage.getItem('mk_registros_solicitudes')
    if (guardados) {
      try { setRegistros(JSON.parse(guardados)) } catch (e) {}
    }
  }, [])

  const actualizarYGuardarpy = (nuevos: typeof registros) => {
    setRegistros(nuevos)
    localStorage.setItem('mk_registros_solicitudes', JSON.stringify(nuevos))
  }

  // Modales
  const [modalNueva, setModalNueva] = useState(false)
  const [modalPlanificador, setModalPlanificador] = useState<any>(null)
  const [modalTecnico, setModalTecnico] = useState<any>(null)
  const [modalAdminTotal, setModalAdminTotal] = useState<any>(null) // Edición total Admin

  // Campos nueva solicitud
  const [maq, setMaq] = useState('TMF-01')
  const [desc, setDesc] = useState('')
  const [usr, setUsr] = useState('H.F')

  const eliminarSolicitud = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta solicitud permanentemente? (Permiso de Administrador)')) {
      const actualizados = registros.filter(r => r.id !== id)
      actualizarYGuardarpy(actualizados)
    }
  }

  const crearSolicitud = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevo = {
      id: Date.now(),
      fechaSolicitud: new Date().toLocaleString(),
      st: `ST-000${registros.length + 1}`,
      maquina: maq,
      descripcionProblema: desc,
      usuario: usr,
      tecnicoAsignar: 'PENDIENTE',
      ot: `OTM -000${registros.length + 1}`,
      tipoMant: 'Correctivo',
      estado: 'Registrado',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '-'
    }
    actualizarYGuardarpy([nuevo, ...registros])
    setModalNueva(false)
    setDesc('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md">
        <div>
          <h1 className="text-xl font-bold text-white">Solicitudes de Mantenimiento</h1>
          <p className="text-xs text-slate-400">Control unificado: Solicitud, Coordinador, Técnico y Edición Total de Administrador.</p>
        </div>
        <button 
          onClick={() => setModalNueva(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition shadow"
        >
          + Nueva Solicitud
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-700 text-center font-bold">
              <th colSpan={5} className="bg-amber-100 text-amber-950 py-2.5 px-3 border-r border-amber-300">
                SOLICITUDES (Usuario)
              </th>
              <th colSpan={4} className="bg-blue-900 text-white py-2.5 px-3 border-r border-blue-700">
                Coordinador
              </th>
              <th colSpan={5} className="bg-emerald-900 text-white py-2.5 px-3 border-r border-emerald-700">
                Técnico
              </th>
              <th className="bg-slate-950 text-amber-400 py-2.5 px-3">Gestión Admin</th>
            </tr>
            <tr className="bg-slate-950 text-slate-300 border-b border-slate-700 text-[11px]">
              <th className="p-2.5 border-r border-slate-800">Fecha y Hora</th>
              <th className="p-2.5 border-r border-slate-800">Nº S.T</th>
              <th className="p-2.5 border-r border-slate-800">MÁQUINA</th>
              <th className="p-2.5 border-r border-slate-800 max-w-xs">DESCRIPCIÓN</th>
              <th className="p-2.5 border-r border-slate-700">Usuario</th>

              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">TÉCNICO</th>
              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">N.º OT</th>
              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">TIPO MANT</th>
              <th className="p-2.5 border-r border-slate-700 bg-blue-950/50">Estado</th>

              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">ESTACIÓN</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">REPUESTOS</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">CAUSA</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">DESC. TÉCNICO</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">Fecha Fin</th>
              
              <th className="p-2.5 text-center">Acciones Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {registros.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/60 transition">
                <td className="p-2.5 border-r border-slate-800 font-mono text-slate-300">{item.fechaSolicitud}</td>
                <td className="p-2.5 border-r border-slate-800 font-bold text-amber-400">{item.st}</td>
                <td className="p-2.5 border-r border-slate-800 font-semibold text-white">{item.maquina}</td>
                <td className="p-2.5 border-r border-slate-800 max-w-xs truncate text-slate-300">{item.descripcionProblema}</td>
                <td className="p-2.5 border-r border-slate-700 font-bold text-center text-amber-300">{item.usuario}</td>

                <td onClick={() => setModalPlanificador(item)} className="p-2.5 border-r border-blue-950/50 bg-blue-950/20 text-blue-300 font-medium cursor-pointer hover:bg-blue-900/40">
                  {item.tecnicoAsignar} ✏️
                </td>
                <td className="p-2.5 border-r border-blue-950/50 bg-blue-950/20 font-bold text-white">{item.ot}</td>
                <td className="p-2.5 border-r border-blue-950/50 bg-blue-950/20 text-slate-300">{item.tipoMant}</td>
                <td className="p-2.5 border-r border-slate-700 bg-blue-950/20">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.estado === 'Registrado' ? 'text-amber-400 italic bg-amber-950/40 border border-amber-800' :
                    item.estado === 'PROGRAMADO' ? 'text-blue-300 bg-blue-900/40 border border-blue-700' :
                    'text-emerald-300 bg-emerald-950/40 border border-emerald-800'
                  }`}>
                    {item.estado}
                  </span>
                </td>

                <td onClick={() => setModalTecnico(item)} className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-300 cursor-pointer hover:bg-emerald-900/30">{item.estacionAfectada || '✏️ Llenar'}</td>
                <td onClick={() => setModalTecnico(item)} className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-300 cursor-pointer hover:bg-emerald-900/30">{item.repuestos || '-'}</td>
                <td onClick={() => setModalTecnico(item)} className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-300 cursor-pointer hover:bg-emerald-900/30">{item.causa || '-'}</td>
                <td onClick={() => setModalTecnico(item)} className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-300 cursor-pointer hover:bg-emerald-900/30">{item.descripcionTecnico || '-'}</td>
                <td className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 font-mono text-slate-300">{item.fechaFin}</td>

                {/* Acciones de Administrador: Editar Todo y Eliminar */}
                <td className="p-2.5 text-center flex items-center justify-center gap-1.5">
                  <button 
                    onClick={() => setModalAdminTotal(item)}
                    className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-2 py-1 rounded text-[10px] font-bold transition"
                    title="Editar cualquier campo (Admin)"
                  >
                    🛠️ Editar Todo
                  </button>
                  <button 
                    onClick={() => eliminarSolicitud(item.id)}
                    className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-2 py-1 rounded text-[10px] font-bold transition"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Nueva Solicitud */}
      {modalNueva && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Registrar Solicitud (Usuario)</h2>
            <form onSubmit={crearSolicitud} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Máquina / Equipo:</label>
                <select value={maq} onChange={(e) => setMaq(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
                  <option value="TMF-01">TMF-01</option>
                  <option value="EXT - 02">EXT - 02</option>
                  <option value="TOL - 01">TOL - 01</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción del Problema:</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Detalle la falla..." className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs h-24" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Iniciales Usuario:</label>
                <input type="text" value={usr} onChange={(e) => setUsr(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs uppercase" maxLength={3} required />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-amber-500 text-slate-950 font-bold py-2 rounded text-xs">Guardar</button>
                <button type="button" onClick={() => setModalNueva(false)} className="bg-slate-700 text-white py-2 px-4 rounded text-xs">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Planificador */}
      {modalPlanificador && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-blue-600 p-6 rounded-xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-blue-400">Actualizar Coordinador ({modalPlanificador.st})</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Técnico a Asignar:</label>
                <input type="text" defaultValue={modalPlanificador.tecnicoAsignar} id="inpTecnico" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Mantenimiento:</label>
                <select id="inpTipo" defaultValue={modalPlanificador.tipoMant} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
                  <option value="Correctivo E.">Correctivo E.</option>
                  <option value="Preventivo">Preventivo</option>
                  <option value="Correctivo P">Correctivo P</option>
                  <option value="Servicio General">Servicio General</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estado de la Orden:</label>
                <select id="inpEstado" defaultValue={modalPlanificador.estado} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
                  <option value="Registrado">Registrado</option>
                  <option value="PROGRAMADO">PROGRAMADO</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Terminado">Terminado</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => {
                    const tech = (document.getElementById('inpTecnico') as HTMLInputElement).value;
                    const tipo = (document.getElementById('inpTipo') as HTMLSelectElement).value;
                    const est = (document.getElementById('inpEstado') as HTMLSelectElement).value;
                    const actualizados = registros.map(r => r.id === modalPlanificador.id ? {...r, tecnicoAsignar: tech, tipoMant: tipo, estado: est} : r);
                    actualizarYGuardarpy(actualizados);
                    setModalPlanificador(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded text-xs"
                >
                  Guardar Cambios
                </button>
                <button onClick={() => setModalPlanificador(null)} className="bg-slate-700 text-white py-2 px-4 rounded text-xs">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Técnico */}
      {modalTecnico && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-emerald-600 p-6 rounded-xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-emerald-400">Cierre Técnico ({modalTecnico.ot})</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estación Afectada:</label>
                <input id="tecEstacion" type="text" defaultValue={modalTecnico.estacionAfectada} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Repuestos Utilizados:</label>
                <input id="tecRepuestos" type="text" defaultValue={modalTecnico.repuestos} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Causa de la Falla:</label>
                <input id="tecCausa" type="text" defaultValue={modalTecnico.causa} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción del Trabajo:</label>
                <textarea id="tecDesc" defaultValue={modalTecnico.descripcionTecnico} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs h-20" />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => {
                    const estAfectada = (document.getElementById('tecEstacion') as HTMLInputElement).value;
                    const rep = (document.getElementById('tecRepuestos') as HTMLInputElement).value;
                    const cau = (document.getElementById('tecCausa') as HTMLInputElement).value;
                    const descT = (document.getElementById('tecDesc') as HTMLTextAreaElement).value;

                    const actualizados = registros.map(r => r.id === modalTecnico.id ? {
                      ...r, 
                      estacionAfectada: estAfectada, 
                      repuestos: rep, 
                      causa: cau, 
                      descripcionTecnico: descT, 
                      estado: 'Terminado',
                      fechaFin: new Date().toLocaleString()
                    } : r);
                    actualizarYGuardarpy(actualizados);
                    setModalTecnico(null);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded text-xs"
                >
                  Guardar Cierre
                </button>
                <button onClick={() => setModalTecnico(null)} className="bg-slate-700 text-white py-2 px-4 rounded text-xs">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADMIN TOTAL: Permite editar cualquier campo (amarillo, azul y verde) */}
      {modalAdminTotal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border-2 border-amber-500 p-6 rounded-xl max-w-lg w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-amber-400">🛠️ Panel de Edición Total Administrador ({modalAdminTotal.st})</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-amber-200 mb-1">Máquina (Usuario):</label>
                <input id="admMaq" type="text" defaultValue={modalAdminTotal.maquina} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
              </div>
              <div>
                <label className="block font-semibold text-amber-200 mb-1">Descripción del Problema (Usuario):</label>
                <textarea id="admDescP" defaultValue={modalAdminTotal.descripcionProblema} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white h-16" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-blue-300 mb-1">Técnico Asignado:</label>
                  <input id="admTec" type="text" defaultValue={modalAdminTotal.tecnicoAsignar} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
                </div>
                <div>
                  <label className="block font-semibold text-blue-300 mb-1">Nº OT:</label>
                  <input id="admOT" type="text" defaultValue={modalAdminTotal.ot} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-blue-300 mb-1">Tipo de Mantenimiento:</label>
                  <input id="admTipo" type="text" defaultValue={modalAdminTotal.tipoMant} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
                </div>
                <div>
                  <label className="block font-semibold text-blue-300 mb-1">Estado:</label>
                  <input id="admEstado" type="text" defaultValue={modalAdminTotal.estado} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-emerald-300 mb-1">Estación Afectada (Técnico):</label>
                <input id="admEstacion" type="text" defaultValue={modalAdminTotal.estacionAfectada} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
              </div>
              <div>
                <label className="block font-semibold text-emerald-300 mb-1">Repuestos Utilizados:</label>
                <input id="admRep" type="text" defaultValue={modalAdminTotal.repuestos} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
              </div>
              <div>
                <label className="block font-semibold text-emerald-300 mb-1">Causa:</label>
                <input id="admCausa" type="text" defaultValue={modalAdminTotal.causa} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" />
              </div>
              <div>
                <label className="block font-semibold text-emerald-300 mb-1">Descripción del Técnico:</label>
                <textarea id="admDescT" defaultValue={modalAdminTotal.descripcionTecnico} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white h-16" />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  onClick={() => {
                    const m = (document.getElementById('admMaq') as HTMLInputElement).value;
                    const dp = (document.getElementById('admDescP') as HTMLTextAreaElement).value;
                    const t = (document.getElementById('admTec') as HTMLInputElement).value;
                    const o = (document.getElementById('admOT') as HTMLInputElement).value;
                    const tp = (document.getElementById('admTipo') as HTMLInputElement).value;
                    const st = (document.getElementById('admEstado') as HTMLInputElement).value;
                    const ea = (document.getElementById('admEstacion') as HTMLInputElement).value;
                    const re = (document.getElementById('admRep') as HTMLInputElement).value;
                    const ca = (document.getElementById('admCausa') as HTMLInputElement).value;
                    const dt = (document.getElementById('admDescT') as HTMLTextAreaElement).value;

                    const actualizados = registros.map(r => r.id === modalAdminTotal.id ? {
                      ...r,
                      maquina: m,
                      descripcionProblema: dp,
                      tecnicoAsignar: t,
                      ot: o,
                      tipoMant: tp,
                      estado: st,
                      estacionAfectada: ea,
                      repuestos: re,
                      causa: ca,
                      descripcionTecnico: dt
                    } : r);

                    actualizarYGuardarpy(actualizados);
                    setModalAdminTotal(null);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded"
                >
                  Guardar Todos los Cambios (Admin)
                </button>
                <button onClick={() => setModalAdminTotal(null)} className="bg-slate-700 text-white py-2 px-4 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
