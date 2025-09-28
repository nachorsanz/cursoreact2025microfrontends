import { useState, useEffect } from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: (items: CartItem[]) => void;
}

export default function Cart({
  items,
  isOpen = false,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Animar items cuando cambian
  useEffect(() => {
    const newAnimated = new Set<string>();
    items.forEach((item) => {
      if (!animatedItems.has(item.id)) {
        newAnimated.add(item.id);
      }
    });

    if (newAnimated.size > 0) {
      setAnimatedItems((prev) => new Set([...prev, ...newAnimated]));
      setTimeout(() => {
        setAnimatedItems((prev) => {
          const updated = new Set(prev);
          newAnimated.forEach((id) => updated.delete(id));
          return updated;
        });
      }, 500);
    }
  }, [items]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveItem?.(itemId);
    } else {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    // Simular proceso de checkout
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onCheckout?.(items);
      alert("¡Pedido realizado con éxito! 🎉");
    } catch (error) {
      alert("Error al procesar el pedido. Inténtalo de nuevo.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose} />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">🛒 Carrito</h2>
            <p className="text-sm text-gray-600">
              {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-600 mb-4">Agrega algunos productos para comenzar</p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continúar Comprando
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 ${
                    animatedItems.has(item.id) ? "animate-bounce" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image/Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{item.image || "📦"}</span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-sm">${item.price.toFixed(2)} cada uno</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <span className="text-sm">−</span>
                        </button>

                        <span className="w-8 text-center font-semibold">{item.quantity}</span>

                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          disabled={item.maxQuantity && item.quantity >= item.maxQuantity}
                        >
                          <span className="text-sm">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => onRemoveItem?.(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-2 transition-colors"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {/* Order Summary */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold">{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
              </div>

              {shipping === 0 && (
                <div className="text-green-600 text-xs">🚚 ¡Envío gratis por compras mayores a $100!</div>
              )}

              <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Procesando...</span>
                </div>
              ) : (
                `Finalizar Compra - $${total.toFixed(2)}`
              )}
            </button>

            {/* Security badges */}
            <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <span>🔒</span>
                <span>Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>💳</span>
                <span>SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>✅</span>
                <span>Verificado</span>
              </div>
            </div>
          </div>
        )}

        {/* Microfrontend indicator */}
        <div className="bg-orange-100 border-t border-orange-200 p-2">
          <div className="text-center text-xs text-orange-800">
            🎯 Cart Microfrontend - Puerto 5003 | Items: {itemCount}
          </div>
        </div>
      </div>
    </>
  );
}
