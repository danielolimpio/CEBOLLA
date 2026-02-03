
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Admin from './pages/Admin';
import { Article, Category, SiteConfig, BreadcrumbItem } from './types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, DEFAULT_SITE_CONFIG } from './constants';

const AppContent: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('blog_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('blog_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [siteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    localStorage.setItem('blog_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('blog_categories', JSON.stringify(categories));
  }, [categories]);

  const location = useLocation();

  // Simple breadcrumb logic based on path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];
    
    if (pathParts[0] === 'category') {
      const catSlug = pathParts[1];
      const cat = categories.find(c => c.slug === catSlug);
      if (cat) {
        crumbs.push({ label: cat.name, path: `/category/${cat.slug}` });
        if (pathParts[2]) {
          const art = articles.find(a => a.slug === pathParts[2]);
          if (art) {
            crumbs.push({ label: art.title, path: `/category/${cat.slug}/${art.slug}` });
          }
        }
      }
    } else if (pathParts[0] === 'admin') {
      crumbs.push({ label: 'Painel Admin', path: '/admin' });
    }

    return crumbs;
  };

  return (
    <Layout 
      categories={categories} 
      siteName={siteConfig.siteName} 
      footerText={siteConfig.footerText}
      breadcrumbs={getBreadcrumbs()}
    >
      <Routes>
        <Route path="/" element={<Home articles={articles} categories={categories} siteName={siteConfig.siteName} />} />
        <Route path="/category/:categorySlug/:articleSlug" element={<ArticleDetail articles={articles} categories={categories} />} />
        <Route path="/category/:categorySlug" element={<Home articles={articles} categories={categories} siteName={siteConfig.siteName} />} />
        <Route path="/admin" element={<Admin articles={articles} categories={categories} onUpdateArticles={setArticles} onUpdateCategories={setCategories} />} />
        {/* Fallback */}
        <Route path="*" element={<Home articles={articles} categories={categories} siteName={siteConfig.siteName} />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
