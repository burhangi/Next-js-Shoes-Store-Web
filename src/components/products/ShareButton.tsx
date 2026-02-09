"use client";

import { useState } from "react";
import { Share2, Check, Copy, Facebook, Twitter, Instagram } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/lib/data/products/types";

interface ShareButtonProps extends Omit<ButtonProps, 'onClick'> {
  product: Product;
  variant?: ButtonProps['variant'];
  onShare?: (platform: string) => void;
}

export function ShareButton({
  product,
  variant = "ghost",
  onShare,
  className,
  size = "default",
  ...props
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/products/${product.slug}`
    : `/products/${product.slug}`;
    
  const shareText = `Check out ${product.name}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setShowSuccess(true);
      onShare?.('copy');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToPlatform = (platform: string) => {
    const platforms: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    };

    const url = platforms[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      onShare?.(platform);
    }
  };

  const shareItems = [
    {
      icon: <Copy className="h-4 w-4" />,
      label: "Copy Link",
      onClick: handleCopyLink,
      success: copied,
    },
    {
      icon: <Facebook className="h-4 w-4 text-blue-600" />,
      label: "Facebook",
      onClick: () => shareToPlatform('facebook'),
    },
    {
      icon: <Twitter className="h-4 w-4 text-sky-500" />,
      label: "Twitter",
      onClick: () => shareToPlatform('twitter'),
    },
    {
      icon: <Instagram className="h-4 w-4 text-pink-600" />,
      label: "Instagram",
      onClick: () => shareToPlatform('whatsapp'),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "relative overflow-hidden",
            showSuccess && "bg-green-50 text-green-700 border-green-200",
            className
          )}
          {...props}
        >
          {showSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 mr-2" />
              {size !== "icon" && size !== "icon-sm" && "Share"}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-3 cursor-pointer",
              item.success && "bg-green-50 text-green-700"
            )}
          >
            <span className="flex-shrink-0">
              {item.success ? <Check className="h-4 w-4" /> : item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}