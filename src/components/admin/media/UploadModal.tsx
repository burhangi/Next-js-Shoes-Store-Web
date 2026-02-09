'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image, Video, FileText, Music, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils/cn';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], metadata?: any) => void;
}

interface UploadFile extends File {
  preview?: string;
  progress?: number;
  status?: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [metadata, setMetadata] = useState({
    altText: '',
    caption: '',
    description: '',
    tags: [] as string[],
    collections: [] as string[],
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles = fileList.map(file => {
      const uploadFile: UploadFile = file;
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFiles(prev => prev.map(f => 
            f.name === file.name ? { ...f, preview: reader.result as string } : f
          ));
        };
        reader.readAsDataURL(file);
      }
      
      uploadFile.status = 'pending';
      return uploadFile;
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !metadata.tags.includes(currentTag.trim())) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const simulateUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    const progress: Record<string, number> = {};
    
    // Initialize progress
    files.forEach(file => {
      progress[file.name] = 0;
    });
    setUploadProgress(progress);
    
    // Simulate upload progress
    for (const file of files) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: i
        }));
      }
    }
    
    // Complete upload
    setTimeout(() => {
      setUploading(false);
      onUpload(files, metadata);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setFiles([]);
    setUploadProgress({});
    setMetadata({
      altText: '',
      caption: '',
      description: '',
      tags: [],
      collections: [],
    });
    onClose();
  };

  const getFileIcon = (file: UploadFile) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    if (file.type === 'application/pdf') return FileText;
    return FileText;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const acceptedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="
        max-w-4xl 
        w-[95vw] 
        h-[90vh] 
        md:h-auto 
        md:max-h-[90vh]
        mx-auto 
        my-4
        md:my-8
        flex 
        flex-col
        overflow-hidden
        bg-white
        rounded-xl
        shadow-2xl
      ">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Upload Media
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Upload images, videos, documents, and audio files
              </DialogDescription>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="files" className="flex-1 flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="files" className="flex items-center gap-2">
                  Files
                  {files.length > 0 && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                      {files.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <TabsContent value="files" className="space-y-4 m-0 h-full">
                {/* Drag & Drop Area */}
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-4 md:p-8 text-center transition-all duration-200",
                    dragActive 
                      ? "border-primary bg-primary/5 border-[3px]" 
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Drag & drop files here
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    or click to browse files
                  </p>
                  <p className="text-xs text-gray-500 mb-6 px-4">
                    Supports images (JPEG, PNG, GIF, SVG, WebP), videos (MP4, WebM), 
                    audio (MP3, WAV), and documents (PDF, DOC, DOCX)
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <label htmlFor="file-upload">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="w-full sm:w-auto cursor-pointer"
                      >
                        Browse Files
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept={acceptedTypes.join(',')}
                        onChange={handleFileInput}
                      />
                    </label>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="w-full sm:w-auto"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h3 className="font-semibold text-gray-900">
                        Selected Files ({files.length})
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFiles([])}
                        disabled={uploading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                      {files.map((file, index) => {
                        const FileIcon = getFileIcon(file);
                        const progress = uploadProgress[file.name] || 0;
                        
                        return (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 gap-3 sm:gap-0"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {file.preview ? (
                                <div className="relative">
                                  <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-14 h-14 object-cover rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/5 rounded-lg"></div>
                                </div>
                              ) : (
                                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <FileIcon className="w-6 h-6 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate" title={file.name}>
                                  {file.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {formatFileSize(file.size)} • {file.type.split('/')[1]?.toUpperCase() || 'File'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3">
                              {uploading && (
                                <div className="w-24 sm:w-32">
                                  <Progress value={progress} className="h-2" />
                                  <p className="text-xs text-gray-500 text-right mt-1">
                                    {progress}%
                                  </p>
                                </div>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(index)}
                                disabled={uploading}
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary */}
                    <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">Total Files</p>
                          <p className="text-xl font-semibold text-gray-900">{files.length}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">Total Size</p>
                          <p className="text-xl font-semibold text-gray-900">{formatFileSize(totalSize)}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-gray-200 col-span-2 md:col-span-1">
                          <p className="text-sm text-gray-600">Allowed Types</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">Images, Videos, Audio, Docs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="metadata" className="space-y-6 m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="altText" className="font-medium text-gray-900">
                        Alt Text
                      </Label>
                      <Input
                        id="altText"
                        value={metadata.altText}
                        onChange={(e) => setMetadata(prev => ({ ...prev, altText: e.target.value }))}
                        placeholder="Descriptive text for accessibility"
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500">
                        Important for SEO and accessibility
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caption" className="font-medium text-gray-900">
                        Caption
                      </Label>
                      <Input
                        id="caption"
                        value={metadata.caption}
                        onChange={(e) => setMetadata(prev => ({ ...prev, caption: e.target.value }))}
                        placeholder="Brief caption for the media"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="font-medium text-gray-900">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={metadata.description}
                        onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the media"
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-900">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="Add tags"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="h-11 flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={addTag} 
                          variant="outline"
                          className="h-11 px-4"
                        >
                          Add
                        </Button>
                      </div>
                      
                      {metadata.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {metadata.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="pl-3 pr-2 py-1.5 flex items-center gap-1 bg-gray-100 hover:bg-gray-200"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-red-600 ml-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="font-medium text-gray-900">Collections</Label>
                      <div className="space-y-2 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        {['Product Images', 'Marketing Banners', 'Social Media', 'Website Assets'].map((collection) => (
                          <label 
                            key={collection} 
                            className="flex items-center p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={metadata.collections.includes(collection)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setMetadata(prev => ({
                                    ...prev,
                                    collections: [...prev.collections, collection]
                                  }));
                                } else {
                                  setMetadata(prev => ({
                                    ...prev,
                                    collections: prev.collections.filter(c => c !== collection)
                                  }));
                                }
                              }}
                              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                            />
                            <span className="ml-3 text-gray-700">{collection}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800 mb-2">Tips for better media</p>
                          <ul className="text-sm text-yellow-700 space-y-1.5">
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <span>Use descriptive alt text for accessibility</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <span>Add relevant tags for better searchability</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <span>Keep file sizes optimized for web</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <span>Use proper naming conventions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {files.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{files.length} file{files.length !== 1 ? 's' : ''}</span>
                  <span className="text-gray-400">•</span>
                  <span>{formatFileSize(totalSize)}</span>
                </div>
              ) : (
                'No files selected'
              )}
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={uploading}
                className="h-11 px-6"
              >
                Cancel
              </Button>
              
              <Button
                type="button"
                onClick={simulateUpload}
                disabled={files.length === 0 || uploading}
                className="h-11 px-8 bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload {files.length} file{files.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};