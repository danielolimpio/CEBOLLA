
import React, { useState } from 'react';
import { Article, Category } from '../types';

interface AdminProps {
  articles: Article[];
  categories: Category[];
  onUpdateArticles: (articles: Article[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
}

const Admin: React.FC<AdminProps> = ({ articles, categories, onUpdateArticles, onUpdateCategories }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'categories'>('articles');
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newArticle: Article = {
      id: editingArticle?.id || `art-${Date.now()}`,
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      content: formData.get('content') as string,
      categoryId: formData.get('categoryId') as string,
      publishedDate: (formData.get('publishedDate') as string) || new Date().toISOString().split('T')[0],
      featuredImage: formData.get('featuredImage') as string,
      imageAlt: formData.get('imageAlt') as string,
      metaDescription: formData.get('metaDescription') as string,
      author: formData.get('author') as string || 'Admin',
    };

    if (editingArticle?.id) {
      onUpdateArticles(articles.map(a => a.id === editingArticle.id ? newArticle : a));
    } else {
      onUpdateArticles([...articles, newArticle]);
    }
    setEditingArticle(null);
  };

  const deleteArticle = (id: string) => {
    if (confirm('Deseja excluir este artigo permanentemente?')) {
      onUpdateArticles(articles.filter(a => a.id !== id));
    }
  };

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCat: Category = {
      id: editingCategory?.id || `cat-${Date.now()}`,
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
    };

    if (editingCategory?.id) {
      onUpdateCategories(categories.map(c => c.id === editingCategory.id ? newCat : c));
    } else {
      onUpdateCategories([...categories, newCat]);
    }
    setEditingCategory(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-black">Painel Administrativo</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('articles')} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'articles' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            Artigos
          </button>
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            Categorias
          </button>
        </div>
      </div>

      {activeTab === 'articles' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Gerenciar Artigos</h2>
            <button 
              onClick={() => setEditingArticle({})} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              + Criar Novo Artigo
            </button>
          </div>

          {editingArticle && (
            <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold mb-6">{editingArticle.id ? 'Editar' : 'Novo'} Artigo</h3>
                <form onSubmit={saveArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Título</label>
                      <input name="title" required defaultValue={editingArticle.title} className="w-full p-2 border rounded bg-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">URL Amigável (Slug)</label>
                      <input name="slug" required defaultValue={editingArticle.slug} className="w-full p-2 border rounded bg-transparent" placeholder="ex: titulo-do-artigo" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Meta Descrição (SEO)</label>
                    <textarea name="metaDescription" defaultValue={editingArticle.metaDescription} className="w-full p-2 border rounded bg-transparent" rows={2} placeholder="Resumo curto para o Google..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Conteúdo (Markdown)</label>
                    <textarea name="content" required defaultValue={editingArticle.content} className="w-full p-2 border rounded bg-transparent font-mono text-sm" rows={8} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Categoria</label>
                      <select name="categoryId" defaultValue={editingArticle.categoryId} className="w-full p-2 border rounded bg-transparent">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Autor</label>
                      <input name="author" defaultValue={editingArticle.author} className="w-full p-2 border rounded bg-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">URL da Imagem de Destaque</label>
                      <input name="featuredImage" required defaultValue={editingArticle.featuredImage} className="w-full p-2 border rounded bg-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Texto Alternativo (Alt da Imagem)</label>
                      <input name="imageAlt" required defaultValue={editingArticle.imageAlt} className="w-full p-2 border rounded bg-transparent" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" onClick={() => setEditingArticle(null)} className="px-4 py-2 text-sm font-bold">Cancelar</button>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold">Salvar Artigo</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="overflow-x-auto border dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="p-4 font-bold">Título</th>
                  <th className="p-4 font-bold">Categoria</th>
                  <th className="p-4 font-bold">Data</th>
                  <th className="p-4 font-bold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="p-4 font-medium">{article.title}</td>
                    <td className="p-4">{categories.find(c => c.id === article.categoryId)?.name}</td>
                    <td className="p-4">{article.publishedDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => setEditingArticle(article)} className="text-blue-600 hover:underline">Editar</button>
                      <button onClick={() => deleteArticle(article.id)} className="text-red-600 hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Gerenciar Categorias</h2>
            <button 
              onClick={() => setEditingCategory({})} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              + Criar Categoria
            </button>
          </div>

          {editingCategory && (
            <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">{editingCategory.id ? 'Editar' : 'Nova'} Categoria</h3>
                <form onSubmit={saveCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Nome</label>
                    <input name="name" required defaultValue={editingCategory.name} className="w-full p-2 border rounded bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">URL (Slug)</label>
                    <input name="slug" required defaultValue={editingCategory.slug} className="w-full p-2 border rounded bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Descrição</label>
                    <textarea name="description" defaultValue={editingCategory.description} className="w-full p-2 border rounded bg-transparent" rows={3} />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 text-sm font-bold">Cancelar</button>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold">Salvar Categoria</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="p-6 border dark:border-slate-800 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">/{cat.slug}</code>
                </div>
                <div className="mt-6 pt-4 border-t flex space-x-4">
                  <button onClick={() => setEditingCategory(cat)} className="text-sm font-bold text-blue-600 hover:underline">Editar</button>
                  {articles.filter(a => a.categoryId === cat.id).length === 0 && (
                    <button 
                      onClick={() => onUpdateCategories(categories.filter(c => c.id !== cat.id))} 
                      className="text-sm font-bold text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
