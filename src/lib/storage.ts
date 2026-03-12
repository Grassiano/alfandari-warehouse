export interface RecentSearch {
  id: string;
  name: string;
  sku: string;
  location: string;
  timestamp: number;
}

const RECENT_KEY = "alfandari-recent-searches";
const MAX_RECENT = 10;

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(RECENT_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as RecentSearch[];
  } catch {
    return [];
  }
}

export function addRecentSearch(item: Omit<RecentSearch, "timestamp">): void {
  const recent = getRecentSearches().filter((r) => r.id !== item.id);
  recent.unshift({ ...item, timestamp: Date.now() });
  localStorage.setItem(
    RECENT_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT))
  );
}

export function clearRecentSearches(): void {
  localStorage.removeItem(RECENT_KEY);
}
