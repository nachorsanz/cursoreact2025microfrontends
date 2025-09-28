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

            {/* Sección de Comunicación entre Microfrontends */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🔄 Comunicación entre Microfrontends
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Patrones y estrategias para la comunicación efectiva entre MFs
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {/* Event Bus Pattern */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--blue-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--blue-500)'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--blue-700)', marginBottom: '0.5rem' }}>
                      📡 Event Bus Pattern
                    </h4>
                    <div style={{
                      background: 'var(--blue-100)',
                      color: 'var(--blue-700)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      display: 'inline-block'
                    }}>
                      Más usado en producción
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Sistema de eventos centralizado. Los MFs publican y suscriben a eventos sin conocerse directamente.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// MF Productos
eventBus.emit('product:added', product);

// MF Carrito  
eventBus.on('product:added', handleAdd);`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Bajo acoplamiento, escalable
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Debugging complejo, contratos implícitos
                    </div>
                  </div>
                </div>

                {/* Shared State */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--green-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--green-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--green-700)', marginBottom: '1rem' }}>
                    🗂️ Estado Compartido
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Store global (Redux, Zustand) compartido entre MFs. Útil para datos críticos del negocio.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// Shell expone store
window.globalStore = store;

// MFs lo consumen
const store = window.globalStore;`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Consistencia, reactividad
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Acoplamiento, dependencias
                    </div>
                  </div>
                </div>

                {/* Props/Callbacks */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--purple-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--purple-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--purple-700)', marginBottom: '1rem' }}>
                    ⬇️ Props & Callbacks
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    El shell pasa props y callbacks a los MFs. Simple pero limita la autonomía.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`<ProductList 
  onAddToCart={handleAddToCart}
  cartItems={cartItems}
/>`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Simple, explícito, testeable
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Menos autonomía, prop drilling
                    </div>
                  </div>
                </div>

                {/* URL/Query Parameters */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--yellow-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--yellow-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--yellow-700)', marginBottom: '1rem' }}>
                    🔗 URL State
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Comunicación via URL, query params o hash. Perfecto para estado navegable.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// ?category=electronics&sort=price
// #cart-items=3&total=299`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Bookmarkeable, SEO friendly
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Limitado, solo primitivos
                    </div>
                  </div>
                </div>

                {/* Local Storage */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--red-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--red-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--red-700)', marginBottom: '1rem' }}>
                    💾 Browser Storage
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    LocalStorage, SessionStorage o IndexedDB para persistir estado entre sesiones.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`localStorage.setItem('cart', JSON.stringify(items));
// Otros MFs escuchan cambios
window.addEventListener('storage', handler);`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Persistencia, simple
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Solo strings, limitado espacio
                    </div>
                  </div>
                </div>

                {/* PostMessage API */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--gray-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-700)', marginBottom: '1rem' }}>
                    📬 PostMessage API
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Comunicación segura entre iframes/workers. Ideal para MFs en iframes.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`parent.postMessage({type: 'CART_UPDATE', data}, '*');
window.addEventListener('message', handler);`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Seguro, cross-origin
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Solo para iframes, serialización
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Casos de Uso Reales */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🏢 Casos de Uso Reales
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Empresas que usan microfrontends en producción
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {/* Netflix */}
                <div style={{
                  background: 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
                  color: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      Netflix
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      🎯 Desafío:
                    </h4>
                    <p style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      Equipos globales desarrollando diferentes partes de la UI (catálogo, reproductor, perfil) con tecnologías específicas.
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      ⚙️ Solución:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• Single-SPA + React/Vue por equipo</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Deploy independiente por región</li>
                      <li style={{ marginBottom: '0.25rem' }}>• A/B testing granular</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Fallbacks por cada MF</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      📊 Resultados:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• 300+ equipos trabajando en paralelo</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Deploy diario sin downtime</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Experimentos A/B por componente</li>
                    </ul>
                  </div>
                </div>

                {/* Spotify */}
                <div style={{
                  background: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
                  color: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      Spotify
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      🎯 Desafío:
                    </h4>
                    <p style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      Diferentes productos (Web Player, Podcasts, Artistas) con equipos autónomos pero UX consistente.
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      ⚙️ Solución:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• Design System compartido</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Event bus para comunicación</li>
                      <li style={{ marginBottom: '0.25rem' }}>• State management distribuido</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Feature flags por MF</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      📊 Resultados:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• 100+ squads independientes</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Tiempo de desarrollo -40%</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Consistencia de UI mejorada</li>
                    </ul>
                  </div>
                </div>

                {/* Zalando */}
                <div style={{
                  background: 'linear-gradient(135deg, #ff6900 0%, #ff8533 100%)',
                  color: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👗</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      Zalando
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      🎯 Desafío:
                    </h4>
                    <p style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      E-commerce complejo con catálogo, checkout, logística por diferentes equipos en múltiples países.
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      ⚙️ Solución:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• Server-Side Composition (ESI)</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Client-Side hydration</li>
                      <li style={{ marginBottom: '0.25rem' }}>• CDN edge computing</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Progressive enhancement</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      📊 Resultados:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', opacity: '0.9' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• 200+ desarrolladores</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Performance +25%</li>
                      <li style={{ marginBottom: '0.25rem' }}>• SEO optimizado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Estrategias de Deployment */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🚀 Estrategias de Deployment
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Cómo desplegar y mantener microfrontends en producción
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem'
              }}>
                {/* Independent Deployments */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--blue-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--blue-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--blue-700)', marginBottom: '1rem' }}>
                    🎯 Deployments Independientes
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Cada MF se despliega de forma completamente autónoma con su propio pipeline de CI/CD.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Herramientas:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • Vercel, Netlify, AWS S3+CloudFront<br/>
                      • GitHub Actions, GitLab CI, Jenkins<br/>
                      • Docker + Kubernetes para complejos
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Autonomía total, rollback granular
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Complejidad operacional, inconsistencias
                    </div>
                  </div>
                </div>

                {/* Orchestrated Deployments */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--green-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--green-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--green-700)', marginBottom: '1rem' }}>
                    🎼 Deployments Orquestados
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Pipeline central que coordina el deployment de múltiples MFs con dependencias.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Herramientas:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • Lerna, Nx, Rush (monorepo)<br/>
                      • ArgoCD, Flux (GitOps)<br/>
                      • Spinnaker (multi-cloud)
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Consistencia, dependencias controladas
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Menos autonomía, bottleneck central
                    </div>
                  </div>
                </div>

                {/* Blue-Green per MF */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--purple-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--purple-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--purple-700)', marginBottom: '1rem' }}>
                    🔄 Blue-Green por MF
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Dos versiones de cada MF corriendo en paralelo. Switch instantáneo sin downtime.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Implementación:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • Load balancer con weighted routing<br/>
                      • Feature flags para canary releases<br/>
                      • Monitoring y rollback automático
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Zero downtime, rollback instantáneo
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Doble infraestructura, costos altos
                    </div>
                  </div>
                </div>

                {/* Canary Releases */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--yellow-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--yellow-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--yellow-700)', marginBottom: '1rem' }}>
                    🐤 Canary Releases
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Deploy gradual: 5% → 25% → 50% → 100% del tráfico a la nueva versión.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Métricas clave:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • Error rate, latencia, memoria<br/>
                      • User satisfaction, conversion<br/>
                      • Business metrics específicas
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Riesgo minimizado, feedback temprano
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Complejidad de monitoreo, lentitud
                    </div>
                  </div>
                </div>

                {/* Feature Flags */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--red-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--red-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--red-700)', marginBottom: '1rem' }}>
                    🚩 Feature Flags
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Control dinámico de features sin redeploy. Especialmente útil para MFs.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Herramientas:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • LaunchDarkly, Split.io<br/>
                      • Unleash (open source)<br/>
                      • ConfigCat, Flagsmith
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Control granular, A/B testing
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Deuda técnica, complejidad lógica
                    </div>
                  </div>
                </div>

                {/* Multi-Environment */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--gray-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-700)', marginBottom: '1rem' }}>
                    🌍 Multi-Environment
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Dev → Staging → UAT → Production con configuración específica por ambiente.
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                      Consideraciones:
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                      • URLs de MFs por ambiente<br/>
                      • Variables de configuración<br/>
                      • Smoke tests automatizados
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>✅ Pros:</strong> Validación exhaustiva, estabilidad
                    </div>
                    <div style={{ color: 'var(--red-500)' }}>
                      <strong>⚠️ Cons:</strong> Lentitud, costos de infraestructura
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Performance y Seguridad */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                ⚡ Performance & Seguridad
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Optimizaciones y consideraciones de seguridad críticas
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {/* Performance Optimizations */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--green-50) 0%, var(--blue-50) 100%)',
                  border: '2px solid var(--green-200)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gray-900)' }}>
                      Optimización de Performance
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--green-700)', marginBottom: '0.75rem' }}>
                      🚀 Técnicas Clave:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Bundle Splitting:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Separar código compartido (React, utils) de lógica específica</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Lazy Loading:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Cargar MFs solo cuando son necesarios</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Preloading Inteligente:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Predecir qué MFs el usuario necesitará</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Resource Hints:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>&lt;link rel="preload"&gt;, dns-prefetch, preconnect</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--blue-700)', marginBottom: '0.75rem' }}>
                      📊 Métricas Importantes:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• <strong>FCP:</strong> First Contentful Paint &lt; 1.8s</li>
                      <li style={{ marginBottom: '0.25rem' }}>• <strong>LCP:</strong> Largest Contentful Paint &lt; 2.5s</li>
                      <li style={{ marginBottom: '0.25rem' }}>• <strong>CLS:</strong> Cumulative Layout Shift &lt; 0.1</li>
                      <li style={{ marginBottom: '0.25rem' }}>• <strong>FID:</strong> First Input Delay &lt; 100ms</li>
                    </ul>
                  </div>
                </div>

                {/* Security Considerations */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--red-50) 0%, var(--orange-50) 100%)',
                  border: '2px solid var(--red-200)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gray-900)' }}>
                      Seguridad en Microfrontends
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--red-700)', marginBottom: '0.75rem' }}>
                      🔒 Amenazas Específicas:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Code Injection:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>MFs comprometidos pueden ejecutar código malicioso</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Data Leakage:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Estado compartido expone información sensible</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• Supply Chain:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Dependencias de terceros en cada MF</span>
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        <strong>• CORS Issues:</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Cross-origin requests mal configurados</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--orange-700)', marginBottom: '0.75rem' }}>
                      🛡️ Medidas de Protección:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                      <li style={{ marginBottom: '0.25rem' }}>• CSP headers para prevenir XSS</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Subresource Integrity (SRI)</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Sandbox iframes cuando sea posible</li>
                      <li style={{ marginBottom: '0.25rem' }}>• Auditorías regulares de dependencias</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Testing Strategies */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🧪 Estrategias de Testing
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Cómo testear aplicaciones distribuidas efectivamente
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1.5rem'
              }}>
                {/* Unit Testing */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--green-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--green-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--green-700)', marginBottom: '1rem' }}>
                    🔬 Testing Unitario
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Cada MF debe tener su suite completa de tests unitarios independientes.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// products-mf/tests/
// ├── ProductList.test.tsx  
// ├── ProductCard.test.tsx
// └── __mocks__/api.ts`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }}>
                      <strong>Tools:</strong> Jest, Vitest, React Testing Library
                    </div>
                    <div style={{ color: 'var(--gray-600)' }}>
                      <strong>Enfoque:</strong> Mockear dependencias externas
                    </div>
                  </div>
                </div>

                {/* Integration Testing */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--blue-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--blue-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--blue-700)', marginBottom: '1rem' }}>
                    🔗 Testing de Integración
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Verificar que los MFs se comunican correctamente entre sí.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// Test eventos entre MFs
eventBus.emit('product:selected', product);
expect(cartMF.items).toContain(product);`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--blue-600)', marginBottom: '0.5rem' }}>
                      <strong>Tools:</strong> Playwright, Cypress
                    </div>
                    <div style={{ color: 'var(--gray-600)' }}>
                      <strong>Enfoque:</strong> Contract testing, API mocking
                    </div>
                  </div>
                </div>

                {/* E2E Testing */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--purple-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--purple-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--purple-700)', marginBottom: '1rem' }}>
                    🎭 Testing E2E
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Flujos completos de usuario a través de múltiples MFs.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// Usuario completa compra
test('comprar producto', () => {
  // Products MF
  cy.selectProduct('iPhone');
  // Cart MF  
  cy.addToCart();
  // Checkout MF
  cy.completePurchase();
});`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--purple-600)', marginBottom: '0.5rem' }}>
                      <strong>Tools:</strong> Cypress, Playwright, TestCafe
                    </div>
                    <div style={{ color: 'var(--gray-600)' }}>
                      <strong>Enfoque:</strong> User journeys, critical paths
                    </div>
                  </div>
                </div>

                {/* Visual Testing */}
                <div style={{
                  background: 'white',
                  border: '1px solid var(--yellow-200)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow)',
                  borderLeft: '4px solid var(--yellow-500)'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--yellow-700)', marginBottom: '1rem' }}>
                    👁️ Testing Visual
                  </h4>
                  
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Detectar cambios visuales no intencionales entre deployments.
                  </p>
                  
                  <div style={{ background: 'var(--gray-50)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <code style={{ fontSize: '0.75rem', color: 'var(--gray-700)' }}>
                      {`// Chromatic, Percy
await page.screenshot({
  clip: { x: 0, y: 0, width: 1200, height: 800 }
});`}
                    </code>
                  </div>

                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ color: 'var(--yellow-600)', marginBottom: '0.5rem' }}>
                      <strong>Tools:</strong> Chromatic, Percy, BackstopJS
                    </div>
                    <div style={{ color: 'var(--gray-600)' }}>
                      <strong>Enfoque:</strong> Regression testing, cross-browser
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matriz de Decisión */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--gray-900)', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🤔 ¿Cuándo usar Microfrontends?
              </h2>
              <p style={{ 
                color: 'var(--gray-600)', 
                textAlign: 'center', 
                marginBottom: '3rem',
                fontSize: '1.1rem'
              }}>
                Matriz de decisión para evaluar si necesitas microfrontends
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {/* ✅ Úsalos cuando */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--green-50) 0%, var(--emerald-50) 100%)',
                  border: '2px solid var(--green-200)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--green-800)' }}>
                      Úsalos Cuando
                    </h3>
                  </div>

                  <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--green-600)', fontWeight: 'bold', minWidth: '20px' }}>👥</span>
                      <div>
                        <strong>Múltiples equipos (3+)</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Cada uno trabajando en dominios diferentes</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--green-600)', fontWeight: 'bold', minWidth: '20px' }}>📈</span>
                      <div>
                        <strong>App compleja (20+ rutas)</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Con funcionalidades bien diferenciadas</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--green-600)', fontWeight: 'bold', minWidth: '20px' }}>⚡</span>
                      <div>
                        <strong>Releases independientes</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Necesidad de deploy por feature</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--green-600)', fontWeight: 'bold', minWidth: '20px' }}>🔧</span>
                      <div>
                        <strong>Tecnologías diversas</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>React, Vue, Angular por necesidad</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--green-600)', fontWeight: 'bold', minWidth: '20px' }}>🏢</span>
                      <div>
                        <strong>Organización madura</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>DevOps, CI/CD, monitoring establecidos</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* ❌ Evítalos cuando */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--red-50) 0%, var(--pink-50) 100%)',
                  border: '2px solid var(--red-200)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--red-800)' }}>
                      Evítalos Cuando
                    </h3>
                  </div>

                  <ul style={{ listStyle: 'none', padding: '0', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--red-600)', fontWeight: 'bold', minWidth: '20px' }}>👤</span>
                      <div>
                        <strong>Equipo pequeño (&lt;3)</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>La complejidad supera los beneficios</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--red-600)', fontWeight: 'bold', minWidth: '20px' }}>🚀</span>
                      <div>
                        <strong>Startup/MVP</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Prioridad en velocidad de desarrollo</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--red-600)', fontWeight: 'bold', minWidth: '20px' }}>🔗</span>
                      <div>
                        <strong>Alta interdependencia</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Componentes muy acoplados</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--red-600)', fontWeight: 'bold', minWidth: '20px' }}>💰</span>
                      <div>
                        <strong>Recursos limitados</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Sin presupuesto para infraestructura</span>
                      </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--red-600)', fontWeight: 'bold', minWidth: '20px' }}>📱</span>
                      <div>
                        <strong>App simple (&lt;10 rutas)</strong><br/>
                        <span style={{ color: 'var(--gray-600)' }}>Complejidad innecesaria</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Scorecard */}
              <div style={{
                background: 'white',
                border: '1px solid var(--blue-200)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)',
                marginTop: '2rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--blue-800)',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  🎯 Scorecard de Evaluación
                </h3>
                <p style={{ 
                  color: 'var(--gray-600)', 
                  textAlign: 'center', 
                  marginBottom: '2rem',
                  fontSize: '0.875rem'
                }}>
                  Puntúa cada factor del 1-5. Si tu total es &gt; 25, considera microfrontends
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem'
                }}>
                  {[
                    { factor: 'Tamaño del equipo', desc: '1=1 persona, 5=10+ personas' },
                    { factor: 'Complejidad app', desc: '1=landing, 5=platform compleja' },
                    { factor: 'Frecuencia releases', desc: '1=mensual, 5=múltiples/día' },
                    { factor: 'Diversidad tech', desc: '1=solo React, 5=múltiples frameworks' },
                    { factor: 'Autonomía equipos', desc: '1=centralizado, 5=fully autonomous' },
                    { factor: 'Madurez DevOps', desc: '1=manual, 5=fully automated' },
                    { factor: 'Budget infra', desc: '1=limitado, 5=sin restricciones' },
                    { factor: 'Tolerancia complejidad', desc: '1=simplicidad, 5=acepto complejidad' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'var(--gray-50)',
                      border: '1px solid var(--gray-200)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: 'var(--gray-800)',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        {item.factor}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'var(--gray-600)',
                        marginBottom: '0.5rem'
                      }}>
                        {item.desc}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.25rem'
                      }}>
                        {[1,2,3,4,5].map(score => (
                          <div key={score} style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid var(--gray-300)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}>
                            {score}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
