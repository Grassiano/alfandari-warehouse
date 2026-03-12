"use client";

import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecentSearch } from "@/lib/storage";

interface RecentSearchesProps {
  items: RecentSearch[];
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function RecentSearches({ items, onSelect, onClear }: RecentSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          חיפושים אחרונים
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-[11px] text-muted-foreground"
          onClick={onClear}
        >
          <X className="ml-1 h-3 w-3" />
          נקה
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary cursor-pointer"
          >
            <span className="text-foreground">{item.name}</span>
            <span className="mr-1.5 text-muted-foreground">{item.sku}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
