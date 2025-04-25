import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Relatórios de Candidatos",
  description: "Aplicação web para criação de relatórios de perfis de candidatos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Sistema de Relatórios de Candidatos</h1>
              <p className="text-sm opacity-80">Ferramenta para recrutadores</p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 border-t border-gray-200 py-4">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Sistema de Relatórios de Candidatos
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
