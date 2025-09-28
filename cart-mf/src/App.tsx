import { useState } from "react";
import Cart from "./components/Cart";
import type { CartItem } from "./types";
import "./index.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: "MacBook Pro M3",
      price: 2999.99,
      quantity: 1,
      image: "💻"
    },
    {
      id: 2,
      productId: 2,
      name: "iPhone 15 Pro",
      price: 1199.99,
      quantity: 2,
      image: "📱"
    }
  ]);

  return (
    <div className="min-h-screen">
      <Cart items={cartItems} onUpdateCart={setCartItems} />
    </div>
  );
}

export default App;
