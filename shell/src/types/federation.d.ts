/**
 * Definiciones de tipos para Module Federation
 * Necesario para TypeScript con microfrontends
 */

declare module "headerMf/Header" {
  const Header: React.ComponentType<{
    onMenuClick?: () => void;
    user?: {
      name: string;
      avatar: string;
    };
  }>;
  export default Header;
}

declare module "productMf/ProductList" {
  const ProductList: React.ComponentType<{
    onAddToCart?: (productId: string) => void;
    category?: string;
  }>;
  export default ProductList;
}

declare module "productMf/ProductDetail" {
  const ProductDetail: React.ComponentType<{
    productId: string;
    onAddToCart?: (productId: string) => void;
  }>;
  export default ProductDetail;
}

declare module "cartMf/Cart" {
  const Cart: React.ComponentType<{
    isOpen?: boolean;
    onClose?: () => void;
    items?: CartItem[];
  }>;
  export default Cart;
}

declare module "cartMf/CartButton" {
  const CartButton: React.ComponentType<{
    itemCount: number;
    onClick?: () => void;
  }>;
  export default CartButton;
}

declare module "userMf/Profile" {
  const Profile: React.ComponentType<{
    userId: string;
  }>;
  export default Profile;
}

declare module "userMf/Login" {
  const Login: React.ComponentType<{
    onLogin?: (user: any) => void;
  }>;
  export default Login;
}

// Tipos globales para la aplicación
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  inStock: boolean;
}
