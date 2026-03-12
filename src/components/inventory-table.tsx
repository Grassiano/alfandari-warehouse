"use client";

import { useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { InventoryItem, InventoryFormData } from "@/lib/types";

interface InventoryTableProps {
  items: InventoryItem[];
  loading: boolean;
  filter: string;
  onFilterChange: (v: string) => void;
  onCreate: (data: InventoryFormData) => Promise<void>;
  onUpdate: (id: string, data: InventoryFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const emptyForm: InventoryFormData = {
  name: "",
  sku: "",
  quantity: 0,
  location: "",
  size: "",
};

export function InventoryTable({
  items,
  loading,
  filter,
  onFilterChange,
  onCreate,
  onUpdate,
  onDelete,
}: InventoryTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<InventoryFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      location: item.location,
      size: item.size,
    });
    setDialogOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.sku) {
      toast.error("שם ומק״ט הם שדות חובה");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await onUpdate(editingId, form);
        toast.success("הפריט עודכן בהצלחה");
      } else {
        await onCreate(form);
        toast.success("הפריט נוסף בהצלחה");
      }
      setDialogOpen(false);
    } catch {
      toast.error("שגיאה בשמירה");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await onDelete(deletingId);
      toast.success("הפריט נמחק");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("שגיאה במחיקה");
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="סנן לפי שם, מק״ט או מיקום..."
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="h-4 w-4" />
          הוסף פריט
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-1.5 text-right text-xs">שם</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-xs">מק&quot;ט</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-xs">כמות</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-xs">מיקום</TableHead>
              <TableHead className="hidden px-2 py-1.5 text-right text-xs sm:table-cell">גודל</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  {filter ? "לא נמצאו תוצאות" : "אין פריטים במלאי"}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger render={<TableRow />}>
                    <TableCell
                      className="cursor-pointer whitespace-nowrap px-2 py-1.5 text-xs font-medium hover:text-primary"
                      onClick={() => {
                        navigator.clipboard.writeText(item.name);
                        toast("הועתק!", { description: item.name });
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      className="cursor-pointer whitespace-nowrap px-2 py-1.5 font-mono text-xs hover:text-primary"
                      onClick={() => {
                        navigator.clipboard.writeText(item.sku);
                        toast("הועתק!", { description: item.sku });
                      }}
                    >
                      {item.sku}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-2 py-1.5 text-xs">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-2 py-1.5 text-xs">
                      <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                        {item.location}
                      </span>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap px-2 py-1.5 text-xs text-muted-foreground sm:table-cell">
                      {item.size}
                    </TableCell>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onSelect={() => openEdit(item)}>
                      עריכה
                    </ContextMenuItem>
                    <ContextMenuItem
                      onSelect={() => openDelete(item.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      מחיקה
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        {items.length} פריטים
      </p>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "עריכת פריט" : "הוספת פריט חדש"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">שם</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="פורמייקה 244"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="sku">מק&quot;ט</Label>
                <Input
                  id="sku"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  placeholder="3102"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="quantity">כמות</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="location">מיקום</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="A7"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="size">גודל</Label>
                <Input
                  id="size"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  placeholder="244*122"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              ביטול
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              {editingId ? "שמור" : "הוסף"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>מחיקת פריט</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            האם אתה בטוח שברצונך למחוק את הפריט? פעולה זו אינה ניתנת לביטול.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              ביטול
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              מחק
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
