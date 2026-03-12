export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  size: string;
}

export interface InventoryFormData {
  name: string;
  sku: string;
  quantity: number;
  location: string;
  size: string;
}
