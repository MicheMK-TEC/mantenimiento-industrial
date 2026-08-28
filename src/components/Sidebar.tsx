'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ClipboardList, Wrench, Boxes, Cpu, BarChart3, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Solicitudes', href: '/dashboard/requests', icon: ClipboardList },
    { name: 'Órdenes de Trabajo', href: '/dashboard/work-orders', icon: Wrench },
    { name: 'Activos / Equipos', href: '/dashboard/equipment', icon: Boxes },
    { name: 'IoT & Sensores', href: '/dashboard/iot', icon: Cpu },
    { name: 'Reportes & KPIs', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Administración', href: '/dashboard/admin', icon: Settings },
  ]

  return (
    <aside className="flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="font-bold text-white text-lg tracking-wide">MANTENIMIENTO <span className="text-blue-500">PRO</span></h1>
        <p className="text-xs text-slate-400 mt-0.5">Industrial IoT & Core</p>
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
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
