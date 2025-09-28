/**
 * Shell Application - Microfrontends Host
 * Orquesta y consume todos los microfrontends remotos
 */

import { useState, useEffect, Suspense, lazy } from "react";
import type { CartItem, User } from "./types/federation";
import "./App.css";

// Cargar microfrontends de forma lazy
const Header = lazy(() =>
  import("headerMf/Header").catch(() => ({
    default: () => <div className="bg-red-100 p-4 text-red-800">❌ Header MF no disponible</div>,
  })),
);

const ProductList = lazy(() =>
  import("productMf/ProductList").catch(() => ({
    default: () => <div className="bg-red-100 p-4 text-red-800">❌ Product MF no disponible</div>,
  })),
);

const Cart = lazy(() =>
  import("cartMf/Cart").catch(() => ({
    default: () => <div className="bg-red-100 p-4 text-red-800">❌ Cart MF no disponible</div>,
  })),
);

const CartButton = lazy(() =>
  import("cartMf/CartButton").catch(() => ({
    default: ({ itemCount }: { itemCount: number }) => (
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Cart ({itemCount})</button>
    ),
  })),
);

const Profile = lazy(() =>
  import("userMf/Profile").catch(() => ({
    default: () => <div className="bg-red-100 p-4 text-red-800">❌ User MF no disponible</div>,
  })),
);

const Login = lazy(() =>
  import("userMf/Login").catch(() => ({
    default: ({ onLogin }: { onLogin: (user: any) => void }) => (
      <div className="bg-yellow-100 p-4 text-yellow-800">
        ⚠️ Login MF no disponible
        <button onClick={() => onLogin({ id: "1", name: "Demo User", email: "demo@example.com" })}>Login Demo</button>
      </div>
    ),
  })),
);

/**
 * Componente de carga para microfrontends
 */
function MicrofrontendLoader({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Cargando {name}...</p>
      </div>
    </div>
  );
}

/**
 * Error Boundary para microfrontends
 */
function MicrofrontendErrorBoundary({
  children,
  fallback,
  name,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name: string;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error(`Error in ${name} microfrontend:`, error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [name]);

  if (hasError) {
    return (
      fallback || (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error en {name}</h3>
          <p className="text-red-600 text-sm">El microfrontend no pudo cargar correctamente.</p>
          <button
            onClick={() => setHasError(false)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )
    );
  }

  return <>{children}</>;
}

/**
 * Aplicación Shell principal
 */
function App() {
  // Estado global de la aplicación
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"products" | "profile">("products");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Simulación de datos iniciales
  useEffect(() => {
    // Simular carga de carrito desde localStorage
    const savedCart = localStorage.getItem("microfrontend-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    // Simular usuario logueado
    const savedUser = localStorage.getItem("microfrontend-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
  }, []);

  // Persistir carrito
  useEffect(() => {
    localStorage.setItem("microfrontend-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handlers para comunicación entre microfrontends
  const handleAddToCart = (productId: string) => {
    console.log("Adding product to cart:", productId);

    // Simular agregado al carrito
    const newItem: CartItem = {
      id: productId,
      name: `Producto ${productId}`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: 1,
    };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, newItem];
    });

    // Mostrar feedback visual
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 2000);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("microfrontend-user", JSON.stringify(userData));
    setCurrentView("products");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("microfrontend-user");
    setCurrentView("products");
  };

  const handleMenuClick = () => {
    setCurrentView(currentView === "products" ? "profile" : "products");
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Microfrontend */}
      <MicrofrontendErrorBoundary name="Header">
        <Suspense fallback={<MicrofrontendLoader name="Header" />}>
          <Header onMenuClick={handleMenuClick} user={user || undefined} />
        </Suspense>
      </MicrofrontendErrorBoundary>

      {/* Navegación principal */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentView("products")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "products" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🛍️ Productos
              </button>

              {user && (
                <button
                  onClick={() => setCurrentView("profile")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  👤 Mi Perfil
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Selector de categoría */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Todas las categorías</option>
                <option value="electronics">Electrónicos</option>
                <option value="clothing">Ropa</option>
                <option value="books">Libros</option>
              </select>

              {/* Cart Button Microfrontend */}
              <MicrofrontendErrorBoundary name="Cart Button">
                <Suspense fallback={<div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>}>
                  <div onClick={handleCartToggle} className="cursor-pointer">
                    <CartButton itemCount={getTotalItems()} onClick={handleCartToggle} />
                  </div>
                </Suspense>
              </MicrofrontendErrorBoundary>

              {/* Login/Logout */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hola, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <MicrofrontendErrorBoundary name="Login">
                  <Suspense fallback={<div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>}>
                    <Login onLogin={handleLogin} />
                  </Suspense>
                </MicrofrontendErrorBoundary>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Microfrontends con Vite Module Federation</h1>
          <p className="text-gray-600">
            Demo completo de arquitectura de microfrontends con comunicación entre aplicaciones
          </p>
        </div>

        {/* Vista de productos */}
        {currentView === "products" && (
          <MicrofrontendErrorBoundary name="Product List">
            <Suspense fallback={<MicrofrontendLoader name="Lista de Productos" />}>
              <ProductList
                onAddToCart={handleAddToCart}
                category={selectedCategory === "all" ? undefined : selectedCategory}
              />
            </Suspense>
          </MicrofrontendErrorBoundary>
        )}

        {/* Vista de perfil */}
        {currentView === "profile" && user && (
          <MicrofrontendErrorBoundary name="Profile">
            <Suspense fallback={<MicrofrontendLoader name="Perfil de Usuario" />}>
              <Profile userId={user.id} />
            </Suspense>
          </MicrofrontendErrorBoundary>
        )}

        {/* Información sobre microfrontends */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🏗️ Arquitectura de Microfrontends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900">Shell (Host)</h3>
              <p className="text-sm text-gray-600">Puerto 5000</p>
              <p className="text-xs text-gray-500">Orquesta todos los MF</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900">Header MF</h3>
              <p className="text-sm text-gray-600">Puerto 5001</p>
              <p className="text-xs text-gray-500">Navegación y usuario</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Products MF</h3>
              <p className="text-sm text-gray-600">Puerto 5002</p>
              <p className="text-xs text-gray-500">Catálogo de productos</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="font-semibold text-gray-900">Cart MF</h3>
              <p className="text-sm text-gray-600">Puerto 5003</p>
              <p className="text-xs text-gray-500">Carrito de compras</p>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Microfrontend (Modal) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
            <MicrofrontendErrorBoundary name="Cart">
              <Suspense fallback={<MicrofrontendLoader name="Carrito" />}>
                <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} />
              </Suspense>
            </MicrofrontendErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
