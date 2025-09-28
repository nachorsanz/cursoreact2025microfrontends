export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartSummary {
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  itemCount: number;
}
