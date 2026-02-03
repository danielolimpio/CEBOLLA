
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbItem, Category } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  categories: Category[];
  siteName: string;
  footerText: string;
  breadcrumbs?: BreadcrumbItem[];
}

const Logo = ({ light = false }) => (
  <div className="flex items-center space-x-2 group">
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full transform group-hover:rotate-12 transition-transform duration-500">
        <circle cx="50" cy="50" r="45" fill="#15803d" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#000" strokeWidth="4" opacity="0.3" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#000" strokeWidth="4" opacity="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#000" strokeWidth="4" opacity="0.7" />
        <circle cx="50" cy="50" r="5" fill="#000" />
        <path d="M50 5 C 75 5, 95 25, 95 50" fill="none" stroke="#166534" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
    <span className={`text-2xl font-heading font-black tracking-tighter ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
      cebolla<span className="text-brand">.app</span>
    </span>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, categories, siteName, footerText, breadcrumbs }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'theme-light');
    }
  }, [isDarkMode]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop';
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand selection:text-white">
      {/* Top tier (Links/Date) */}
      <div className="hidden lg:block w-full bg-slate-100 dark:bg-slate-900 border-b dark:border-slate-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex space-x-4">
            <span className="text-brand">Assine →</span>
            <span>Segunda-feira, 20 de Maio de 2024</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="#" className="hover:text-brand transition-colors">FB</a>
              <a href="#" className="hover:text-brand transition-colors">TW</a>
              <a href="#" className="hover:text-brand transition-colors">IG</a>
              <a href="#" className="hover:text-brand transition-colors">YT</a>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-brand tracking-widest transition-colors">
              {isDarkMode ? 'MODO CLARO' : 'MODO ESCURO'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>

            <nav className="hidden xl:flex items-center space-x-6 text-xs font-bold uppercase tracking-widest">
              <Link to="/" className="hover:text-brand transition-colors">Início</Link>
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="hover:text-brand transition-colors">
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-brand transition-colors" aria-label="Pesquisar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <Link to="/admin" className="hidden sm:block px-6 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[10px] tracking-widest font-black rounded-full hover:bg-brand transition-colors">
              PAINEL ADMIN
            </Link>
          </div>
        </div>
      </header>

      {/* Trending Bar */}
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 py-3 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
          <span className="whitespace-nowrap flex items-center text-[10px] font-black text-brand mr-6 uppercase tracking-widest italic">
            Tendências <span className="ml-2">🔥</span>
          </span>
          <div className="flex space-x-8 text-[11px] font-bold tracking-tight whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link to="#" className="hover:text-brand transition-colors">Ataques de phishing em alta este mês</Link>
            <Link to="#" className="hover:text-brand transition-colors">Como configurar Tor no Windows 11</Link>
            <Link to="#" className="hover:text-brand transition-colors">Privacidade bancária na era digital</Link>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Dark Footer */}
      <footer className="bg-[#0b0c10] text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="block mb-6">
                <Logo light />
              </Link>
              <p className="text-sm leading-relaxed mb-6 font-medium">
                Protegendo sua privacidade e garantindo sua segurança em um mundo cada vez mais conectado. Sua liberdade digital começa aqui.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-brand cursor-pointer font-black text-xs transition-colors">F</div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-brand cursor-pointer font-black text-xs transition-colors">T</div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-brand cursor-pointer font-black text-xs transition-colors">I</div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase mb-6 tracking-widest border-l-4 border-brand pl-3 font-heading">Categorias Populares</h4>
              <ul className="space-y-3 text-sm">
                {categories.slice(0, 5).map(cat => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="hover:text-brand transition-colors flex justify-between font-medium">
                      {cat.name} <span className="opacity-40">({Math.floor(Math.random() * 20) + 5})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase mb-6 tracking-widest border-l-4 border-brand pl-3 font-heading">Postagens Recentes</h4>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex space-x-3 group">
                    <div className="w-16 h-16 bg-slate-800 rounded flex-shrink-0 overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1558494949-ef0109121c94?q=80&w=100&auto=format&fit=crop&sig=${i}`} 
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                        alt="Thumbnail"
                      />
                    </div>
                    <div className="text-xs">
                      <h5 className="text-white font-bold hover:text-brand line-clamp-2 cursor-pointer transition-colors leading-snug">O perigo dos cookies de terceiros em 2024</h5>
                      <p className="mt-1 opacity-50 tracking-widest font-bold">20 MAIO, 2024</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase mb-6 tracking-widest border-l-4 border-brand pl-3 font-heading">Newsletter</h4>
              <p className="text-xs mb-4 font-medium">Receba as últimas atualizações de segurança direto no seu e-mail.</p>
              <div className="flex">
                <input type="email" placeholder="Seu e-mail..." className="bg-slate-800 border-none px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-brand text-sm outline-none" />
                <button className="bg-brand text-white px-4 py-2 rounded-r-md font-black text-[10px] uppercase tracking-widest transition-colors hover:bg-brand-dark">Assinar</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] opacity-50 font-black uppercase tracking-[0.2em]">
            <p>{footerText}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-brand transition-colors">Privacidade</Link>
              <Link to="/terms" className="hover:text-brand transition-colors">Termos</Link>
              <Link to="/sitemap.xml" className="hover:text-brand transition-colors">Mapa</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
