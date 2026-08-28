import type { Metadata } from 'next'
import './globals.css' // <-- Esto soluciona el problema de diseño plano

export const metadata: Metadata = {
  title: 'Plataforma de Mantenimiento Industrial',
  description: 'Sistema de gestión y mantenimiento industrial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
