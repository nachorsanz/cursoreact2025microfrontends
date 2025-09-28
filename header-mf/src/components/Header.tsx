/**
 * Header Microfrontend Component
 * Componente de navegación principal expuesto como microfrontend
 */

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  onMenuClick?: () => void;
  user?: User;
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotificationClick = () => {
    setNotifications(0);
    // Aquí podrías abrir un panel de notificaciones
    console.log("Opening notifications panel...");
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación principal */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-blue-600 mr-4">🚀 MicroStore</div>
            </div>

            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <button
                onClick={onMenuClick}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                🏠 Inicio
              </button>

              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                🛍️ Productos
              </button>

              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                📊 Analytics
              </button>

              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                ⚙️ Configuración
              </button>
            </nav>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Buscar productos, usuarios, órdenes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center space-x-4">
            {/* Reloj */}
            <div className="hidden lg:flex items-center text-sm text-gray-600">
              <span className="mr-2">⏰</span>
              {currentTime.toLocaleTimeString()}
            </div>

            {/* Notificaciones */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            >
              <span className="text-lg">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notifications}
                </span>
              )}
            </button>

            {/* Usuario */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.avatar || user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:block text-gray-700 font-medium">{user.name}</span>
                  <span className="text-gray-400">{isMenuOpen ? "▲" : "▼"}</span>
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs">{user.email}</p>
                      </div>

                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        👤 Mi Perfil
                      </button>

                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        ⚙️ Configuración
                      </button>

                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        🎨 Tema
                      </button>

                      <hr className="border-gray-100" />

                      <button className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors">
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  Iniciar Sesión
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Registrarse
                </button>
              </div>
            )}

            {/* Menú móvil toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {/* Barra de búsqueda móvil */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Enlaces de navegación móvil */}
            <button
              onClick={onMenuClick}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              🏠 Inicio
            </button>

            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              🛍️ Productos
            </button>

            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              📊 Analytics
            </button>

            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              ⚙️ Configuración
            </button>

            {/* Información de usuario en móvil */}
            {user && (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Indicador de microfrontend (solo para desarrollo) */}
      <div className="bg-green-100 border-l-4 border-green-500 p-2">
        <div className="text-xs text-green-800 text-center">🎯 Header Microfrontend - Puerto 5001</div>
      </div>
    </header>
  );
}
