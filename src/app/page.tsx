"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/search-input";
import { PartCard } from "@/components/part-card";
import { RecentSearches } from "@/components/recent-searches";
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from "@/lib/storage";
import type { InventoryItem } from "@/lib/types";
import type { RecentSearch } from "@/lib/storage";

export default function HomePage() {
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [recent, setRecent] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  const handleSelect = useCallback((item: InventoryItem) => {
    setSelected(item);
    addRecentSearch({
      id: item.id,
      name: item.name,
      sku: item.sku,
      location: item.location,
    });
    setRecent(getRecentSearches());
  }, []);

  const handleRecentSelect = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/inventory?q=`);
        const items = (await res.json()) as InventoryItem[];
        const item = items.find((i) => i.id === id);
        if (item) handleSelect(item);
      } catch {
        // ignore
      }
    },
    [handleSelect]
  );

  const handleClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecent([]);
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto max-w-xl px-4 py-6">
        <SearchInput onSelect={handleSelect} />

        {selected && (
          <div className="mt-5">
            <PartCard item={selected} />
          </div>
        )}

        <RecentSearches
          items={recent}
          onSelect={handleRecentSelect}
          onClear={handleClearRecent}
        />
      </main>
    </div>
  );
}
