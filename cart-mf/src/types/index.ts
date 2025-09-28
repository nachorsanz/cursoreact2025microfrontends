export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}
