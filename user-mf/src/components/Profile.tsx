/**
 * 👤 PROFILE COMPONENT - PERFIL DE USUARIO MODERNO
 */

import { useState } from "react";
import type { User } from "../types";

interface ProfileProps {
  user?: User;
  onLogout?: () => void;
}

export default function Profile({ user: propUser, onLogout }: ProfileProps) {
  const [user] = useState<User>(
    propUser || {
      id: 1,
      name: "Nacho RS",
      email: "nacho@microstore.com",
      avatar: "👤",
      role: "Premium User",
      preferences: {
        theme: "light",
        language: "es",
        notifications: true,
        emailUpdates: true,
        pushNotifications: true,
        marketingEmails: false,
      },
    },
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const [preferences, setPreferences] = useState(
    user.preferences || {
      theme: "light",
      language: "es",
      notifications: true,
      emailUpdates: true,
      pushNotifications: true,
      marketingEmails: false,
    },
  );

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Perfil actualizado correctamente");
  };

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      onLogout?.();
      alert("👋 Sesión cerrada exitosamente");
    }
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const savePreferences = () => {
    alert("✅ Preferencias guardadas correctamente");
  };

  return (
    <div className="user-container">
      {/* Header del perfil */}
      <div className="user-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="user-avatar">
            {user.avatar}
          </div>
          
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {user.name}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '1rem' }}>
              {user.email}
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              display: 'inline-block',
              fontWeight: '500'
            }}>
              ⭐ {user.role}
            </div>
          </div>
          
          <div>
            <div style={{
              background: 'var(--purple-100)',
              color: 'var(--purple-700)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid var(--purple-200)'
            }}>
              👤 User Microfrontend • Puerto 5004
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Información personal */}
        <div className="settings-card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)' }}>
              📝 Información Personal
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'none',
                border: '1px solid var(--purple-300)',
                color: 'var(--purple-600)',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {isEditing ? "❌ Cancelar" : "✏️ Editar"}
            </button>
          </div>

          {isEditing ? (
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--gray-700)',
                    marginBottom: '0.5rem'
                  }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--gray-700)',
                    marginBottom: '0.5rem'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={handleSave} className="btn btn-primary">
                  ✅ Guardar cambios
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: 'var(--gray-100)',
                    color: 'var(--gray-700)',
                    border: '1px solid var(--gray-300)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem'
            }}>
              <div style={{
                background: 'var(--gray-50)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--gray-200)'
              }}>
                <label style={{ 
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'var(--gray-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Nombre completo
                </label>
                <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--gray-900)' }}>
                  {user.name}
                </p>
              </div>
              <div style={{
                background: 'var(--gray-50)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--gray-200)'
              }}>
                <label style={{ 
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'var(--gray-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Email
                </label>
                <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--gray-900)' }}>
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preferencias */}
        <div className="settings-card">
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: 'var(--gray-900)',
            marginBottom: '1.5rem'
          }}>
            ⚙️ Preferencias de cuenta
          </h3>

          {/* Configuración general */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '500',
              color: 'var(--gray-900)',
              marginBottom: '1rem'
            }}>
              🌐 Configuración general
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--gray-700)',
                  marginBottom: '0.5rem'
                }}>
                  Idioma
                </label>
                <select
                  className="select"
                  value={preferences.language}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, language: e.target.value }))}
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--gray-700)',
                  marginBottom: '0.5rem'
                }}>
                  Tema
                </label>
                <select
                  className="select"
                  value={preferences.theme}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, theme: e.target.value }))}
                >
                  <option value="light">☀️ Claro</option>
                  <option value="dark">🌙 Oscuro</option>
                  <option value="auto">🔄 Automático</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '500',
              color: 'var(--gray-900)',
              marginBottom: '1rem'
            }}>
              🔔 Notificaciones
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  key: "notifications",
                  title: "Notificaciones generales",
                  description: "Recibe notificaciones sobre actividad de tu cuenta",
                  icon: "🔔",
                },
                {
                  key: "pushNotifications",
                  title: "Notificaciones push",
                  description: "Notificaciones instantáneas sobre pedidos y ofertas",
                  icon: "📱",
                },
                {
                  key: "emailUpdates",
                  title: "Actualizaciones por email",
                  description: "Recibe emails sobre el estado de tus pedidos",
                  icon: "📧",
                },
                {
                  key: "marketingEmails",
                  title: "Emails promocionales",
                  description: "Ofertas especiales y descuentos exclusivos",
                  icon: "🎉",
                },
              ].map((pref) => (
                <div
                  key={pref.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: 'var(--gray-50)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--gray-200)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '1.25rem' }}>{pref.icon}</div>
                    <div>
                      <h5 style={{ fontWeight: '500', color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
                        {pref.title}
                      </h5>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        {pref.description}
                      </p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences[pref.key as keyof typeof preferences] as boolean}
                      onChange={(e) => handlePreferenceChange(pref.key, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button onClick={savePreferences} className="btn btn-primary">
            💾 Guardar preferencias
          </button>
        </div>

        {/* Estadísticas y acciones */}
        <div className="settings-card">
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: 'var(--gray-900)',
            marginBottom: '1.5rem'
          }}>
            📊 Resumen de cuenta
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: "Pedidos", value: "12", icon: "📦", color: "var(--blue-600)" },
              { label: "Favoritos", value: "8", icon: "❤️", color: "var(--red-500)" },
              { label: "Puntos", value: "1,250", icon: "⭐", color: "var(--yellow-500)" },
              { label: "Ahorrado", value: "$340", icon: "💰", color: "var(--green-500)" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'var(--gray-50)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--gray-200)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: stat.color, marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Botón de cerrar sesión */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleLogout}
              style={{
                background: 'var(--red-50)',
                color: 'var(--red-600)',
                border: '1px solid var(--red-200)',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}