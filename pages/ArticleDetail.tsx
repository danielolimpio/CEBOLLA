
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Article, Category } from '../types';
import SEO from '../components/SEO';

interface ArticleDetailProps {
  articles: Article[];
  categories: Category[];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articles, categories }) => {
  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  
  const article = articles.find(a => a.slug === articleSlug);
  const category = categories.find(c => c.slug === categorySlug);

  if (!article || !category) {
    return <Navigate to="/" replace />;
  }

  // Find related articles in same category
  const relatedArticles = articles
    .filter(a => a.categoryId === category.id && a.id !== article.id)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [article.featuredImage],
    "datePublished": article.publishedDate,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SegurançaMax",
      "logo": {
        "@type": "ImageObject",
        "url": "https://picsum.photos/seed/logo/200/60"
      }
    },
    "description": article.metaDescription
  };

  return (
    <>
      <SEO 
        title={`${article.title} | SegurançaMax`}
        description={article.metaDescription || article.content.substring(0, 160)}
        ogType="article"
        ogImage={article.featuredImage}
        canonical={`${window.location.origin}/category/${category.slug}/${article.slug}`}
        schema={structuredData}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <Link 
            to={`/category/${category.slug}`} 
            className="text-[10px] font-black text-brand uppercase tracking-[0.3em] mb-6 inline-block font-heading"
          >
            {category.name}
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-8 tracking-tighter leading-[1] text-slate-900 dark:text-white">
            {article.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <time dateTime={article.publishedDate}>
              {new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span>Por {article.author}</span>
          </div>
        </header>

        <figure className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img 
            src={article.featuredImage} 
            alt={article.imageAlt}
            className="w-full h-auto object-cover max-h-[600px]"
            loading="eager"
            decoding="async"
          />
        </figure>

        <div className="editorial-text dark:text-slate-300 max-w-3xl mx-auto">
          <div className="whitespace-pre-wrap selection:bg-brand/20">
            {article.content}
          </div>
        </div>

        {/* Internal Linking Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-24 pt-16 border-t dark:border-slate-800">
            <h2 className="text-3xl font-heading font-black mb-12 tracking-tight">Leia a seguir em {category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/category/${category.slug}/${rel.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all">
                    <img 
                      src={rel.featuredImage} 
                      alt={rel.imageAlt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h3 className="font-heading font-black text-xl leading-tight group-hover:text-brand transition-colors tracking-tight">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default ArticleDetail;
