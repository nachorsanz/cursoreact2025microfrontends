/**
 * 🛒 CART COMPONENT - CARRITO MODERNO Y FUNCIONAL
 */

import { useState, useEffect } from "react";
import type { CartItem, CartSummary } from "../types";

interface CartProps {
  items?: CartItem[];
  onUpdateCart?: (items: CartItem[]) => void;
}

export default function Cart({ items: propItems, onUpdateCart }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    propItems || [
      {
        id: 1,
        productId: 1,
        name: "MacBook Pro M3 Max",
        price: 2999.99,
        quantity: 1,
        image: "💻",
      },
      {
        id: 2,
        productId: 2,
        name: "iPhone 15 Pro Max",
        price: 1199.99,
        quantity: 2,
        image: "📱",
      },
      {
        id: 3,
        productId: 3,
        name: "AirPods Pro (2ª gen)",
        price: 249.99,
        quantity: 1,
        image: "🎧",
      },
    ],
  );

  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    itemCount: 0,
  });

  // Calcular resumen cuando cambien los items
  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    setSummary({
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      itemCount,
    });
  }, [cartItems]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      const newItems = cartItems.filter((item) => item.id !== id);
      setCartItems(newItems);
      onUpdateCart?.(newItems);
    } else {
      const newItems = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
      setCartItems(newItems);
      onUpdateCart?.(newItems);
    }
  };

  const removeItem = (id: number) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    onUpdateCart?.(newItems);
  };

  const handleCheckout = () => {
    alert("🚀 ¡Demo completado! En una app real, esto procesaría el pago con el microfrontend de checkout.");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.5' }}>🛒</div>
          <h2 className="cart-title">Carrito vacío</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            No tienes productos en tu carrito todavía
          </p>
          <button className="btn" style={{ 
            background: 'var(--blue-600)', 
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1rem'
          }}>
            🛍️ Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header del carrito */}
      <div className="cart-header">
        <h1 className="cart-title">🛒 Mi Carrito</h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>
          {summary.itemCount} producto{summary.itemCount !== 1 ? "s" : ""} en tu carrito
        </p>
        <div style={{
          background: 'var(--blue-50)',
          color: 'var(--blue-700)',
          display: 'inline-block',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginTop: '0.5rem',
          border: '1px solid var(--blue-200)'
        }}>
          🛒 Cart Microfrontend • Puerto 5003
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Lista de productos */}
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Imagen del producto */}
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: 'var(--gray-100)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  flexShrink: 0
                }}>
                  {item.image}
                </div>

                {/* Información del producto */}
                <div style={{ flex: '1', minWidth: '0' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: 'var(--gray-900)',
                    marginBottom: '0.25rem'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                    ${item.price.toFixed(2)} cada uno
                  </p>
                  <p style={{ color: 'var(--green-600)', fontSize: '0.8rem', fontWeight: '500' }}>
                    ✅ En stock • Envío gratis
                  </p>
                </div>

                {/* Controles de cantidad */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  background: 'var(--gray-50)',
                  padding: '0.5rem',
                  borderRadius: '0.5rem'
                }}>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ color: item.quantity <= 1 ? 'var(--gray-400)' : 'var(--red-500)' }}
                  >
                    −
                  </button>
                  <span style={{ 
                    fontWeight: '600', 
                    color: 'var(--gray-900)',
                    minWidth: '2rem',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ color: 'var(--green-600)' }}
                  >
                    +
                  </button>
                </div>

                {/* Precio y eliminar */}
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    color: 'var(--blue-600)',
                    marginBottom: '0.5rem'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--red-500)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div style={{
          background: 'var(--gray-50)',
          border: '1px solid var(--gray-200)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          position: 'sticky',
          top: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: 'var(--gray-900)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            📋 Resumen del pedido
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--gray-600)' }}>Subtotal</span>
              <span style={{ fontWeight: '500' }}>${summary.subtotal.toFixed(2)}</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--gray-600)' }}>Impuestos (10%)</span>
              <span style={{ fontWeight: '500' }}>${summary.tax.toFixed(2)}</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--gray-600)' }}>Envío</span>
              <span style={{ 
                fontWeight: '500',
                color: summary.shipping === 0 ? 'var(--green-600)' : 'var(--gray-900)'
              }}>
                {summary.shipping === 0 ? "¡Gratis!" : `$${summary.shipping.toFixed(2)}`}
              </span>
            </div>

            {summary.shipping === 0 && (
              <div style={{
                background: 'var(--green-50)',
                border: '1px solid var(--green-200)',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--green-700)',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  🎉 ¡Envío gratis por compras mayores a $100!
                </div>
              </div>
            )}

            <div style={{
              borderTop: '1px solid var(--gray-300)',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Total</span>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: 'var(--blue-600)'
              }}>
                ${summary.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              onClick={handleCheckout} 
              className="btn btn-success"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
            >
              🚀 Proceder al Checkout
            </button>

            <button 
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              ← Continuar comprando
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ 
            marginTop: '1rem', 
            paddingTop: '1rem',
            borderTop: '1px solid var(--gray-200)',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--gray-500)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span>🔒 Pago seguro</span>
              <span>📦 Envío rápido</span>
            </div>
            <p>Compra 100% protegida con garantía de devolución</p>
          </div>
        </div>
      </div>
    </div>
  );
}