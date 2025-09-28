/**
 * 📋 HEADER COMPONENT - NAVEGACIÓN MODERNA
 */

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface HeaderProps {
  onMenuClick?: () => void;
  user?: User;
}

export default function Header({ onMenuClick, user }: HeaderProps = {}) {
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "products", label: "Productos", icon: "🛍️" },
    { id: "categories", label: "Categorías", icon: "📂" },
    { id: "offers", label: "Ofertas", icon: "🏷️" },
  ];

  const notifications = [
    { id: 1, title: "Pedido enviado", desc: "Tu pedido #1234 está en camino", time: "hace 2h", icon: "📦" },
    { id: 2, title: "Oferta especial", desc: "50% de descuento en accesorios", time: "hace 4h", icon: "🎉" },
    { id: 3, title: "Producto favorito", desc: "MacBook Pro con nuevo stock", time: "hace 1d", icon: "❤️" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`🔍 Buscando: "${searchQuery}" (funcionalidad demo)`);
    }
  };

  const handleProfileAction = (action: string) => {
    setIsProfileOpen(false);
    alert(`🎯 Acción: ${action} (funcionalidad demo)`);
  };

  return (
    <div className="header-main">
      <div className="header-content">
        {/* Logo y navegación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="logo">
            <span style={{ fontSize: '2rem' }}>🛒</span>
            <span>MicroStore</span>
          </div>

          <div style={{
            background: 'var(--blue-50)',
            color: 'var(--blue-700)',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            border: '1px solid var(--blue-200)'
          }}>
            📋 Header MF • 5001
          </div>

          {/* Navegación principal - Desktop */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`nav-link ${activeNav === item.id ? "active" : ""}`}
              >
                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Búsqueda y acciones */}
        <div className="header-actions">
          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="search-container">
            <div className="search-icon">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>

          {/* Carrito */}
          <button className="action-btn" title="Mi carrito">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2l1.6 8m0 0h10m-10 0a1 1 0 102 0m8 0a1 1 0 102 0" />
            </svg>
            <span style={{ 
              position: 'absolute',
              top: '0.125rem',
              right: '0.125rem',
              background: 'var(--red-500)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '600',
              borderRadius: '50%',
              width: '1.25rem',
              height: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid white'
            }}>
              3
            </span>
          </button>

          {/* Notificaciones */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="action-btn"
              title="Notificaciones"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3-3V9a6 6 0 10-12 0v5l-3 3h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="notification-dot"></div>
            </button>

            {/* Dropdown de notificaciones */}
            {isNotificationsOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-900)' }}>
                    Notificaciones
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    Tienes {notifications.length} nuevas
                  </p>
                </div>
                
                <div style={{ maxHeight: '16rem', overflowY: 'auto' }}>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="dropdown-item">
                      <div style={{ fontSize: '1.25rem' }}>{notification.icon}</div>
                      <div style={{ flex: '1', minWidth: '0' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-900)' }}>
                          {notification.title}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.125rem' }}>
                          {notification.desc}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.25rem' }}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  padding: '0.75rem 1rem',
                  borderTop: '1px solid var(--gray-200)'
                }}>
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    style={{
                      color: 'var(--blue-600)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Ver todas →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Perfil de usuario */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="profile-avatar"
              title="Mi perfil"
            >
              {user?.avatar || "👤"}
            </button>

            {/* Dropdown de perfil */}
            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-900)' }}>
                    {user?.name || "Nacho RS"}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                    {user?.email || "nacho@microstore.com"}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    background: 'var(--yellow-100)',
                    color: 'var(--yellow-600)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    ⭐ Premium
                  </span>
                </div>
                
                {[
                  { icon: "👤", label: "Mi perfil", action: "profile" },
                  { icon: "📋", label: "Mis pedidos", action: "orders" },
                  { icon: "❤️", label: "Favoritos", action: "favorites" },
                  { icon: "⚙️", label: "Configuración", action: "settings" },
                ].map((item) => (
                  <button
                    key={item.action}
                    onClick={() => handleProfileAction(item.action)}
                    className="dropdown-item"
                    style={{ 
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      background: 'none'
                    }}
                  >
                    <div style={{ fontSize: '1.125rem' }}>{item.icon}</div>
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => handleProfileAction("logout")}
                    className="dropdown-item danger"
                    style={{ 
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      background: 'none'
                    }}
                  >
                    <div style={{ fontSize: '1.125rem' }}>🚪</div>
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menú móvil */}
          <button 
            onClick={() => onMenuClick?.()}
            className="action-btn"
            style={{ display: 'none' }}
            title="Menú"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay para cerrar dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div 
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: 40,
            background: 'transparent'
          }}
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </div>
  );
}