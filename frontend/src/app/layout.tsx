import "./globals.css";

export const metadata = {
  title: 'MercadoPDV - ERP SaaS',
  description: 'Sistema completo para Varejo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-slate-50 to-slate-100 text-slate-900 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
