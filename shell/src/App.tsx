/**
 * 🛒 MICROSTORE - DEMO MODERNO DE MICROFRONTENDS
 * Interfaz limpia y educativa para demostrar arquitectura de microfrontends
 */

import { useState, useEffect, Suspense, lazy } from "react";
import "./index.css";

// 🔗 LAZY LOADING DE MICROFRONTENDS
const Header = lazy(() =>
  import("headerMf/Header").catch(() => ({
    default: () => <HeaderFallback />,
  })),
);

const ProductList = lazy(() =>
  import("productMf/ProductList").catch(() => ({
    default: () => <ProductsFallback />,
  })),
);

const Cart = lazy(() =>
  import("cartMf/Cart").catch(() => ({
    default: () => <CartFallback />,
  })),
);

const UserProfile = lazy(() =>
  import("userMf/Profile").catch(() => ({
    default: () => <UserFallback />,
  })),
);

// 🎯 LOADING COMPONENT EDUCATIVO
function MFLoader({ name, port }: { name: string; port?: number }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Cargando {name}</div>
      <div className="loading-detail">
        {port ? `Module Federation desde puerto ${port}` : "Cargando componente remoto..."}
      </div>
    </div>
  );
}

// 📋 COMPONENTE FALLBACK PARA HEADER
function HeaderFallback() {
  return (
    <div className="mf-content">
      <div className="mf-header">
        <div className="mf-title">
          <span>📋</span>
          Header Microfrontend
        </div>
        <div className="mf-badge">Demo Mode • Puerto 5001</div>
      </div>
      <div className="mf-body">
        <div className="info-box">
          <div className="info-title">
            <span>ℹ️</span>
            Modo Fallback Activo
          </div>
          <div className="info-text">
            El Header MF no está disponible. Este componente fallback mantiene la funcionalidad básica mientras el
            microfrontend remoto no responde.
          </div>
        </div>
      </div>
    </div>
  );
}

