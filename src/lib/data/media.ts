export type MediaType = 'image' | 'video' | 'document' | 'audio';
export type MediaStatus = 'active' | 'archived' | 'deleted' | 'processing';
export type MediaUsageType = 'product' | 'banner' | 'category' | 'profile' | 'blog' | 'marketing';

export interface MediaItem {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  mediaType: MediaType;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  description?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // For video/audio
  uploadDate: string;
  uploadedBy: string;
  status: MediaStatus;
  usageCount: number;
  lastUsed?: string;
  tags: string[];
  collections?: string[];
  metaData?: Record<string, any>;
}

export interface MediaCollection {
  id: string;
  name: string;
  description?: string;
  type: 'gallery' | 'folder' | 'album';
  items: string[]; // MediaItem IDs
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  itemCount: number;
  tags: string[];
  isPublic: boolean;
}

export interface MediaUploadProgress {
  id: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  error?: string;
  fileSize: number;
  uploadedSize: number;
  startTime: number;
}

// Mock Data
export const mockMediaItems: MediaItem[] = [
  {
    id: 'media-001',
    name: 'Summer Collection Banner',
    fileName: 'summer-banner-hero.jpg',
    fileSize: 2457600, // 2.4MB
    fileType: 'image/jpeg',
    mediaType: 'image',
    url: '/media/banners/summer-banner-hero.jpg',
    thumbnailUrl: '/media/thumbnails/summer-banner-thumb.jpg',
    altText: 'Summer Collection 2024 promotional banner',
    caption: 'Main hero banner for summer collection',
    description: 'High-resolution banner for homepage promotion',
    dimensions: { width: 1920, height: 600 },
    uploadDate: '2024-05-15T10:30:00Z',
    uploadedBy: 'John Doe',
    status: 'active',
    usageCount: 3,
    lastUsed: '2024-05-20T14:45:00Z',
    tags: ['banner', 'summer', 'promotion', 'homepage'],
    collections: ['banners', 'summer-2024'],
    metaData: {
      colorProfile: 'sRGB',
      dpi: 72,
      compression: 'high'
    }
  },
  {
    id: 'media-002',
    name: 'Product Video - Running Shoes',
    fileName: 'running-shoes-demo.mp4',
    fileSize: 52428800, // 50MB
    fileType: 'video/mp4',
    mediaType: 'video',
    url: '/media/videos/running-shoes-demo.mp4',
    thumbnailUrl: '/media/thumbnails/running-shoes-thumb.jpg',
    altText: 'Running shoes demonstration video',
    caption: 'Product demonstration video for new running shoes',
    description: 'Detailed video showcasing features and performance',
    dimensions: { width: 1920, height: 1080 },
    duration: 120, // 2 minutes
    uploadDate: '2024-05-10T14:20:00Z',
    uploadedBy: 'Sarah Chen',
    status: 'active',
    usageCount: 2,
    lastUsed: '2024-05-18T11:15:00Z',
    tags: ['video', 'product', 'running', 'demo'],
    collections: ['product-videos', 'running-collection'],
    metaData: {
      codec: 'H.264',
      frameRate: 30,
      bitrate: '5000kbps'
    }
  },
  {
    id: 'media-003',
    name: 'Brand Logo - Primary',
    fileName: 'brand-logo-primary.svg',
    fileSize: 51200, // 50KB
    fileType: 'image/svg+xml',
    mediaType: 'image',
    url: '/media/logos/brand-logo-primary.svg',
    altText: 'Brand primary logo',
    caption: 'Official brand logo',
    description: 'Vector logo for all brand communications',
    dimensions: { width: 800, height: 400 },
    uploadDate: '2024-01-15T09:00:00Z',
    uploadedBy: 'Admin',
    status: 'active',
    usageCount: 45,
    lastUsed: '2024-05-22T16:30:00Z',
    tags: ['logo', 'brand', 'vector', 'svg'],
    collections: ['brand-assets', 'logos'],
    metaData: {
      vector: true,
      layers: 5,
      editable: true
    }
  },
  {
    id: 'media-004',
    name: 'Product Gallery - Sneaker',
    fileName: 'sneaker-product-gallery-01.jpg',
    fileSize: 1572864, // 1.5MB
    fileType: 'image/jpeg',
    mediaType: 'image',
    url: '/media/products/sneaker-gallery-01.jpg',
    thumbnailUrl: '/media/thumbnails/sneaker-thumb-01.jpg',
    altText: 'White sneaker product image',
    caption: 'White sneaker from front angle',
    description: 'Product gallery image for e-commerce',
    dimensions: { width: 1200, height: 1600 },
    uploadDate: '2024-04-20T11:45:00Z',
    uploadedBy: 'Mike Wilson',
    status: 'active',
    usageCount: 1,
    lastUsed: '2024-04-25T10:20:00Z',
    tags: ['product', 'sneaker', 'gallery', 'white'],
    collections: ['product-images', 'sneakers'],
    metaData: {
      colorProfile: 'Adobe RGB',
      dpi: 300,
      studioShot: true
    }
  },
  {
    id: 'media-005',
    name: 'Category Banner - Running',
    fileName: 'category-running-banner.jpg',
    fileSize: 1835008, // 1.75MB
    fileType: 'image/jpeg',
    mediaType: 'image',
    url: '/media/categories/running-banner.jpg',
    thumbnailUrl: '/media/thumbnails/running-category-thumb.jpg',
    altText: 'Running shoes category banner',
    caption: 'Banner for running shoes category page',
    description: 'Category-specific promotional banner',
    dimensions: { width: 1600, height: 400 },
    uploadDate: '2024-03-10T15:30:00Z',
    uploadedBy: 'Emma Rodriguez',
    status: 'active',
    usageCount: 5,
    lastUsed: '2024-05-15T09:45:00Z',
    tags: ['category', 'running', 'banner', 'promotion'],
    collections: ['category-banners', 'running'],
    metaData: {
      colorProfile: 'sRGB',
      dpi: 150,
      optimizedForWeb: true
    }
  },
  {
    id: 'media-006',
    name: 'Size Chart PDF',
    fileName: 'size-chart-2024.pdf',
    fileSize: 1048576, // 1MB
    fileType: 'application/pdf',
    mediaType: 'document',
    url: '/media/documents/size-chart-2024.pdf',
    altText: 'Shoe size chart guide',
    caption: 'Complete size chart for all footwear',
    description: 'Printable size chart for customers',
    uploadDate: '2024-02-28T13:15:00Z',
    uploadedBy: 'John Doe',
    status: 'active',
    usageCount: 12,
    lastUsed: '2024-05-10T14:30:00Z',
    tags: ['document', 'size-chart', 'guide', 'pdf'],
    collections: ['documents', 'guides'],
    metaData: {
      pages: 3,
      printable: true,
      version: '2024.1'
    }
  },
  {
    id: 'media-007',
    name: 'Podcast - Brand Story',
    fileName: 'brand-story-podcast.mp3',
    fileSize: 26214400, // 25MB
    fileType: 'audio/mpeg',
    mediaType: 'audio',
    url: '/media/audio/brand-story-podcast.mp3',
    altText: 'Brand story podcast episode',
    caption: 'Podcast episode about our brand history',
    description: 'Audio podcast for marketing and engagement',
    duration: 1800, // 30 minutes
    uploadDate: '2024-03-25T16:45:00Z',
    uploadedBy: 'Sarah Chen',
    status: 'active',
    usageCount: 8,
    lastUsed: '2024-04-30T11:20:00Z',
    tags: ['audio', 'podcast', 'marketing', 'brand'],
    collections: ['podcasts', 'marketing-audio'],
    metaData: {
      bitrate: '192kbps',
      channels: 2,
      sampleRate: '44.1kHz'
    }
  },
  {
    id: 'media-008',
    name: 'Social Media Post - Instagram',
    fileName: 'instagram-post-summer.jpg',
    fileSize: 1048576, // 1MB
    fileType: 'image/jpeg',
    mediaType: 'image',
    url: '/media/social/instagram-summer-post.jpg',
    thumbnailUrl: '/media/thumbnails/instagram-thumb.jpg',
    altText: 'Summer collection Instagram post',
    caption: 'Social media post for Instagram promotion',
    description: 'Square format image optimized for Instagram',
    dimensions: { width: 1080, height: 1080 },
    uploadDate: '2024-05-05T12:30:00Z',
    uploadedBy: 'Mike Wilson',
    status: 'active',
    usageCount: 2,
    lastUsed: '2024-05-12T10:45:00Z',
    tags: ['social', 'instagram', 'square', 'summer'],
    collections: ['social-media', 'instagram-posts'],
    metaData: {
      aspectRatio: '1:1',
      platform: 'instagram',
      format: 'feed'
    }
  },
  {
    id: 'media-009',
    name: 'Product 360 View - Basketball Shoes',
    fileName: 'basketball-shoes-360-01.jpg',
    fileSize: 2097152, // 2MB
    fileType: 'image/jpeg',
    mediaType: 'image',
    url: '/media/products/basketball-360-01.jpg',
    thumbnailUrl: '/media/thumbnails/basketball-360-thumb.jpg',
    altText: 'Basketball shoes 360 degree view',
    caption: 'First angle of 360 product view',
    description: '360 degree product view image sequence',
    dimensions: { width: 1200, height: 1200 },
    uploadDate: '2024-04-15T10:15:00Z',
    uploadedBy: 'Emma Rodriguez',
    status: 'processing',
    usageCount: 0,
    tags: ['product', '360-view', 'basketball', 'sequence'],
    collections: ['product-360', 'basketball-shoes'],
    metaData: {
      sequenceNumber: 1,
      totalFrames: 36,
      angle: 0
    }
  },
  {
    id: 'media-010',
    name: 'Website Favicon',
    fileName: 'favicon.ico',
    fileSize: 40960, // 40KB
    fileType: 'image/x-icon',
    mediaType: 'image',
    url: '/media/icons/favicon.ico',
    altText: 'Website favicon',
    caption: 'Browser tab icon',
    description: 'Small icon for browser tabs and bookmarks',
    dimensions: { width: 32, height: 32 },
    uploadDate: '2024-01-10T08:00:00Z',
    uploadedBy: 'Admin',
    status: 'active',
    usageCount: 1,
    lastUsed: '2024-01-10T08:00:00Z',
    tags: ['icon', 'favicon', 'website', 'browser'],
    collections: ['website-icons'],
    metaData: {
      sizes: '16x16, 32x32, 64x64',
      format: 'ICO'
    }
  }
];

