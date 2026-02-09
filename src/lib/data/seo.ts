// 📦 lib/data/seo.ts - Comprehensive SEO Data
export interface SEOKeyword {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  position: number;
  trend: 'up' | 'down' | 'stable';
  url?: string;
}

export interface SEOContent {
  id: string;
  title: string;
  url: string;
  type: 'page' | 'product' | 'category' | 'blog';
  metaTitle: string;
  metaDescription: string;
  wordCount: number;
  readabilityScore: number;
  seoScore: number;
  lastUpdated: string;
  issues: string[];
}

export interface SEOBacklink {
  id: string;
  domain: string;
  url: string;
  anchorText: string;
  type: 'dofollow' | 'nofollow';
  authority: number;
  date: string;
}

export interface SEOSiteAudit {
  id: string;
  category: string;
  issue: string;
  severity: 'critical' | 'warning' | 'info';
  affectedPages: number;
  description: string;
  fix: string;
}

export interface SEOPerformance {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

export interface SEOReport {
  id: string;
  name: string;
  type: 'site-audit' | 'keyword-tracking' | 'backlink-analysis' | 'competitor-analysis';
  status: 'completed' | 'running' | 'failed';
  createdAt: string;
  completedAt?: string;
  data: any;
}

// Mock SEO Data
export const seoKeywords: SEOKeyword[] = [
  {
    id: 'kw-001',
    keyword: 'running shoes',
    volume: 135000,
    difficulty: 65,
    position: 3,
    trend: 'up',
    url: '/products/running-shoes'
  },
  {
    id: 'kw-002',
    keyword: 'sneakers for men',
    volume: 89000,
    difficulty: 58,
    position: 5,
    trend: 'stable',
    url: '/products/mens-sneakers'
  },
  {
    id: 'kw-003',
    keyword: 'basketball shoes',
    volume: 67000,
    difficulty: 72,
    position: 8,
    trend: 'down',
    url: '/products/basketball-shoes'
  },
  {
    id: 'kw-004',
    keyword: 'women boots',
    volume: 45000,
    difficulty: 45,
    position: 2,
    trend: 'up',
    url: '/products/womens-boots'
  },
];

export const seoContent: SEOContent[] = [
  {
    id: 'content-001',
    title: 'Premium Running Shoes Collection',
    url: '/products/running-shoes',
    type: 'category',
    metaTitle: 'Premium Running Shoes | Best Athletic Footwear 2024',
    metaDescription: 'Discover our premium collection of running shoes designed for performance and comfort. Free shipping on orders over $50.',
    wordCount: 1250,
    readabilityScore: 85,
    seoScore: 92,
    lastUpdated: '2024-01-15',
    issues: []
  },
  {
    id: 'content-002',
    title: 'Nike Air Max 270',
    url: '/products/nike-air-max-270',
    type: 'product',
    metaTitle: 'Nike Air Max 270 - Buy Online | ShoeStore Pro',
    metaDescription: 'Shop Nike Air Max 270 sneakers. Available in multiple colors. Free shipping and returns.',
    wordCount: 450,
    readabilityScore: 78,
    seoScore: 88,
    lastUpdated: '2024-01-10',
    issues: ['Meta description too short']
  },
];

export const seoBacklinks: SEOBacklink[] = [
  {
    id: 'bl-001',
    domain: 'fashionblog.com',
    url: 'https://fashionblog.com/best-running-shoes-2024',
    anchorText: 'premium running shoes',
    type: 'dofollow',
    authority: 75,
    date: '2024-01-20'
  },
  {
    id: 'bl-002',
    domain: 'sportsreview.com',
    url: 'https://sportsreview.com/top-sneakers',
    anchorText: 'best sneakers',
    type: 'dofollow',
    authority: 82,
    date: '2024-01-18'
  },
];

export const seoSiteAudits: SEOSiteAudit[] = [
  {
    id: 'audit-001',
    category: 'Performance',
    issue: 'Slow page load times',
    severity: 'critical',
    affectedPages: 45,
    description: 'Multiple pages are taking more than 3 seconds to load',
    fix: 'Optimize images, enable caching, and minimize JavaScript'
  },
  {
    id: 'audit-002',
    category: 'SEO',
    issue: 'Missing meta descriptions',
    severity: 'warning',
    affectedPages: 12,
    description: 'Some pages are missing meta descriptions',
    fix: 'Add unique meta descriptions to all pages'
  },
  {
    id: 'audit-003',
    category: 'Accessibility',
    issue: 'Missing alt text on images',
    severity: 'warning',
    affectedPages: 23,
    description: 'Several product images are missing alt text',
    fix: 'Add descriptive alt text to all images'
  },
];

export const seoPerformance: SEOPerformance[] = [
  { date: '2024-01-01', impressions: 12500, clicks: 450, ctr: 3.6, position: 4.2 },
  { date: '2024-01-08', impressions: 13800, clicks: 520, ctr: 3.8, position: 3.8 },
  { date: '2024-01-15', impressions: 15200, clicks: 610, ctr: 4.0, position: 3.5 },
  { date: '2024-01-22', impressions: 16800, clicks: 720, ctr: 4.3, position: 3.2 },
];

export const seoReports: SEOReport[] = [
  {
    id: 'report-001',
    name: 'Full Site Audit',
    type: 'site-audit',
    status: 'completed',
    createdAt: '2024-01-20',
    completedAt: '2024-01-20',
    data: { issuesFound: 15, pagesAnalyzed: 156 }
  },
  {
    id: 'report-002',
    name: 'Keyword Ranking Report',
    type: 'keyword-tracking',
    status: 'completed',
    createdAt: '2024-01-22',
    completedAt: '2024-01-22',
    data: { keywordsTracked: 50, avgPosition: 4.2 }
  },
];
