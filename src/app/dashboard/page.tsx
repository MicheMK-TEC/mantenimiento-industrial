import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Panel Principal</h1>
        <p className="text-sm text-slate-400">Bienvenido, {profile?.full_name} ({profile?.role})</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400">Solicitudes Nuevas</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400">OTs Abiertas</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400">Equipos Operativos</p>
          <p className="text-3xl font-bold text-emerald-500 mt-2">1</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400">Alertas Críticas</p>
          <p className="text-3xl font-bold text-red-500 mt-2">0</p>
        </div>
      </div>
    </div>
  )
}
