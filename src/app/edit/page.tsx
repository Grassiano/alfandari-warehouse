"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { InventoryTable } from "@/components/inventory-table";
import type { InventoryItem, InventoryFormData } from "@/lib/types";

export default function EditPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inventory");
      const data = (await res.json()) as InventoryItem[];
      setItems(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (data: InventoryFormData) => {
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) await fetchItems();
  };

  const handleUpdate = async (id: string, data: InventoryFormData) => {
    const res = await fetch(`/api/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) await fetchItems();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/inventory/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  const filtered = filter
    ? items.filter(
        (i) =>
          i.name.includes(filter) ||
          i.sku.toLowerCase().includes(filter.toLowerCase()) ||
          i.location.includes(filter)
      )
    : items;

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <InventoryTable
          items={filtered}
          loading={loading}
          filter={filter}
          onFilterChange={setFilter}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
