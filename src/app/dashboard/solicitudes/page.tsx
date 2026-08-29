 import { useState, useEffect } from 'react'

// Dentro de tu función export default function SolicitudesMantenimientoPage() {
const [rolActual, setRolActual] = useState('admin')

useEffect(() => {
  const rolGuardado = localStorage.getItem('rol_activo')
  if (rolGuardado) setRolActual(rolGuardado)
}, [])
