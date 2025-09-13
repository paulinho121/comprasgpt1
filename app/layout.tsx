import './globals.css'

export const metadata = {
  title: 'Sistema de Gestão de Compras',
  description: 'Controle inteligente de estoque',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
