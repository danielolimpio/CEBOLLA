
import React from 'react';
import { Link } from 'react-router-dom';
import { Article, Category } from '../types';

interface ArticleCardProps {
  article: Article;
  category: Category;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, category }) => {
  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
      <Link to={`/category/${category.slug}/${article.slug}`} className="block overflow-hidden aspect-[16/9]">
        <img 
          src={article.featuredImage} 
          alt={article.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex flex-col flex-grow p-6">
        <Link 
          to={`/category/${category.slug}`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3"
        >
          {category.name}
        </Link>
        <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          <Link to={`/category/${category.slug}/${article.slug}`}>
            {article.title}
          </Link>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {article.metaDescription || article.content.substring(0, 150) + '...'}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t dark:border-slate-800">
          <span>{new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="flex items-center">
            Por <span className="ml-1 font-medium text-slate-600 dark:text-slate-300">{article.author}</span>
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
