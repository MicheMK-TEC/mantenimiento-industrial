'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ClipboardList, Wrench, Boxes, BarChart3, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

type Rol = 'ADMINISTRADOR' | 'SUPERVISOR' | 'SOLICITANTE' | 'TECNICO' | 'GERENCIA'

const TODOS_LOS_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMINISTRADOR', 'SUPERVISOR', 'SOLICITANTE', 'TECNICO', 'GERENCIA'] as Rol[] },
  { name: 'Solicitudes', href: '/dashboard/solicitudes', icon: ClipboardList, roles: ['ADMINISTRADOR', 'SUPERVISOR', 'SOLICITANTE', 'GERENCIA'] as Rol[] },
  { name: 'Órdenes de Trabajo', href: '/dashboard/ot', icon: Wrench, roles: ['ADMINISTRADOR', 'SUPERVISOR', 'TECNICO', 'GERENCIA'] as Rol[] },
  { name: 'Activos / Equipos', href: '/dashboard/activos', icon: Boxes, roles: ['ADMINISTRADOR', 'SUPERVISOR', 'GERENCIA'] as Rol[] },
  { name: 'Reportes & KPIs', href: '/dashboard/reportes', icon: BarChart3, roles: ['ADMINISTRADOR', 'SUPERVISOR', 'GERENCIA'] as Rol[] },
  { name: 'Administración', href: '/dashboard/admin', icon: Settings, roles: ['ADMINISTRADOR'] as Rol[] },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  const menuItems = TODOS_LOS_ITEMS.filter((item) =>
    profile ? item.roles.includes(profile.role) : false
  )

  return (
    <aside className="flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="font-bold text-white text-lg tracking-wide">MANTENIMIENTO <span className="text-blue-500">PRO</span></h1>
        <p className="text-xs text-slate-400 mt-0.5">Industrial CMMS</p>
        {profile && (
          <div className="mt-3 text-xs text-slate-300">
            <p className="font-semibold truncate">{profile.full_name}</p>
            <p className="text-slate-500 uppercase tracking-wide">{profile.role}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
