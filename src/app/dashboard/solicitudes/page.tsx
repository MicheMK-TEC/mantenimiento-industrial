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
    }
  ])

  // Sincronizar con almacenamiento local al cargar
  useEffect(() => {
    const dataGuardada = localStorage.getItem('mk_solicitudes_cmms')
    if (dataGuardada) {
      try {
        setRegistros(JSON.parse(dataGuardada))
      } catch (e) {}
    }
  }, [])

  const guardarRegistros = (nuevosDatos: typeof registros) => {
    setRegistros(nuevosDatos)
    localStorage.setItem('mk_solicitudes_cmms', JSON.stringify(nuevosDatos))
  }
