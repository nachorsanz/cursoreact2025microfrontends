import { useState } from "react";
import { User } from "../types";

interface ProfileProps {
  user: User;
  onUpdateUser?: (updatedUser: User) => void;
  onLogout?: () => void;
}

export default function Profile({ user, onUpdateUser, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar || "👤",
  });
  const [activeTab, setActiveTab] = useState<"profile" | "stats" | "orders">("profile");

  const avatarOptions = ["👤", "👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻", "👨‍🎨", "👩‍🎨", "👨‍🔬", "👩‍🔬"];

  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: editData.name,
        email: editData.email,
        avatar: editData.avatar,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      avatar: user.avatar || "👤",
    });
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const mockOrders = [
    { id: "1", date: new Date("2024-01-20"), total: 299.99, status: "Entregado", items: 3 },
    { id: "2", date: new Date("2024-01-15"), total: 149.5, status: "En tránsito", items: 2 },
    { id: "3", date: new Date("2024-01-10"), total: 89.99, status: "Procesando", items: 1 },
    { id: "4", date: new Date("2024-01-05"), total: 199.99, status: "Entregado", items: 4 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                {user.avatar || "👤"}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
                <p className="text-blue-200 text-sm">
                  {user.role} • Miembro desde {user.stats ? formatDate(user.stats.joinDate) : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={onLogout}
                className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "profile", label: "👤 Perfil", count: null },
              { id: "stats", label: "📊 Estadísticas", count: user.stats?.ordersCount },
              { id: "orders", label: "📦 Pedidos", count: mockOrders.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{tab.count}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {!isEditing ? (
                <>
                  {/* Profile Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <p className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Preferencias</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tema:</span>
                            <span className="text-sm font-medium">{user.preferences?.theme || "No definido"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Idioma:</span>
                            <span className="text-sm font-medium">{user.preferences?.language || "No definido"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Notificaciones:</span>
                            <span className="text-sm font-medium">
                              {user.preferences?.notifications ? "✅ Activas" : "❌ Inactivas"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Profile Edit */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Editar Perfil</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Avatar</label>
                        <div className="grid grid-cols-4 gap-2">
                          {avatarOptions.map((avatar) => (
                            <button
                              key={avatar}
                              onClick={() => setEditData((prev) => ({ ...prev, avatar }))}
                              className={`p-3 text-2xl border rounded-lg hover:bg-gray-50 transition-colors ${
                                editData.avatar === avatar ? "border-blue-500 bg-blue-50" : "border-gray-200"
                              }`}
                            >
                              {avatar}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "stats" && user.stats && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">{user.stats.ordersCount}</div>
                  <div className="text-sm text-blue-800 mt-1">Pedidos Realizados</div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">${user.stats.totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-green-800 mt-1">Total Gastado</div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {Math.ceil((Date.now() - user.stats.joinDate.getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-purple-800 mt-1">Días como miembro</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Información Adicional</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha de registro:</span>
                    <span className="font-medium">{formatDate(user.stats.joinDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último acceso:</span>
                    <span className="font-medium">{formatDate(user.stats.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Promedio por pedido:</span>
                    <span className="font-medium">
                      $
                      {user.stats.ordersCount > 0
                        ? (user.stats.totalSpent / user.stats.ordersCount).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Historial de Pedidos</h3>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                        <p className="text-sm text-gray-600">{order.items} artículos</p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${order.total}</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Entregado"
                              ? "bg-green-100 text-green-800"
                              : order.status === "En tránsito"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Microfrontend indicator */}
        <div className="bg-pink-100 border-t border-pink-200 p-3">
          <div className="text-center text-xs text-pink-800">
            🎯 User Profile Microfrontend - Puerto 5004 | Usuario: {user.name}
          </div>
        </div>
      </div>
    </div>
  );
}
