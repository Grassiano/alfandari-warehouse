"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { InventoryItem } from "@/lib/types";

interface SearchInputProps {
  onSelect: (item: InventoryItem) => void;
}

export function SearchInput({ onSelect }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<InventoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/inventory?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const data = (await res.json()) as InventoryItem[];
        setResults(data);
        setIsOpen(data.length > 0);
        setActiveIndex(-1);
      } catch {
        // aborted
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (item: InventoryItem) => {
    onSelect(item);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="חפש חלק לפי שם או מק״ט..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className="h-14 rounded-xl border-2 bg-card pr-11 text-base shadow-sm placeholder:text-muted-foreground/60 focus:border-primary"
          autoComplete="off"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-xl border bg-card shadow-lg">
          <ul className="max-h-64 overflow-y-auto">
            {results.map((item, i) => (
              <li key={item.id}>
                <button
                  className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-right transition-colors ${
                    i === activeIndex ? "bg-primary/10" : "hover:bg-secondary"
                  }`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.sku} · {item.size}
                    </p>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    {item.location}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
