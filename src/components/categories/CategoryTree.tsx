"use client";

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Minus, Edit, Trash2 } from 'lucide-react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export interface CategoryNode {
  id: string
  name: string
  slug: string
  productCount: number
  children?: CategoryNode[]
  expanded?: boolean
  selected?: boolean
  badge?: string
  icon?: string
}

interface CategoryTreeProps {
  categories: CategoryNode[]
  onSelect?: (node: CategoryNode) => void
  onToggleExpand?: (nodeId: string) => void
  onAddCategory?: (parentId?: string) => void
  onEditCategory?: (node: CategoryNode) => void
  onDeleteCategory?: (node: CategoryNode) => void
  showCounts?: boolean
  showBadges?: boolean
  showIcons?: boolean
  selectable?: boolean
  draggable?: boolean
  showActions?: boolean
  className?: string
  maxDepth?: number
  searchable?: boolean
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onSelect,
  onToggleExpand,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  showCounts = true,
  showBadges = true,
  showIcons = true,
  selectable = false,
  draggable = false,
  showActions = false,
  className,
  maxDepth = 5,
  searchable = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [draggedNode, setDraggedNode] = useState<CategoryNode | null>(null)
  const [dragOverNode, setDragOverNode] = useState<CategoryNode | null>(null)

  const filterCategories = (nodes: CategoryNode[], query: string): CategoryNode[] => {
    if (!query) return nodes

    return nodes
      .filter(node => 
        node.name.toLowerCase().includes(query.toLowerCase()) ||
        node.slug.toLowerCase().includes(query.toLowerCase())
      )
      .map(node => ({
        ...node,
        children: node.children ? filterCategories(node.children, query) : undefined,
        expanded: query ? true : node.expanded
      }))
  }

  const handleDragStart = (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo, node: CategoryNode) => {
    if (!draggable) return
    setDraggedNode(node)
  }

  const handleDragEnd = (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    if (!draggable) return
    setDraggedNode(null)
    setDragOverNode(null)
  }

  const handleDragOver = (e: React.DragEvent, node: CategoryNode) => {
    if (!draggable) return
    e.preventDefault()
    setDragOverNode(node)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (!draggable) return
    setDragOverNode(null)
  }

  const handleDrop = (e: React.DragEvent, targetNode: CategoryNode) => {
    if (!draggable || !draggedNode) return
    e.preventDefault()
    
    // Here you would typically call an API to update the category hierarchy
    console.log(`Moving ${draggedNode.name} to ${targetNode.name}`)
    
    setDraggedNode(null)
    setDragOverNode(null)
  }

  const renderNode = (node: CategoryNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = node.expanded || searchQuery.length > 0
    const isDragged = draggedNode?.id === node.id
    const isDragOver = dragOverNode?.id === node.id

    return (
      <div key={node.id} className="space-y-1">
        {/* Node */}
        <motion.div
          layout
          drag={draggable}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={(event, info) => handleDragStart(event, info, node)}
          onDragEnd={handleDragEnd}
          onDragOver={(e: React.DragEvent) => handleDragOver(e, node)}
          onDragLeave={handleDragLeave}
          onDrop={(e: React.DragEvent) => handleDrop(e, node)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group",
            node.selected
              ? "bg-accent-50 text-accent-700"
              : "hover:bg-primary-50",
            isDragged && "opacity-50",
            isDragOver && "bg-primary-100 border-2 border-primary-300"
          )}
          style={{ marginLeft: `${depth * 24}px` }}
          whileDrag={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={() => onToggleExpand?.(node.id)}
              className="p-1 hover:bg-white rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-primary-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-primary-500" />
              )}
            </button>
          )}

          {/* Spacer for nodes without children */}
          {!hasChildren && <div className="w-6" />}

          {/* Select Checkbox */}
          {selectable && (
            <Checkbox
              checked={node.selected}
              onCheckedChange={() => onSelect?.(node)}
              className="mr-2"
            />
          )}

          {/* Icon */}
          {showIcons && (
            <div className="text-primary-500">
              {isExpanded && hasChildren ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </div>
          )}

          {/* Node Content */}
          <button
            onClick={() => onSelect?.(node)}
            className="flex-1 text-left flex items-center gap-3"
          >
            <span className="font-medium text-sm">{node.name}</span>
            
            {/* Badge */}
            {showBadges && node.badge && (
              <Badge className="text-xs bg-accent-100 text-accent-800">
                {node.badge}
              </Badge>
            )}

            {/* Product Count */}
            {showCounts && (
              <span className="text-xs text-primary-500 ml-auto">
                ({node.productCount})
              </span>
            )}
          </button>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onAddCategory && depth < maxDepth && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddCategory(node.id)
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
              {onEditCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditCategory(node)
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
              {onDeleteCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteCategory(node)
                  }}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children?.map(child => renderNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const filteredCategories = filterCategories(categories, searchQuery)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary-900">Categories</h3>
        {onAddCategory && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddCategory()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Root Category
          </Button>
        )}
      </div>

      {/* Search */}
      {searchable && (
        <div className="relative">
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500">
            🔍
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Tree */}
      <div className="border rounded-lg p-2 bg-white max-h-[600px] overflow-y-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 text-primary-500">
            No categories found
          </div>
        ) : (
          filteredCategories.map(node => renderNode(node))
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-primary-600 pt-2 border-t">
        <div>
          Total: {categories.length} categories
        </div>
        <div className="flex items-center gap-4">
          {draggable && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent-200 rounded" />
              <span>Drag to reorder</span>
            </div>
          )}
          {showActions && (
            <div className="flex items-center gap-2">
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook for managing category tree state
export const useCategoryTree = (initialCategories: CategoryNode[] = []) => {
  const [categories, setCategories] = useState<CategoryNode[]>(initialCategories)

  const toggleExpand = (nodeId: string) => {
    const updateNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }
    setCategories(updateNode(categories))
  }

  const toggleSelect = (nodeId: string) => {
    const updateNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        const isSelected = node.id === nodeId ? !node.selected : node.selected
        const children = node.children ? updateNode(node.children) : undefined
        
        // Auto-select all children if parent is selected
        if (isSelected && children) {
          children.forEach(child => child.selected = true)
        }
        
        return {
          ...node,
          selected: isSelected,
          children
        }
      })
    }
    setCategories(updateNode(categories))
  }

  const addCategory = (parentId?: string, name = 'New Category') => {
    const newNode: CategoryNode = {
      id: `category-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      productCount: 0,
      children: []
    }

    if (!parentId) {
      setCategories([...categories, newNode])
      return
    }

    const addToNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
            expanded: true
          }
        }
        if (node.children) {
          return { ...node, children: addToNode(node.children) }
        }
        return node
      })
    }
    setCategories(addToNode(categories))
  }

  const deleteCategory = (nodeId: string) => {
    const removeNode = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.filter(node => node.id !== nodeId)
        .map(node => ({
          ...node,
          children: node.children ? removeNode(node.children) : undefined
        }))
    }
    setCategories(removeNode(categories))
  }

  return {
    categories,
    toggleExpand,
    toggleSelect,
    addCategory,
    deleteCategory,
    setCategories
  }
}