export const mockMediaCollections: MediaCollection[] = [
  {
    id: 'collection-001',
    name: 'Product Images',
    description: 'All product photos and gallery images',
    type: 'folder',
    items: ['media-004', 'media-009'],
    coverImage: '/media/thumbnails/sneaker-thumb-01.jpg',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-05-20T14:45:00Z',
    createdBy: 'Admin',
    itemCount: 2,
    tags: ['products', 'gallery', 'ecommerce'],
    isPublic: false
  },
  {
    id: 'collection-002',
    name: 'Marketing Banners',
    description: 'Promotional banners for website and campaigns',
    type: 'gallery',
    items: ['media-001', 'media-005'],
    coverImage: '/media/thumbnails/summer-banner-thumb.jpg',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-22T11:30:00Z',
    createdBy: 'John Doe',
    itemCount: 2,
    tags: ['marketing', 'banners', 'promotion'],
    isPublic: false
  },
  {
    id: 'collection-003',
    name: 'Brand Assets',
    description: 'Official brand logos and identity elements',
    type: 'album',
    items: ['media-003', 'media-010'],
    coverImage: '/media/logos/brand-logo-primary.svg',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-05-18T16:20:00Z',
    createdBy: 'Admin',
    itemCount: 2,
    tags: ['brand', 'logo', 'identity'],
    isPublic: false
  },
  {
    id: 'collection-004',
    name: 'Social Media',
    description: 'Images and videos for social media posts',
    type: 'gallery',
    items: ['media-008'],
    coverImage: '/media/thumbnails/instagram-thumb.jpg',
    createdAt: '2024-03-15T14:00:00Z',
    updatedAt: '2024-05-12T10:45:00Z',
    createdBy: 'Mike Wilson',
    itemCount: 1,
    tags: ['social', 'marketing', 'instagram'],
    isPublic: false
  },
  {
    id: 'collection-005',
    name: 'Video Library',
    description: 'Product demos and marketing videos',
    type: 'folder',
    items: ['media-002'],
    coverImage: '/media/thumbnails/running-shoes-thumb.jpg',
    createdAt: '2024-02-20T11:00:00Z',
    updatedAt: '2024-05-18T11:15:00Z',
    createdBy: 'Sarah Chen',
    itemCount: 1,
    tags: ['video', 'demos', 'marketing'],
    isPublic: false
  }
];

