export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  isOnSale?: boolean;
  discount?: number;
}

export interface ProductFilters {
  category: string;
  search: string;
  priceRange: [number, number];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
