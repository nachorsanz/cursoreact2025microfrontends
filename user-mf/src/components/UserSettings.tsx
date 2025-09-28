import { useState } from "react";
import { User, UserPreferences } from "../types";

interface UserSettingsProps {
  user: User;
  onUpdatePreferences?: (preferences: UserPreferences) => void;
}

export default function UserSettings({ user, onUpdatePreferences }: UserSettingsProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    user.preferences || {
      theme: "light",
      language: "es",
      notifications: true,
      emailUpdates: false,
    },
  );

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simular delay de guardado
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdatePreferences?.(preferences);
    setHasChanges(false);
    setIsSaving(false);
  };

  const handleReset = () => {
    setPreferences(
      user.preferences || {
        theme: "light",
        language: "es",
        notifications: true,
        emailUpdates: false,
      },
    );
    setHasChanges(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">⚙️ Configuración de Usuario</h2>
          <p className="text-sm text-gray-600 mt-1">Personaliza tu experiencia en MicroStore</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Appearance Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">🎨 Apariencia</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", label: "Claro", icon: "☀️" },
                    { value: "dark", label: "Oscuro", icon: "🌙" },
                    { value: "auto", label: "Automático", icon: "🔄" },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handlePreferenceChange("theme", theme.value)}
                      className={`flex flex-col items-center p-3 border-2 rounded-lg transition-colors ${
                        preferences.theme === theme.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl mb-1">{theme.icon}</span>
                      <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">🔔 Notificaciones</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔔</span>
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones Push</p>
                    <p className="text-sm text-gray-600">
                      Recibe notificaciones sobre pedidos, ofertas y actualizaciones
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => handlePreferenceChange("notifications", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Emails de Marketing</p>
                    <p className="text-sm text-gray-600">Recibe ofertas especiales y novedades por correo</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailUpdates}
                    onChange={(e) => handlePreferenceChange("emailUpdates", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">🛡️ Privacidad</h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg">⚠️</span>
                <div className="text-sm">
                  <p className="font-medium text-yellow-900">Configuración de Privacidad</p>
                  <p className="text-yellow-800 mt-1">
                    Próximamente: Controles avanzados de privacidad, gestión de datos personales, y configuración de
                    cookies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">👤 Gestión de Cuenta</h3>

            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🔑</span>
                    <div>
                      <p className="font-medium text-gray-900">Cambiar Contraseña</p>
                      <p className="text-sm text-gray-600">Actualiza tu contraseña de acceso</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">💾</span>
                    <div>
                      <p className="font-medium text-gray-900">Exportar Datos</p>
                      <p className="text-sm text-gray-600">Descarga una copia de tus datos</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🗑️</span>
                    <div>
                      <p className="font-medium text-red-900">Eliminar Cuenta</p>
                      <p className="text-sm text-red-700">Esta acción no se puede deshacer</p>
                    </div>
                  </div>
                  <span className="text-red-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Save/Reset Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Restablecer
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </div>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>

          {hasChanges && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-blue-800 text-sm flex items-center">
                <span className="mr-2">ℹ️</span>
                Tienes cambios sin guardar
              </p>
            </div>
          )}
        </div>

        {/* Microfrontend indicator */}
        <div className="bg-indigo-100 border-t border-indigo-200 p-3">
          <div className="text-center text-xs text-indigo-800">🎯 User Settings Microfrontend - Puerto 5004</div>
        </div>
      </div>
    </div>
  );
}
