import './globals.css'

export const metadata = {
  title: 'Mantenimiento Industrial PRO',
  description: 'Plataforma web de gestión de mantenimiento e IoT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
