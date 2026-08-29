import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'MK Consulting - CMMS Industrial',
  description: 'Sistema de Gestión de Mantenimiento y Confiabilidad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 font-sans antialiased min-h-screen flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
