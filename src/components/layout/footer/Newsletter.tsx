// 📦src/components/layout/footer/Newsletter.tsx - UPDATED
"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

interface NewsletterProps {
  compact?: boolean;
}

export function Newsletter({ compact = false }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="w-full">
      {!compact && (
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-[#FF6B35]">Stay Updated</h3>
          <p className="text-gray-300 text-sm">
            Subscribe for exclusive offers and updates.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#E85A28] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}