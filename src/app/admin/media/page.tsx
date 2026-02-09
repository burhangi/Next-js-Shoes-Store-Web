// 📦 src/app/admin/media/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { MediaGrid } from '@/components/admin/media/MediaGrid';
import { MediaStats } from '@/components/admin/media/MediaStats';
import { UploadModal } from '@/components/admin/media/UploadModal';
import { 
  getMediaItems, 
  getMediaCollections, 
  MediaItem, 
  MediaCollection,
  getStorageStats,
  getMediaUsageStats
} from '@/lib/data/media';
import { Upload, Folder, Filter, Search, Download, Trash2, Grid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export default function MediaPage() {
  // State for filters
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'image' | 'video' | 'document' | 'audio',
    status: 'all' as 'all' | 'active' | 'archived' | 'deleted' | 'processing',
    search: '',
    sortBy: 'date-desc' as 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc' | 'size-asc' | 'size-desc',
    collection: 'all',
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Get filtered media items
  const mediaItems = useMemo(() => {
    return getMediaItems({
      type: filters.type !== 'all' ? filters.type : undefined,
      status: filters.status !== 'all' ? filters.status : undefined,
      collection: filters.collection !== 'all' ? filters.collection : undefined,
      search: filters.search || undefined,
    });
  }, [filters]);

  // Get collections for filter
  const collections = useMemo(() => {
    return getMediaCollections();
  }, []);

  // Get stats
  const stats = useMemo(() => {
    return getMediaUsageStats(mediaItems);
  }, [mediaItems]);

  const storageStats = getStorageStats(mediaItems);

  // Handlers
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      search: '',
      sortBy: 'date-desc',
      collection: 'all',
    });
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === mediaItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(mediaItems.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handlePreview = (item: MediaItem) => {
    console.log('Preview item:', item);
    window.open(item.url, '_blank');
  };

  const handleEdit = (item: MediaItem) => {
    console.log('Edit item:', item);
    // Open edit modal
  };

  const handleDelete = (item: MediaItem) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      console.log('Delete item:', item);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    console.log('URL copied to clipboard');
    // Show toast
  };

  const handleDownload = (item: MediaItem) => {
    console.log('Download item:', item);
  };

  const handleUpload = (files: File[], metadata?: any) => {
    console.log('Uploading files:', files, metadata);
    // Handle upload logic
    setUploadModalOpen(false);
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    if (confirm(`Delete ${selectedItems.length} selected items? This action cannot be undone.`)) {
      console.log('Bulk delete:', selectedItems);
      setSelectedItems([]);
    }
  };

  const handleBulkDownload = () => {
    if (selectedItems.length === 0) return;
    
    console.log('Bulk download:', selectedItems);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage all your images, videos, documents, and audio files in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => console.log('Export')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={() => setUploadModalOpen(true)}
            className="bg-primary hover:bg-primary-dark flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Stats */}
      <MediaStats items={mediaItems} />

      {/* Quick Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search media by name, filename, tags..."
            value={filters.search}
            onChange={(e) => handleFiltersChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => handleFiltersChange({ type: value as any })}
        >
          <SelectTrigger className="w-[140px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>

        {/* Collection Filter */}
        <Select
          value={filters.collection}
          onValueChange={(value) => handleFiltersChange({ collection: value })}
        >
          <SelectTrigger className="w-[160px]">
            <Folder className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Collections</SelectItem>
            {collections.map(collection => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFiltersChange({ sortBy: value as any })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="date-asc">Oldest first</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="size-asc">Size (smallest)</SelectItem>
            <SelectItem value="size-desc">Size (largest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === mediaItems.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleBulkDownload}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download Selected
                  </Button>
                  <Button
                    onClick={handleBulkDelete}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Selected
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSelectedItems([])}
                variant="ghost"
                size="sm"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('grid')}
            className="flex items-center gap-2"
          >
            <Grid className="w-4 h-4" />
            Grid View
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            List View
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          {mediaItems.length} item{mediaItems.length !== 1 ? 's' : ''}
          {filters.search && ` matching "${filters.search}"`}
          {filters.type !== 'all' && ` • ${filters.type}s`}
          {filters.collection !== 'all' && ` • in "${collections.find(c => c.id === filters.collection)?.name}"`}
        </div>
      </div>

      {/* Media Grid/List */}
      <MediaGrid
        items={mediaItems}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        onPreview={handlePreview}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCopyUrl={handleCopyUrl}
        onDownload={handleDownload}
        onUpload={() => setUploadModalOpen(true)}
        onViewChange={setView}
      />

      {/* Collections Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Collections</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Create collection')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Collection
          </Button>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.slice(0, 6).map(collection => (
              <Card key={collection.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{collection.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
                    </div>
                    <Folder className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{collection.itemCount} items</span>
                    <span className="capitalize">{collection.type}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {collection.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {collection.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{collection.tags.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* View All Collections Card */}
            {collections.length > 6 && (
              <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[120px]">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      View All Collections
                    </div>
                    <div className="text-xs text-gray-600">
                      {collections.length - 6} more collections
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first collection to organize media files
              </p>
              <Button
                onClick={() => console.log('Create collection')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Collection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Clear Filters Button */}
      {(filters.search || filters.type !== 'all' || filters.status !== 'all' || filters.collection !== 'all') && (
        <div className="flex justify-center">
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}