 'use client'
import { useState } from 'react'

export default function SolicitudesMasterPage() {
  // Estado con datos de ejemplo idénticos a tu formato industrial
  const [registros, setRegistros] = useState([
    {
      id: 1,
      fechaSolicitud: '02/03/2026 16:00:00',
      st: 'ST-0001',
      maquina: 'TMF-01',
      descripcionProblema: 'Apoyo en la tmf.1 (necesitamos evaluar una guarda a los piñones (contaminación) tardes sujetar o reubicar este sensor en la ext3 para evitar q se pegue material al momento del cambio de malla',
      usuario: 'H.F',
      tecnicoAsignar: 'ELECTRICO',
      ot: 'OTM -0001',
      tipoMant: 'Correctivo E.',
      estado: 'En proceso',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '02/03/2026 16:00:00'
    },
    {
      id: 2,
      fechaSolicitud: '03/03/2026 16:00:00',
      st: 'ST-0002',
      maquina: 'EXT - 02',
      descripcionProblema: 'De nuevo se a bajado la temperatura de la zana 10',
      usuario: 'JZ',
      tecnicoAsignar: 'MECANICO',
      ot: 'OTM -0002',
      tipoMant: 'Preventivo',
      estado: 'PROGRAMADO',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '30/12/1899 15:00:00'
    },
    {
      id: 3,
      fechaSolicitud: '04/03/2026 16:00:00',
      st: 'ST-0003',
      maquina: 'EXT - 02',
      descripcionProblema: 'EL INTERRUPTOR se baja quiero subirla sale chispa y no suve',
      usuario: 'OP',
      tecnicoAsignar: 'ELECTRICO',
      ot: 'OTM -0003',
      tipoMant: 'Correctivo P',
      estado: 'En proceso',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '30/12/1899 18:00:00'
    },
    {
      id: 4,
      fechaSolicitud: '06/03/2026 16:00:00',
      st: 'ST-0005',
      maquina: 'TOL - 01',
      descripcionProblema: 'se necesita q el secafor esre habilitado ni seca el material',
      usuario: 'JZ',
      tecnicoAsignar: 'MECANICO',
      ot: 'OTM -0005',
      tipoMant: 'Inspección L. L',
      estado: 'Registrado',
      estacionAfectada: '',
      repuestos: '',
      causa: '',
      descripcionTecnico: '',
      fechaFin: '30/12/1899 14:00:00'
    }
  ])

  // Modal para nueva solicitud del usuario
  const [modalAbierto, setModalAbierto] = useState(false)
  const [nuevaMaquina, setNuevaMaquina] = useState('TMF-01')
  const [nuevaDesc, setNuevaDesc] = useState('')
  const [nuevoUsuario, setNuevoUsuario] = useState('H.F')

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevoRegistro = {
      id: registros.length + 1,
      fechaSolicitud: new Date().toLocaleString(),
      st: `ST-000${registros.length + 1}`,
      maquina: nuevaMaquina,
      descripcionProblema: nuevaDesc,
      usuario: nuevoUsuario,
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
    setRegistros([nuevoRegistro, ...registros])
    setModalAbierto(false)
    setNuevaDesc('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md">
        <div>
          <h1 className="text-xl font-bold text-white">Matriz General de Solicitudes y Órdenes de Mantenimiento</h1>
          <p className="text-xs text-slate-400">Visualización centralizada por zonas: Solicitante (Amarillo), Coordinador (Azul) y Técnico (Verde).</p>
        </div>
        <button 
          onClick={() => setModalAbierto(true)}
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition shadow"
        >
          + Nueva Solicitud (Usuario)
        </button>
      </div>

      {/* Tabla Maestra con Scroll Horizontal exacto al formato industrial */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
          <thead>
            {/* Cabecera superior por bloques temáticos */}
            <tr className="border-b border-slate-700 text-center font-bold">
              <th colSpan={5} className="bg-amber-100 text-amber-950 py-2.5 px-3 border-r border-amber-300">
                SOLICITUDES (Llenado por el usuario)
              </th>
              <th colSpan={4} className="bg-blue-900 text-white py-2.5 px-3 border-r border-blue-700">
                Actualizar por el Coordinador
              </th>
              <th colSpan={5} className="bg-emerald-900 text-white py-2.5 px-3">
                Ingresar información por el Técnico
              </th>
            </tr>
            {/* Cabecera de Columnas Individuales */}
            <tr className="bg-slate-950 text-slate-300 border-b border-slate-700 text-[11px]">
              <th className="p-2.5 border-r border-slate-800">Fecha de Solicitud y Hora</th>
              <th className="p-2.5 border-r border-slate-800">Nº S.T</th>
              <th className="p-2.5 border-r border-slate-800">MAQUINA / EQUIPO</th>
              <th className="p-2.5 border-r border-slate-800 max-w-xs">DESCRIPCIÓN DEL PROBLEMA</th>
              <th className="p-2.5 border-r border-slate-700">Usuario</th>

              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">TÉCNICO a ASIGNAR</th>
              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">N.º OT</th>
              <th className="p-2.5 border-r border-blue-950 bg-blue-950/50">TIPO DE MANT</th>
              <th className="p-2.5 border-r border-slate-700 bg-blue-950/50">Estado</th>

              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">ESTACIÓN AFECTADA</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">REPUESTOS UTILIZADOS</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">CAUSA</th>
              <th className="p-2.5 border-r border-emerald-950 bg-emerald-950/50">DESCRIPCIÓN</th>
              <th className="p-2.5 bg-emerald-950/50">Fecha y Hora Finalizada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {registros.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/60 transition">
                {/* ZONA AMARILLA (Datos Usuario) */}
                <td className="p-2.5 border-r border-slate-800 font-mono text-slate-300">{item.fechaSolicitud}</td>
                <td className="p-2.5 border-r border-slate-800 font-bold text-amber-400">{item.st}</td>
                <td className="p-2.5 border-r border-slate-800 font-semibold text-white">{item.maquina}</td>
                <td className="p-2.5 border-r border-slate-800 max-w-xs truncate text-slate-300" title={item.descripcionProblema}>
                  {item.descripcionProblema}
                </td>
                <td className="p-2.5 border-r border-slate-700 font-bold text-center text-amber-300">{item.usuario}</td>

                {/* ZONA AZUL (Datos Coordinador / Planificador) */}
                <td className="p-2.5 border-r border-blue-950/50 bg-blue-950/20 text-blue-300 font-medium">{item.tecnicoAsignar}</td>
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

                {/* ZONA VERDE (Datos Técnico) */}
                <td className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-400">{item.estacionAfectada || '-'}</td>
                <td className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-400">{item.repuestos || '-'}</td>
                <td className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-400">{item.causa || '-'}</td>
                <td className="p-2.5 border-r border-emerald-950/50 bg-emerald-950/10 text-slate-400">{item.descripcionTecnico || '-'}</td>
                <td className="p-2.5 bg-emerald-950/10 font-mono text-slate-300">{item.fechaFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para registrar nueva solicitud */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Registrar Nueva Solicitud (Usuario)</h2>
            <form onSubmit={handleCrear} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Máquina / Equipo:</label>
                <select value={nuevaMaquina} onChange={(e) => setNuevaMaquina(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs">
                  <option value="TMF-01">TMF-01</option>
                  <option value="EXT - 02">EXT - 02</option>
                  <option value="TOL - 01">TOL - 01</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción del Problema:</label>
                <textarea value={nuevaDesc} onChange={(e) => setNuevaDesc(e.target.value)} placeholder="Describa la falla..." className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs h-24" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Iniciales del Usuario:</label>
                <input type="text" value={nuevoUsuario} onChange={(e) => setNuevoUsuario(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs uppercase" maxLength={3} required />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 rounded text-xs transition">Guardar Solicitud</button>
                <button type="button" onClick={() => setModalAbierto(false)} className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded text-xs transition">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