// Helper Functions
export const getMediaItems = (filters?: { 
  type?: MediaType; 
  status?: MediaStatus;
  collection?: string;
  tags?: string[];
  search?: string;
}) => {
  let filtered = [...mockMediaItems];
  
  if (filters?.type) {
    filtered = filtered.filter(item => item.mediaType === filters.type);
  }
  
  if (filters?.status) {
    filtered = filtered.filter(item => item.status === filters.status);
  }
  
  if (filters?.collection) {
    filtered = filtered.filter(item => 
      item.collections?.includes(filters.collection!)
    );
  }
  
  if (filters?.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item =>
      filters.tags!.some(tag => item.tags.includes(tag))
    );
  }
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.fileName.toLowerCase().includes(searchLower) ||
      item.altText?.toLowerCase().includes(searchLower) ||
      item.caption?.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};

export const getMediaCollections = (filters?: { 
  type?: MediaCollection['type'];
  isPublic?: boolean;
  search?: string;
}) => {
  let filtered = [...mockMediaCollections];
  
  if (filters?.type) {
    filtered = filtered.filter(collection => collection.type === filters.type);
  }
  
  if (filters?.isPublic !== undefined) {
    filtered = filtered.filter(collection => collection.isPublic === filters.isPublic);
  }
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(collection =>
      collection.name.toLowerCase().includes(searchLower) ||
      collection.description?.toLowerCase().includes(searchLower) ||
      collection.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileType: string): string => {
  if (fileType.startsWith('image/')) return 'Image';
  if (fileType.startsWith('video/')) return 'Video';
  if (fileType.startsWith('audio/')) return 'Audio';
  if (fileType === 'application/pdf') return 'FileText';
  if (fileType.includes('spreadsheet') || fileType.includes('excel')) return 'Table';
  if (fileType.includes('document') || fileType.includes('word')) return 'FileText';
  return 'File';
};

export const getMediaTypeColor = (type: MediaType): string => {
  const colors = {
    image: 'text-blue-600 bg-blue-100',
    video: 'text-purple-600 bg-purple-100',
    document: 'text-green-600 bg-green-100',
    audio: 'text-orange-600 bg-orange-100',
  };
  return colors[type];
};

export const calculateTotalStorage = (items: MediaItem[]): number => {
  return items.reduce((total, item) => total + item.fileSize, 0);
};

export const getStorageStats = (items: MediaItem[]) => {
  const total = calculateTotalStorage(items);
  const byType = items.reduce((acc, item) => {
    acc[item.mediaType] = (acc[item.mediaType] || 0) + item.fileSize;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: formatFileSize(total),
    byType: Object.entries(byType).map(([type, size]) => ({
      type,
      size: formatFileSize(size),
      percentage: Math.round((size / total) * 100)
    }))
  };
};

export const getMostUsedMedia = (items: MediaItem[], limit: number = 5) => {
  return items
    .filter(item => item.usageCount > 0)
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
};

export const getRecentlyUploaded = (items: MediaItem[], limit: number = 5) => {
  return items
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);
};

export const getMediaUsageStats = (items: MediaItem[]) => {
  const stats = {
    totalItems: items.length,
    activeItems: items.filter(item => item.status === 'active').length,
    archivedItems: items.filter(item => item.status === 'archived').length,
    totalUsage: items.reduce((sum, item) => sum + item.usageCount, 0),
    byType: items.reduce((acc, item) => {
      acc[item.mediaType] = (acc[item.mediaType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
  
  return stats;
};