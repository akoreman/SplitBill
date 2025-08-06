import type { Metadata } from 'next';
import './globals.css';
import '../lib/fontawesome';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Split Bill - Effortlessly Split Bills with Friends',
  description: 'Calculate shares, tips, and payments in seconds. Split bills fairly among friends with our easy-to-use bill splitting tool.',
  keywords: 'bill split, tip calculator, group payments, split expenses, bill sharing',
  authors: [{ name: 'Split Bill Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body style={{ 
        fontFamily: "'Open Sans', sans-serif",
        color: '#1e3a8a',
        background: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)',
        minHeight: '100vh',
        overflowX: 'hidden',
        margin: 0,
        padding: 0
      }}>
        {/* Background Shapes */}
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <Header />
        <main style={{ paddingTop: '6rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}