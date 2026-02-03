
import React from 'react';
import { Link } from 'react-router-dom';
import { Article, Category } from '../types';
import SEO from '../components/SEO';

interface HomeProps {
  articles: Article[];
  categories: Category[];
  siteName: string;
}

const Home: React.FC<HomeProps> = ({ articles, categories, siteName }) => {
  const getCategory = (id: string) => categories.find(c => c.id === id) || categories[0];
  const sortedArticles = [...articles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const featured = sortedArticles[0];
  const sideFeatured = sortedArticles.slice(1, 3);
  const editorsPicks = sortedArticles.slice(0, 4);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop';
  };

  return (
    <>
      <SEO 
        title={`${siteName} | Proteção Digital e Privacidade`}
        description="Portal especializado em segurança online, anonimato e proteção de dados."
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Card */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl h-[400px] lg:h-[600px] shadow-2xl bg-slate-200 dark:bg-slate-800">
            <img 
              src={featured.featuredImage} 
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              alt={featured.imageAlt} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
              <span className="bg-brand text-white px-3 py-1 rounded-md text-[10px] font-black uppercase mb-4 inline-block tracking-[0.2em] font-heading">
                {getCategory(featured.categoryId).name}
              </span>
              <h2 className="text-white text-3xl lg:text-6xl font-heading font-black mb-6 leading-[0.95] tracking-tighter">
                <Link to={`/category/${getCategory(featured.categoryId).slug}/${featured.slug}`} className="hover:text-brand transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <div className="flex items-center text-white/70 text-[10px] font-black uppercase tracking-[0.15em] space-x-4">
                <span>POR {featured.author}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>{featured.readTime || '5 MIN'} LEITURA</span>
              </div>
            </div>
          </div>

          {/* Side Hero Stacks */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {sideFeatured.map(art => (
              <div key={art.id} className="group relative overflow-hidden rounded-2xl h-[190px] lg:h-full shadow-lg bg-slate-200 dark:bg-slate-800">
                <img 
                  src={art.featuredImage} 
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt={art.imageAlt} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="bg-brand text-white px-2 py-0.5 rounded-sm text-[9px] font-black uppercase mb-2 inline-block tracking-widest font-heading">
                    {getCategory(art.categoryId).name}
                  </span>
                  <h3 className="text-white text-xl font-heading font-black leading-[1.1] tracking-tight group-hover:text-brand transition-colors">
                    <Link to={`/category/${getCategory(art.categoryId).slug}/${art.slug}`}>{art.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editors Pick & Sidebar */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Content */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="section-title text-3xl font-heading font-black tracking-tight">Escolha do Editor</h2>
              <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">Ver Todos</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {editorsPicks.map(art => (
                <div key={art.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm group border dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={art.featuredImage} 
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={art.imageAlt}
                    />
                    <span className="absolute top-4 left-4 bg-brand text-white px-3 py-1 text-[9px] font-black uppercase rounded shadow-lg tracking-widest">
                      {getCategory(art.categoryId).name}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-black mb-4 group-hover:text-brand transition-colors leading-[1.1] tracking-tight">
                      <Link to={`/category/${getCategory(art.categoryId).slug}/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
                      {art.metaDescription}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{art.author}</span>
                      <span>{new Date(art.publishedDate).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Social Links Box */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border dark:border-slate-800">
              <h4 className="section-title text-sm font-black uppercase mb-8 tracking-widest">Siga-nos</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#3b5998] text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                  <span className="text-xl font-black tracking-tighter">28k</span>
                  <span className="text-[9px] uppercase font-black opacity-70 tracking-widest mt-1">Likes</span>
                </div>
                <div className="bg-[#1da1f2] text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                  <span className="text-xl font-black tracking-tighter">159k</span>
                  <span className="text-[9px] uppercase font-black opacity-70 tracking-widest mt-1">Seguidores</span>
                </div>
                <div className="bg-[#e1306c] text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                  <span className="text-xl font-black tracking-tighter">231k</span>
                  <span className="text-[9px] uppercase font-black opacity-70 tracking-widest mt-1">Fãs</span>
                </div>
                <div className="bg-[#ff0000] text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                  <span className="text-xl font-black tracking-tighter">1.2M</span>
                  <span className="text-[9px] uppercase font-black opacity-70 tracking-widest mt-1">Inscritos</span>
                </div>
              </div>
            </div>

            {/* Newsletter Box */}
            <div className="bg-brand p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <h4 className="text-3xl font-heading font-black mb-4 tracking-tighter leading-none">Mantenha-se Seguro.</h4>
              <p className="text-sm font-medium opacity-90 mb-8 leading-relaxed">Junte-se a 70,000 inscritos e receba alertas de vazamentos e novas ameaças digitais direto no seu e-mail.</p>
              <input type="email" placeholder="Seu e-mail" className="w-full bg-white/20 border-none rounded-xl px-5 py-4 text-sm placeholder:text-white/60 focus:ring-2 ring-white/40 mb-4 transition-all" />
              <button className="w-full bg-white text-brand font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors shadow-lg">Inscrever-se AGORA</button>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border dark:border-slate-800">
              <h4 className="section-title text-sm font-black uppercase mb-8 tracking-widest">Tópicos Quentes</h4>
              <div className="flex flex-wrap gap-2">
                {['PRIVACIDADE', 'HACKING', 'VPN', 'DARKWEB', 'CRIPTOGRAFIA', 'LGPD', 'CYBERSECURITY'].map(tag => (
                  <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-[9px] font-black text-slate-500 hover:bg-brand hover:text-white cursor-pointer transition-all tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="bg-slate-900 py-24 mt-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000" className="w-full h-full object-cover" alt="Security Background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-16">
            <h2 className="section-title text-3xl font-heading font-black text-white tracking-tight">Radar de Segurança</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 group relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200&auto=format&fit=crop" 
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt="Vídeo Destaque"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
                <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center shadow-brand/40 shadow-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div className="absolute bottom-12 left-12 p-4">
                <h3 className="text-white text-4xl font-heading font-black tracking-tighter max-w-lg leading-none">Como funciona o protocolo I2P na prática?</h3>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex space-x-5 group cursor-pointer items-center">
                  <div className="w-32 h-24 bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-lg">
                    <img 
                      src={`https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=200&auto=format&fit=crop&sig=${i}`} 
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      alt={`Miniatura Vídeo ${i}`}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white text-base font-bold group-hover:text-brand transition-colors line-clamp-2 leading-tight tracking-tight">Segurança Digital e Privacidade no Pix: Dicas de Proteção</h4>
                    <span className="text-[9px] text-brand uppercase font-black tracking-widest font-heading">12 MIN • VÍDEO</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
