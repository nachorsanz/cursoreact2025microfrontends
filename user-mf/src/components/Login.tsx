import { useState } from "react";
import { User } from "../types";

interface LoginProps {
  onLogin?: (user: User) => void;
  onSignUp?: () => void;
}

export default function Login({ onLogin, onSignUp }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Usuarios demo
  const demoUsers: User[] = [
    {
      id: "1",
      name: "Ana García",
      email: "ana@microstore.com",
      avatar: "👩‍💼",
      role: "Admin",
      preferences: {
        theme: "light",
        language: "es",
        notifications: true,
        emailUpdates: false,
      },
      stats: {
        ordersCount: 15,
        totalSpent: 2450.5,
        joinDate: new Date("2023-01-15"),
        lastLogin: new Date(),
      },
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos@microstore.com",
      avatar: "👨‍💻",
      role: "Customer",
      preferences: {
        theme: "dark",
        language: "es",
        notifications: false,
        emailUpdates: true,
      },
      stats: {
        ordersCount: 8,
        totalSpent: 1200.25,
        joinDate: new Date("2023-03-20"),
        lastLogin: new Date(Date.now() - 86400000),
      },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simular delay de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin) {
        // Login logic
        const user = demoUsers.find((u) => u.email === formData.email);
        if (user && formData.password === "demo") {
          onLogin?.(user);
        } else {
          throw new Error('Credenciales incorrectas. Usa "demo" como contraseña.');
        }
      } else {
        // Sign up logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }

        const newUser: User = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          avatar: "👤",
          role: "Customer",
          preferences: {
            theme: "light",
            language: "es",
            notifications: true,
            emailUpdates: true,
          },
          stats: {
            ordersCount: 0,
            totalSpent: 0,
            joinDate: new Date(),
            lastLogin: new Date(),
          },
        };

        onLogin?.(newUser);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDemoLogin = (user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin?.(user);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <p className="text-gray-600 mt-2">{isLogin ? "Accede a tu cuenta" : "Únete a MicroStore"}</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                name="name"
                required={!isLogin}
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                required={!isLogin}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isLogin ? "Iniciando..." : "Creando..."}</span>
              </div>
            ) : isLogin ? (
              "Iniciar Sesión"
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </form>

        {/* Demo Users */}
        {isLogin && (
          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-gray-600 mb-3 text-center">🧪 Usuarios de demostración:</p>
            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleDemoLogin(user)}
                  disabled={isLoading}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-gray-600 text-xs">{user.email}</p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Microfrontend indicator */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">🎯 User Microfrontend - Puerto 5004</div>
        </div>
      </div>
    </div>
  );
}
