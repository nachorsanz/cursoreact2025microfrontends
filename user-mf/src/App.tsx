import { useState } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserSettings from "./components/UserSettings";
import { User, UserPreferences } from "./types";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<"login" | "profile" | "settings">("login");

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView("profile");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("login");
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const handleUpdatePreferences = (preferences: UserPreferences) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        preferences,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Development Header */}
      {currentUser && (
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h1 className="text-xl font-bold text-gray-900">👤 User Microfrontend</h1>

                <nav className="flex space-x-4">
                  <button
                    onClick={() => setCurrentView("profile")}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === "profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    👤 Perfil
                  </button>

                  <button
                    onClick={() => setCurrentView("settings")}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === "settings" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    ⚙️ Configuración
                  </button>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{currentUser.avatar}</span>
                  <span className="text-sm text-gray-600">{currentUser.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={currentUser ? "py-6" : ""}>
        {currentView === "login" && <Login onLogin={handleLogin} />}

        {currentView === "profile" && currentUser && (
          <Profile user={currentUser} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
        )}

        {currentView === "settings" && currentUser && (
          <UserSettings user={currentUser} onUpdatePreferences={handleUpdatePreferences} />
        )}
      </div>

      {/* Development Info Panel */}
      {currentUser && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">🎯 Microfrontend Status</h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span className="text-blue-900">Puerto:</span>
              <span className="text-blue-700 font-mono">5004</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="text-green-900">Estado:</span>
              <span className="text-green-700">✅ Activo</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
              <span className="text-purple-900">Usuario:</span>
              <span className="text-purple-700">{currentUser.role}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
              <span className="text-orange-900">Vista:</span>
              <span className="text-orange-700 capitalize">{currentView}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              💡 <strong>Expone:</strong> Login, Profile, UserSettings
            </p>
            <p className="text-xs text-gray-600 mt-1">
              🔗 <strong>Comunicación:</strong> Props + Callbacks
            </p>
          </div>
        </div>
      )}

      {/* Welcome message for standalone mode */}
      {!currentUser && (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🚀 Modo Standalone</h4>
          <p className="text-xs text-gray-600 mb-3">
            Esta es la vista independiente del microfrontend de usuarios. Funciona completamente por sí solo para
            desarrollo y testing.
          </p>
          <div className="space-y-1 text-xs">
            <p>• 🔐 Sistema de autenticación completo</p>
            <p>• 👤 Gestión de perfil de usuario</p>
            <p>• ⚙️ Panel de configuraciones</p>
            <p>• 📊 Estadísticas y historial</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
