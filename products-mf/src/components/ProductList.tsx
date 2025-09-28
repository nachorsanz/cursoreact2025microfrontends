/**
 * 🛍️ PRODUCT LIST COMPONENT - CATÁLOGO MODERNO
 */

import { useState } from "react";
import type { Product } from "../types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro M3 Max",
    description: "Laptop profesional con chip M3 Max, 32GB RAM y 1TB SSD. Perfecta para desarrollo y creatividad.",
    price: 2999,
    originalPrice: 3299,
    image: "💻",
    category: "Electrónicos",
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    tags: ["Pro", "M3 Max", "32GB RAM"],
    isOnSale: true,
    discount: 9,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    description: "El iPhone más avanzado con cámara profesional, chip A17 Pro y titanio premium.",
    price: 1199,
    originalPrice: 1299,
    image: "📱",
    category: "Electrónicos",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    tags: ["Pro Max", "Titanio", "A17 Pro"],
    isOnSale: true,
    discount: 8,
  },
  {
    id: "3",
    name: "AirPods Pro (2ª gen)",
    description: "Auriculares inalámbricos con cancelación activa de ruido y audio espacial.",
    price: 249,
    image: "🎧",
    category: "Electrónicos",
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    tags: ["Pro", "ANC", "Spatial Audio"],
  },
  {
    id: "4",
    name: "Apple Watch Ultra",
    description: "Reloj deportivo resistente con GPS de doble frecuencia y batería de larga duración.",
    price: 799,
    image: "⌚",
    category: "Electrónicos",
    rating: 4.6,
    reviewCount: 156,
    inStock: false,
    tags: ["Ultra", "GPS", "Deportivo"],
  },
  {
    id: "5",
    name: "iPad Pro 12.9",
    description: "Tablet profesional con chip M2, pantalla Liquid Retina XDR y Apple Pencil compatible.",
    price: 1099,
    image: "📱",
    category: "Electrónicos",
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    tags: ["Pro", "M2", "12.9\""],
  },
  {
    id: "6",
    name: "Magic Keyboard",
    description: "Teclado inalámbrico con Touch ID, retroiluminación y conectividad USB-C.",
    price: 199,
    image: "⌨️",
    category: "Accesorios",
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    tags: ["Touch ID", "Wireless", "Backlit"],
  },
];

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Electrónicos", "Accesorios"];

  // Filtrar productos
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    alert(`🛒 "${product.name}" agregado al carrito (funcionalidad demo)`);
  };

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <h1 className="products-title">🛍️ Catálogo de Productos</h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Descubre nuestra selección de productos premium
        </p>
        <div style={{
          background: 'var(--green-50)',
          color: 'var(--green-700)',
          display: 'inline-block',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          border: '1px solid var(--green-200)'
        }}>
          📦 Products Microfrontend • Puerto 5002
        </div>
      </div>

      {/* Filtros */}
      <div style={{ 
        background: 'white',
        border: '1px solid var(--gray-200)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Búsqueda */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--gray-700)',
              marginBottom: '0.5rem'
            }}>
              🔍 Buscar productos
            </label>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-300)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Categorías */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--gray-700)',
              marginBottom: '0.5rem'
            }}>
              📂 Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-300)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                background: 'white'
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Estadísticas */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--blue-600)' }}>
              {filteredProducts.length}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              Productos encontrados
            </div>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className={`product-card ${!product.inStock ? 'product-out-of-stock' : ''}`}
            >
              {/* Imagen y badges */}
              <div className="product-image">
                <div style={{ fontSize: '4rem', transform: 'scale(1)', transition: 'transform 0.3s ease' }}>
                  {product.image}
                </div>
                
                {product.isOnSale && product.discount && (
                  <div className="product-badge badge-sale">
                    -{product.discount}%
                  </div>
                )}
                
                {!product.inStock && (
                  <div className="product-badge badge-out-of-stock">
                    Agotado
                  </div>
                )}
              </div>

              {/* Información del producto */}
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                
                <p className="product-description">{product.description}</p>

                {/* Rating */}
                <div className="product-rating">
                  <div className="rating-stars">
                    {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="rating-count">
                    ({product.rating}) • {product.reviewCount} reviews
                  </span>
                </div>

                {/* Tags */}
                {product.tags && (
                  <div className="product-tags">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Precio */}
                <div style={{ marginBottom: '1rem' }}>
                  <span className="product-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="product-original-price">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Estado de stock */}
                <div style={{ 
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                  color: product.inStock ? 'var(--green-600)' : 'var(--red-500)',
                  fontWeight: '500'
                }}>
                  {product.inStock ? "✅ En stock" : "❌ Sin stock"}
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="btn btn-primary"
                >
                  {product.inStock ? "🛒 Agregar al carrito" : "😔 No disponible"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '0.75rem',
          border: '1px solid var(--gray-200)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.5' }}>🔍</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
            No se encontraron productos
          </h3>
          <p style={{ color: 'var(--gray-600)' }}>
            Intenta ajustar los filtros de búsqueda o selecciona una categoría diferente.
          </p>
        </div>
      )}
    </div>
  );
}