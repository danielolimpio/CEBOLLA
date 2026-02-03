
import { Category, Article, SiteConfig } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Navegação Anônima', slug: 'navegacao-anonima', description: 'Técnicas e ferramentas para navegar na web sem deixar rastros.' },
  { id: 'cat-2', name: 'Comunicação Segura', slug: 'comunicacao-segura', description: 'Criptografia de mensagens, e-mails e chamadas de vídeo.' },
  { id: 'cat-3', name: 'Senhas e Autenticação', slug: 'senhas-e-autenticacao', description: 'Melhores práticas para gerenciamento de credenciais e MFA.' },
  { id: 'cat-4', name: 'Privacidade Financeira', slug: 'privacidade-financeira', description: 'Como proteger seus ativos e dados bancários no mundo digital.' },
  { id: 'cat-5', name: 'Direitos Digitais', slug: 'direitos-digitais', description: 'Conheça as leis de proteção de dados (LGPD) e sua liberdade online.' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Por que a Autenticação de Dois Fatores (MFA) é Obrigatória em 2025',
    slug: 'mfa-obrigatoria-2025',
    content: 'Apenas usar uma senha forte não é mais suficiente. Com o aumento de vazamentos de dados, a Autenticação de Dois Fatores (2FA) ou Multi-Fator (MFA) tornou-se a primeira linha de defesa contra invasões...',
    categoryId: 'cat-3',
    publishedDate: '2024-05-20',
    featuredImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Um smartphone exibindo um código de verificação de segurança',
    metaDescription: 'Entenda por que o MFA é crucial para sua segurança digital.',
    author: 'Equipe Cebolla',
    readTime: '11 Min',
    views: 1250
  },
  {
    id: 'art-2',
    title: 'Guia de Navegação Anônima: VPN vs. Tor vs. I2P',
    slug: 'guia-navegacao-anonima-comparativo',
    content: 'Muitos usuários acreditam que o Modo Incógnito do navegador é suficiente...',
    categoryId: 'cat-1',
    publishedDate: '2024-05-18',
    featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Gráfico abstrato representando conexões de rede seguras',
    metaDescription: 'Descubra qual ferramenta de anonimato é a melhor.',
    author: 'Especialista em Privacidade',
    readTime: '15 Min',
    views: 980
  },
  {
    id: 'art-3',
    title: 'Como Proteger suas Criptomoedas de Ataques de Phishing',
    slug: 'proteger-cripto-phishing',
    content: 'O mercado de ativos digitais atrai muitos criminosos...',
    categoryId: 'cat-4',
    publishedDate: '2024-05-15',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Bitcoin e segurança digital',
    metaDescription: 'Dicas práticas para manter sua carteira digital segura.',
    author: 'Lucas Silva',
    readTime: '8 Min',
    views: 2100
  },
  {
    id: 'art-4',
    title: 'Os Melhores Serviços de E-mail Criptografado de 2025',
    slug: 'melhores-emails-criptografados',
    content: 'Sua caixa de entrada é um alvo valioso...',
    categoryId: 'cat-2',
    publishedDate: '2024-05-12',
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Cadeado sobre teclado de computador',
    metaDescription: 'Analise detalhada do ProtonMail, Tutanota e outros.',
    author: 'Ana Clara',
    readTime: '10 Min',
    views: 1540
  },
  {
    id: 'art-5',
    title: 'LGPD: Seus Direitos Digitais Explicados de Forma Simples',
    slug: 'lgpd-direitos-digitais-explicados',
    content: 'A Lei Geral de Proteção de Dados garante mais controle...',
    categoryId: 'cat-5',
    publishedDate: '2024-05-10',
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Documento legal sobre fundo digital',
    metaDescription: 'Saiba como usar a lei a seu favor online.',
    author: 'Dr. Roberto',
    readTime: '12 Min',
    views: 760
  }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: 'Cebolla.app',
  tagline: 'Sua privacidade em camadas. Proteja sua vida digital.',
  logo: 'https://storage.googleapis.com/ux-public-assets/cebolla-logo.png',
  footerText: '© 2024 Cebolla.app. Protegendo seus dados em um mundo conectado.',
  socialLinks: {
    twitter: 'https://twitter.com/cebolla_app',
    linkedin: 'https://linkedin.com/company/cebolla_app',
    facebook: 'https://facebook.com/cebolla_app',
    instagram: 'https://instagram.com/cebolla_app'
  }
};
