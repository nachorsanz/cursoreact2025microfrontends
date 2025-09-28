import { useState } from "react";
import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import { CartItem } from "./types";
import "./App.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: 'MacBook Pro 16" M3 Max',
      price: 3299,
      quantity: 1,
      image: "💻",
      maxQuantity: 5,
    },
    {
      id: "2",
      name: "iPhone 15 Pro Max",
      price: 1199,
      quantity: 2,
      image: "📱",
      maxQuantity: 3,
    },
    {
      id: "3",
      name: "AirPods Pro (3ra Gen)",
      price: 249,
      quantity: 1,
      image: "🎧",
      maxQuantity: 10,
    },
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckout = (items: CartItem[]) => {
    console.log("Checkout with items:", items);
    setCartItems([]); // Clear cart after checkout
    setIsCartOpen(false);
  };

  const handleAddDemoItem = () => {
    const demoItems = [
      { id: "4", name: 'iPad Pro 12.9"', price: 1099, quantity: 1, image: "📱" },
      { id: "5", name: "Teclado Mecánico", price: 129, quantity: 1, image: "⌨️" },
      { id: "6", name: "Mouse Gaming", price: 79, quantity: 1, image: "🖱️" },
      { id: "7", name: "Monitor 4K", price: 599, quantity: 1, image: "🖥️" },
      { id: "8", name: "Webcam HD", price: 149, quantity: 1, image: "📷" },
    ];

    const randomItem = demoItems[Math.floor(Math.random() * demoItems.length)];
    const existingItem = cartItems.find((item) => item.id === randomItem.id);

    if (existingItem) {
      handleUpdateQuantity(randomItem.id, existingItem.quantity + 1);
    } else {
      setCartItems((prev) => [...prev, randomItem]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🛒 Cart Microfrontend</h1>
              <p className="text-sm text-gray-600">Modo Standalone - Puerto 5003</p>
            </div>

            <div className="flex items-center space-x-4">
              <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} variant="default" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🎮 Panel de Demostración</h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Estados del Carrito:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span className="font-bold">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Productos únicos:</span>
                    <span className="font-bold">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">
                      ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado:</span>
                    <span className={`font-bold ${isCartOpen ? "text-green-600" : "text-gray-600"}`}>
                      {isCartOpen ? "✅ Abierto" : "💤 Cerrado"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  🛒 Abrir Carrito
                </button>

                <button
                  onClick={handleAddDemoItem}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  ➕ Agregar Item Aleatorio
                </button>

                <button
                  onClick={() => setCartItems([])}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>
            </div>
          </div>

          {/* Component Variants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🎨 Variantes de Componentes</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-3">CartButton Variants:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Default:</span>
                    <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} variant="default" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Minimal:</span>
                    <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} variant="minimal" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-3">Items en Carrito:</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">Carrito vacío</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.image}</span>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              ${item.price} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Microfrontend Info */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-900 mb-4">🎯 Información del Microfrontend</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-bold text-orange-700">Puerto</div>
              <div className="text-orange-600">5003</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-bold text-orange-700">Expone</div>
              <div className="text-orange-600">Cart + CartButton</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-bold text-orange-700">Estado</div>
              <div className="text-orange-600">✅ Activo</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-bold text-orange-700">Comunicación</div>
              <div className="text-orange-600">Props + Callbacks</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-orange-800">
            <p>
              💡 Este microfrontend maneja todo el estado del carrito de compras, incluyendo cálculos de totales,
              gestión de items, y proceso de checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Cart Button (demo) */}
      <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} variant="floating" />

      {/* Cart Component */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