// 🛍️ COMPONENTE FALLBACK PARA PRODUCTOS
function ProductsFallback() {
  return (
    <div className="mf-content">
      <div className="mf-header">
        <div className="mf-title">
          <span>🛍️</span>
          Products Microfrontend
        </div>
        <div className="mf-badge">Demo Mode • Puerto 5002</div>
      </div>
      <div className="mf-body">
        <div className="info-box">
          <div className="info-title">
            <span>📦</span>
            Catálogo Demo
          </div>
          <div className="info-text">
            Mostrando componente fallback. En producción, este MF cargaría el catálogo completo con filtros, búsqueda y
            gestión de inventario.
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {[
            { name: "MacBook Pro", price: "$2,999", emoji: "💻" },
            { name: "iPhone 15 Pro", price: "$1,199", emoji: "📱" },
            { name: "AirPods Pro", price: "$249", emoji: "🎧" },
          ].map((product, i) => (
            <div
              key={i}
              style={{
                background: "var(--gray-50)",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--gray-200)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{product.emoji}</div>
              <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{product.name}</div>
              <div style={{ color: "var(--blue-600)", fontWeight: "700" }}>{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🛒 COMPONENTE FALLBACK PARA CARRITO
function CartFallback() {
  return (
    <div className="mf-content">
      <div className="mf-header">
        <div className="mf-title">
          <span>🛒</span>
          Cart Microfrontend
        </div>
        <div className="mf-badge">Demo Mode • Puerto 5003</div>
      </div>
      <div className="mf-body">
        <div className="info-box">
          <div className="info-title">
            <span>🛒</span>
            Carrito Demo
          </div>
          <div className="info-text">
            Simulando carrito de compras. Este MF manejaría el estado del carrito, cálculos de precios e integración con
            sistemas de pago.
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              background: "var(--gray-50)",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--gray-200)",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2rem" }}>📱</div>
              <div style={{ flex: "1" }}>
                <div style={{ fontWeight: "600" }}>iPhone 15 Pro</div>
                <div style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>Cantidad: 1</div>
              </div>
              <div style={{ fontWeight: "700", color: "var(--blue-600)" }}>$1,199</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              background: "var(--blue-50)",
              borderRadius: "0.75rem",
              border: "1px solid var(--blue-200)",
            }}
          >
            <span style={{ fontWeight: "600" }}>Total:</span>
            <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--blue-600)" }}>$1,199</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👤 COMPONENTE FALLBACK PARA USUARIO
function UserFallback() {
  return (
    <div className="mf-content">
      <div className="mf-header">
        <div className="mf-title">
          <span>👤</span>
          User Microfrontend
        </div>
        <div className="mf-badge">Demo Mode • Puerto 5004</div>
      </div>
      <div className="mf-body">
        <div className="info-box">
          <div className="info-title">
            <span>👤</span>
            Perfil Demo
          </div>
          <div className="info-text">
            Componente de gestión de usuario. Incluiría autenticación, preferencias, historial y configuración de
            cuenta.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--gray-50)",
            borderRadius: "0.75rem",
            border: "1px solid var(--gray-200)",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              background: "var(--blue-600)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Nacho RS</div>
            <div style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>nacho@microstore.com</div>
            <div
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                background: "var(--yellow-100)",
                color: "var(--yellow-500)",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              ⭐ Usuario Premium
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🚀 APLICACIÓN PRINCIPAL
export default function App() {
  const [currentSection, setCurrentSection] = useState<"home" | "products" | "cart" | "profile">("home");
  const [mfStatus, setMfStatus] = useState<
    Record<
      string,
      {
        status: "active" | "demo" | "loading";
        loadTime?: number;
        lastCheck?: Date;
      }
    >
  >({
    header: { status: "loading" },
    products: { status: "loading" },
    cart: { status: "loading" },
    user: { status: "loading" },
  });

  // 🔍 VERIFICACIÓN DE MICROFRONTENDS
  useEffect(() => {
    const checkMFStatus = async () => {
      const checks = {
        header: 5001,
        products: 5002,
        cart: 5003,
        user: 5004,
      };

      const results = await Promise.all(
        Object.entries(checks).map(async ([name, port]) => {
          const startTime = Date.now();
          try {
            const response = await fetch(`http://localhost:${port}`, {
              mode: "no-cors",
              cache: "no-cache",
            });
            const loadTime = Date.now() - startTime;
            return [
              name,
              {
                status: "active" as const,
                loadTime,
                lastCheck: new Date(),
              },
            ];
          } catch {
            return [
              name,
              {
                status: "demo" as const,
                loadTime: undefined,
                lastCheck: new Date(),
              },
            ];
          }
        }),
      );

      setMfStatus(Object.fromEntries(results));
    };

    checkMFStatus();
    const interval = setInterval(checkMFStatus, 15000); // Check cada 15s
    return () => clearInterval(interval);
  }, []);

  // 📊 PANEL DE INFORMACIÓN DE MICROFRONTENDS
  const MicrofrontendStatusPanel = () => (
    <div className="mf-status-panel">
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "var(--gray-900)",
            marginBottom: "0.5rem",
          }}
        >
          🏗️ Estado de Microfrontends
        </h3>
        <p style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
          Monitoreo en tiempo real de la arquitectura distribuida
        </p>
      </div>

      <div className="status-grid">
        {Object.entries(mfStatus).map(([name, info]) => (
          <div key={name} className="status-card">
            <div className="status-header">
              <div className="status-title">
                <span style={{ fontSize: "1.25rem" }}>
                  {name === "header" && "📋"}
                  {name === "products" && "🛍️"}
                  {name === "cart" && "🛒"}
                  {name === "user" && "👤"}
                </span>
                <span style={{ textTransform: "capitalize" }}>
                  {name === "user"
                    ? "Usuario"
                    : name === "cart"
                    ? "Carrito"
                    : name === "products"
                    ? "Productos"
                    : "Header"}{" "}
                  MF
                </span>
              </div>
              <div className={`status-indicator status-${info.status}`}></div>
            </div>

            <div style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                Estado:{" "}
                <strong style={{ color: info.status === "active" ? "var(--green-500)" : "var(--yellow-500)" }}>
                  {info.status === "active" ? "✅ Conectado" : "🔄 Fallback"}
                </strong>
              </div>

              <div className="port-badge">
                Puerto: {name === "header" ? "5001" : name === "products" ? "5002" : name === "cart" ? "5003" : "5004"}
              </div>

              {info.loadTime && <div className="status-info">Tiempo de carga: {info.loadTime}ms</div>}

              {info.lastCheck && (
                <div className="status-info">Última verificación: {info.lastCheck.toLocaleTimeString()}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-50)" }}>
      {/* 📋 HEADER */}
      <div className="header">
        <div className="header-content">
          <a href="#" className="logo">
            <span className="logo-icon">🛒</span>
            <span>MicroStore</span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                background: "var(--blue-100)",
                color: "var(--blue-700)",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              Demo Educativa
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 NAVEGACIÓN PRINCIPAL */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid var(--gray-200)",
          position: "sticky",
          top: "4rem",
          zIndex: 40,
        }}
      >
        <div className="container-app" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="nav-tabs">
              {[
                { id: "home", label: "🏠 Inicio" },
                { id: "products", label: "🛍️ Productos" },
                { id: "cart", label: "🛒 Carrito" },
                { id: "profile", label: "👤 Perfil" },
              ].map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => setCurrentSection(nav.id as any)}
                  className={`nav-tab ${currentSection === nav.id ? "active" : ""}`}
                >
                  {nav.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 CONTENIDO PRINCIPAL */}
      <div className="main-content">
        {currentSection === "home" && (
          <div>
            {/* Hero Section */}
            <div className="hero-section">
              <h1 className="hero-title">
                <span style={{ fontSize: "3.5rem", marginRight: "1rem" }}>🛒</span>
                MicroStore
              </h1>
              <p className="hero-subtitle">
                Demo moderna y educativa de arquitectura de microfrontends con React y Module Federation
              </p>
              <div className="hero-actions">
                <button onClick={() => setCurrentSection("products")} className="btn btn-primary">
                  🛍️ Ver Productos
                </button>
                <button onClick={() => setCurrentSection("cart")} className="btn btn-secondary">
                  🛒 Mi Carrito
                </button>
              </div>
            </div>

            {/* Panel de Estado de Microfrontends */}
            <MicrofrontendStatusPanel />

            {/* Información Educativa */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginTop: "2rem",
              }}
            >
              <div className="info-box">
                <div className="info-title">
                  <span>🔗</span>
                  Module Federation
                </div>
                <div className="info-text">
                  Cada microfrontend se carga dinámicamente desde su propio servidor. Si un MF falla, el sistema usa
                  componentes fallback para mantener la funcionalidad.
                </div>
              </div>

              <div className="info-box">
                <div className="info-title">
                  <span>⚡</span>
                  Carga Bajo Demanda
                </div>
                <div className="info-text">
                  Los componentes solo se cargan cuando son necesarios, optimizando el rendimiento y reduciendo el
                  tiempo de carga inicial de la aplicación.
                </div>
              </div>

              <div className="info-box">
                <div className="info-title">
                  <span>🛡️</span>
                  Error Boundaries
                </div>
                <div className="info-text">
                  Si un microfrontend falla, no afecta a los demás. El sistema mantiene la funcionalidad básica usando
                  componentes de respaldo.
                </div>
              </div>
            </div>

            {/* Sección de Comparación Arquitectural */}
            <div style={{ marginTop: "4rem" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "var(--gray-900)",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                🏗️ Comparación Arquitectural
              </h2>
              <p
                style={{
                  color: "var(--gray-600)",
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontSize: "1.1rem",
                }}
              >
                Diferentes enfoques para estructurar aplicaciones frontend
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                  marginBottom: "3rem",
                }}
              >
                {/* Monolito */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏢</div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--gray-900)" }}>
                      Aplicación Monolítica
                    </h3>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--green-700)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      ✅ Ventajas:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Desarrollo inicial más rápido</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Menos complejidad de infraestructura</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Debugging más directo</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Una sola tecnología stack</li>
                    </ul>
                  </div>

                  <div>
                    <h4
                      style={{ fontSize: "1rem", fontWeight: "600", color: "var(--red-500)", marginBottom: "0.75rem" }}
                    >
                      ⚠️ Desafíos:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Difícil de escalar equipos</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Deploy todo-o-nada</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Un bug puede tumbar todo</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Acoplamiento entre módulos</li>
                    </ul>
                  </div>
                </div>

                {/* Vertical Slice */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🍰</div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--gray-900)" }}>
                      Vertical Slice Architecture
                    </h3>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--green-700)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      ✅ Ventajas:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Features completas por slice</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Menos acoplamiento entre features</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Equipos por dominio de negocio</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Testing más enfocado</li>
                    </ul>
                  </div>

                  <div>
                    <h4
                      style={{ fontSize: "1rem", fontWeight: "600", color: "var(--red-500)", marginBottom: "0.75rem" }}
                    >
                      ⚠️ Desafíos:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Posible duplicación de código</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Coordinación entre slices</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Compartir componentes UI</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Deploy sigue siendo monolítico</li>
                    </ul>
                  </div>
                </div>

                {/* Microfrontends */}
                <div
                  style={{
                    background: "linear-gradient(135deg, var(--blue-50) 0%, var(--purple-50) 100%)",
                    border: "2px solid var(--blue-200)",
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧩</div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--gray-900)" }}>
                      Microfrontends
                      <div
                        style={{
                          display: "inline-block",
                          marginLeft: "0.5rem",
                          background: "var(--blue-100)",
                          color: "var(--blue-700)",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        Esta Demo
                      </div>
                    </h3>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--green-700)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      ✅ Ventajas:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Equipos completamente autónomos</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Deploy independiente por MF</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Tecnologías específicas por necesidad</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Escalado granular</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Fallos aislados</li>
                    </ul>
                  </div>

                  <div>
                    <h4
                      style={{ fontSize: "1rem", fontWeight: "600", color: "var(--red-500)", marginBottom: "0.75rem" }}
                    >
                      ⚠️ Desafíos:
                    </h4>
                    <ul style={{ listStyle: "none", padding: "0", fontSize: "0.875rem", color: "var(--gray-600)" }}>
                      <li style={{ marginBottom: "0.25rem" }}>• Mayor complejidad de infraestructura</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Latencia de red entre MFs</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Debugging distribuido</li>
                      <li style={{ marginBottom: "0.25rem" }}>• Duplicación de dependencias</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Implementaciones */}
            <div style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "var(--gray-900)",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                🛠️ Formas de Implementar Microfrontends
              </h2>
              <p
                style={{
                  color: "var(--gray-600)",
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontSize: "1.1rem",
                }}
              >
                Diferentes herramientas y enfoques técnicos
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {/* Webpack Module Federation */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--blue-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--blue-500)",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "var(--blue-700)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      📦 Webpack Module Federation
                    </h4>
                    <div
                      style={{
                        background: "var(--blue-100)",
                        color: "var(--blue-700)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "inline-block",
                      }}
                    >
                      Esta demo usa Vite + @originjs/vite-plugin-federation
                    </div>
                  </div>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    El pionero en Module Federation. Permite compartir módulos en runtime entre aplicaciones.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> Aplicaciones React/Vue maduras
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Configuración compleja, bundle size
                    </div>
                  </div>
                </div>

                {/* Single-SPA */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--yellow-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--yellow-500)",
                  }}
                >
                  <h4
                    style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--yellow-700)", marginBottom: "1rem" }}
                  >
                    🎯 Single-SPA
                  </h4>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    Framework agnóstico que orquesta múltiples SPAs. Perfecto para migrar gradualmente.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> Migración gradual, múltiples frameworks
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Routing complejo, estado compartido
                    </div>
                  </div>
                </div>

                {/* Iframe */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--gray-400)",
                  }}
                >
                  <h4
                    style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--gray-700)", marginBottom: "1rem" }}
                  >
                    🖼️ Iframe Based
                  </h4>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    El enfoque más simple. Cada microfrontend corre en su propio iframe aislado.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> Aislamiento total, aplicaciones legacy
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Performance, UX limitada, SEO
                    </div>
                  </div>
                </div>

                {/* Web Components */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--purple-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--purple-500)",
                  }}
                >
                  <h4
                    style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--purple-700)", marginBottom: "1rem" }}
                  >
                    🔧 Web Components
                  </h4>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    Usando estándares web nativos. Custom Elements encapsulan funcionalidad.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> Estándares web, reutilización máxima
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Browser support, tooling limitado
                    </div>
                  </div>
                </div>

                {/* Server-Side Composition */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--green-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--green-500)",
                  }}
                >
                  <h4
                    style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--green-700)", marginBottom: "1rem" }}
                  >
                    🖥️ Server-Side Composition
                  </h4>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    Composición en el servidor usando ESI, SSI o proxies como Nginx/Kong.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> SEO crítico, performance inicial
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Menos interactividad, caching complejo
                    </div>
                  </div>
                </div>

                {/* Build-Time Composition */}
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--red-200)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow)",
                    borderLeft: "4px solid var(--red-500)",
                  }}
                >
                  <h4 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--red-700)", marginBottom: "1rem" }}>
                    🔨 Build-Time Composition
                  </h4>

                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", marginBottom: "1rem" }}>
                    Combinación durante la build usando herramientas como Nx, Lerna o Git submodules.
                  </p>

                  <div style={{ fontSize: "0.875rem" }}>
                    <div style={{ color: "var(--green-600)", marginBottom: "0.5rem" }}>
                      <strong>✅ Ideal para:</strong> Simplicidad, performance óptima
                    </div>
                    <div style={{ color: "var(--red-500)" }}>
                      <strong>⚠️ Considera:</strong> Deploy acoplado, menos flexibilidad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === "products" && (
          <Suspense fallback={<MFLoader name="Catálogo de Productos" port={5002} />}>
            <ProductList />
          </Suspense>
        )}

        {currentSection === "cart" && (
          <Suspense fallback={<MFLoader name="Carrito de Compras" port={5003} />}>
            <Cart />
          </Suspense>
        )}

        {currentSection === "profile" && (
          <Suspense fallback={<MFLoader name="Perfil de Usuario" port={5004} />}>
            <UserProfile />
          </Suspense>
        )}
      </div>

      {/* 📄 FOOTER EDUCATIVO */}
      <footer
        style={{
          background: "var(--gray-900)",
          color: "white",
          padding: "2rem 0",
          marginTop: "4rem",
        }}
      >
        <div className="container-app">
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              🎓 Demo Educativa de Microfrontends
            </h3>
            <p style={{ color: "var(--gray-400)", marginBottom: "1rem" }}>
              Arquitectura moderna con React 19, TypeScript y Module Federation
            </p>
            <div style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>
              Creado por <strong>Nacho RS</strong> • GitHub: <strong>nachorsanz</strong>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
