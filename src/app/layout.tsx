import "@/globals.css"; // Asegurar que está importando los estilos

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>LoviPrint - Administración</title>
      </head>
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
