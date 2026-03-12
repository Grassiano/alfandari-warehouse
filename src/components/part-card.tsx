"use client";

import { MapPin, Hash, Package, Ruler } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { InventoryItem } from "@/lib/types";

interface PartCardProps {
  item: InventoryItem;
}

export function PartCard({ item }: PartCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Location — big and prominent */}
      <div className="mb-4 flex items-center justify-center rounded-lg bg-primary/10 px-4 py-6">
        <MapPin className="ml-2 h-6 w-6 text-primary" />
        <CopyButton value={item.location} label="מיקום">
          <span className="text-3xl font-black text-primary">
            {item.location}
          </span>
        </CopyButton>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-secondary/50 p-3">
          <span className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Hash className="h-3 w-3" />
            מק&quot;ט
          </span>
          <CopyButton value={item.sku} label="מק״ט" className="font-bold text-foreground">
            <span>{item.sku}</span>
          </CopyButton>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <span className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Package className="h-3 w-3" />
            כמות
          </span>
          <p className="font-bold">{item.quantity}</p>
        </div>
        <div className="col-span-2 rounded-lg bg-secondary/50 p-3">
          <span className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Ruler className="h-3 w-3" />
            שם / גודל
          </span>
          <p className="font-bold">
            {item.name} — {item.size}
          </p>
        </div>
      </div>
    </div>
  );
}
