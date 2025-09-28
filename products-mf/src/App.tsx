import { useState } from "react";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [viewedProducts, setViewedProducts] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCartCount((prev) => prev + 1);
    console.log("Product added to cart:", productId);
  };

  const handleViewDetails = (productId: string) => {
    setViewedProducts((prev) => [...new Set([...prev, productId])]);
    console.log("Viewing product details:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de desarrollo */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🛍️ Products Microfrontend</h1>
              <p className="text-sm text-gray-600">Modo Standalone - Desarrollo</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items en carrito:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">{cartCount}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Productos vistos:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                  {viewedProducts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente principal */}
      <ProductList onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />

      {/* Panel de información de desarrollo */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900 mb-3">📊 Estado del Microfrontend</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
            <span className="text-blue-900">Puerto:</span>
            <span className="text-blue-700 font-mono">5002</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-green-50 rounded">
            <span className="text-green-900">Estado:</span>
            <span className="text-green-700">✅ Activo</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
            <span className="text-purple-900">Expone:</span>
            <span className="text-purple-700 font-mono">ProductList</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
            <span className="text-orange-900">También:</span>
            <span className="text-orange-700 font-mono">ProductCard</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">🚀 Funcionalidades:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 🔍 Búsqueda avanzada</li>
            <li>• 🏷️ Filtrado por categorías</li>
            <li>• 💰 Filtro de precios</li>
            <li>• ⭐ Filtro por rating</li>
            <li>• 📊 Vista grid/lista</li>
            <li>• 🛒 Integración con carrito</li>
            <li>• 📱 Completamente responsivo</li>
          </ul>
        </div>
      </div>

      {/* Historial de productos vistos (solo en desarrollo) */}
      {viewedProducts.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <h4 className="font-medium text-gray-900 mb-2">👁️ Últimos Vistos</h4>
          <div className="space-y-1">
            {viewedProducts.slice(-3).map((productId) => (
              <div key={productId} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                Producto #{productId}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
