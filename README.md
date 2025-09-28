# Microfrontends Demo - Vite Module Federation

Proyecto completo que demuestra la implementación de arquitectura de microfrontends usando Vite Module Federation y Webpack Module Federation.

## 🏗️ Arquitectura

### Aplicaciones Incluidas

1. **Shell (Host)** - Puerto 5000

   - Orquesta todos los microfrontends
   - Gestiona estado global y comunicación
   - Maneja routing y navegación principal

2. **Header MF** - Puerto 5001

   - Navegación principal y usuario
   - Menu hamburguesa
   - Indicadores de estado

3. **Products MF** - Puerto 5002

   - Catálogo de productos
   - Filtros y búsqueda
   - Detalles de producto

4. **Cart MF** - Puerto 5003

   - Carrito de compras
   - Gestión de items
   - Checkout básico

5. **User MF** - Puerto 5004
   - Perfil de usuario
   - Autenticación
   - Configuración

## 🚀 Características Implementadas

### ✅ Shell Application

- **Module Federation**: Configuración completa con Vite
- **Error Boundaries**: Manejo robusto de errores de microfrontends
- **Loading States**: Indicadores de carga para cada microfrontend
- **State Management**: Estado global compartido entre microfrontends
- **Communication**: Sistema de eventos entre aplicaciones
- **Fallbacks**: Componentes de respaldo cuando los MF fallan
- **TypeScript**: Tipos completos para Module Federation

### ✅ Características Avanzadas

- **Lazy Loading**: Carga bajo demanda de microfrontends
- **Error Recovery**: Recuperación automática de errores
- **Shared Dependencies**: React y React-DOM compartidos
- **Independent Deployment**: Cada MF puede desplegarse independientemente
- **Development Mode**: Facilidades para desarrollo local
- **Cross-MF Communication**: Comunicación bidireccional entre aplicaciones

## 📦 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### 🚀 Instalación con Lerna (Recomendado)

```bash
# Clonar el repositorio
cd microfrontends-demo

# Instalar dependencias de todos los microfrontends
npm run install:all

# 🎯 Iniciar TODOS los microfrontends de una vez
npm run dev
# o alternativamente:
./start-all.sh
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev                 # Iniciar todos los MFs en paralelo
npm run dev:shell          # Solo el Shell (puerto 5000)
npm run dev:header         # Solo Header MF (puerto 5001)
npm run dev:products       # Solo Products MF (puerto 5002)
npm run dev:cart           # Solo Cart MF (puerto 5003)
npm run dev:user           # Solo User MF (puerto 5004)

# Gestión
npm run install:all        # Instalar deps en todos los MFs
npm run build              # Build todos los MFs en paralelo
npm run clean              # Limpiar node_modules y dist
npm run status             # Ver estado de todos los MFs
npm run stop               # Detener todos los procesos

# Inicio rápido
npm start                  # Alias para npm run dev
./start-all.sh            # Script con colores y feedback
```

### ⚡ Instalación Manual (Método Anterior)

```bash
# Si prefieres el método tradicional
cd shell && npm install && cd ..
cd header-mf && npm install && cd ..
cd products-mf && npm install && cd ..
cd cart-mf && npm install && cd ..
cd user-mf && npm install && cd ..

# Luego ejecutar cada uno en terminal separada
cd shell && npm run dev      # Puerto 5000
cd header-mf && npm run dev  # Puerto 5001
# ... etc
```

## 🛠️ Gestión de Monorepo con Lerna

### ¿Por qué Lerna?

**Lerna** es una herramienta de gestión de monorepos que nos permite:

- 🚀 **Ejecutar comandos en paralelo** en todos los microfrontends
- 📦 **Gestionar dependencias** de forma unificada
- 🔄 **Scripts coordinados** entre aplicaciones
- 📊 **Visualización del estado** de todos los proyectos
- ⚡ **Builds optimizados** en paralelo

### Configuración Lerna

```json
// lerna.json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "1.0.0",
  "npmClient": "npm",
  "packages": [
    "shell",
    "header-mf",
    "products-mf",
    "cart-mf",
    "user-mf"
  ]
}
```

### Workspaces Configuration

```json
// package.json
{
  "workspaces": [
    "shell",
    "header-mf",
    "products-mf",
    "cart-mf",
    "user-mf"
  ]
}
```

## 🔧 Configuración Técnica

### Vite Module Federation

```typescript
// vite.config.ts (Shell)
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        headerMf: 'http://localhost:5001/assets/remoteEntry.js',
        productMf: 'http://localhost:5002/assets/remoteEntry.js',
        cartMf: 'http://localhost:5003/assets/remoteEntry.js',
        userMf: 'http://localhost:5004/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
});
```

### TypeScript Integration

```typescript
// Declaraciones de módulos para microfrontends
declare module 'headerMf/Header' {
  const Header: React.ComponentType<{
    onMenuClick?: () => void;
    user?: User;
  }>;
  export default Header;
}
```

## 🎯 Patrones Implementados

### 1. Host/Remote Pattern

- **Host (Shell)**: Orquesta y consume microfrontends
- **Remotes**: Exponen componentes específicos

### 2. Shared State Management

```typescript
// Comunicación entre microfrontends
const handleAddToCart = (productId: string) => {
  // Actualizar estado global
  setCartItems(prev => [...prev, newItem]);

  // Notificar a otros microfrontends
  window.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { productId, action: 'add' }
  }));
};
```

### 3. Error Boundaries

```typescript
function MicrofrontendErrorBoundary({ children, name }) {
  return (
    <ErrorBoundary fallback={<ErrorFallback name={name} />}>
      {children}
    </ErrorBoundary>
  );
}
```

### 4. Lazy Loading with Fallbacks

```typescript
const ProductList = lazy(() =>
  import('productMf/ProductList').catch(() => ({
    default: () => <ErrorFallback name="Product List" />
  }))
);
```

## 🌐 Comunicación Entre Microfrontends

### Props-based Communication

```typescript
// Pasar callbacks y estado como props
<ProductList
  onAddToCart={handleAddToCart}
  category={selectedCategory}
/>
```

### Event-based Communication

```typescript
// Microfrontend emite evento
window.dispatchEvent(new CustomEvent('product:selected', {
  detail: { productId }
}));

// Shell escucha evento
useEffect(() => {
  const handleProductSelect = (event) => {
    // Manejar selección
  };

  window.addEventListener('product:selected', handleProductSelect);
  return () => window.removeEventListener('product:selected', handleProductSelect);
}, []);
```

### Shared Storage

```typescript
// localStorage/sessionStorage para persistencia
const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('microfrontend-cart', JSON.stringify(items));
};
```

## 📁 Estructura del Proyecto

```
microfrontends-demo/
├── shell/                 # Host application (Puerto 5000)
│   ├── src/
│   │   ├── types/federation.d.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
├── header-mf/             # Header microfrontend (Puerto 5001)
├── product-mf/            # Products microfrontend (Puerto 5002)
├── cart-mf/               # Cart microfrontend (Puerto 5003)
├── user-mf/               # User microfrontend (Puerto 5004)
├── shared/                # Shared utilities y tipos
├── webpack-example/       # Ejemplo con Webpack MF
│   ├── host/
│   ├── mf1/
│   └── mf2/
└── README.md
```

## 🚀 Despliegue

### Desarrollo Local

- Cada microfrontend ejecuta en su propio puerto
- Hot reload independiente
- Debugging granular

### Producción

- Build independiente de cada microfrontend
- CDN deployment para cada aplicación
- Versionado independiente
- Rolling deployments

## 🎓 Conceptos Aprendidos

### Arquitectura

- ✅ Module Federation con Vite
- ✅ Host/Remote pattern
- ✅ Shared dependencies
- ✅ Independent deployments

### Comunicación

- ✅ Props-based communication
- ✅ Event-driven architecture
- ✅ Shared state management
- ✅ Cross-MF data flow

### Resilencia

- ✅ Error boundaries
- ✅ Fallback components
- ✅ Graceful degradation
- ✅ Recovery mechanisms

### TypeScript

- ✅ Module declarations
- ✅ Type safety across MF
- ✅ Shared type definitions
- ✅ Build-time validation

## 🔄 Siguientes Pasos

### Fase 2 - Completar Microfrontends

- [ ] Implementar header-mf
- [ ] Implementar product-mf
- [ ] Implementar cart-mf
- [ ] Implementar user-mf

### Fase 3 - Webpack Example

- [ ] Configurar webpack-example/host
- [ ] Configurar webpack-example/mf1
- [ ] Configurar webpack-example/mf2
- [ ] Comparación Vite vs Webpack

### Fase 4 - Features Avanzadas

- [ ] Routing entre microfrontends
- [ ] State management global (Zustand/Redux)
- [ ] Testing estrategias
- [ ] CI/CD pipeline
- [ ] Monitoring y observabilidad

## 📖 Recursos Adicionales

- [Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Microfrontends Best Practices](https://martinfowler.com/articles/micro-frontends.html)

---

**¡Explora la arquitectura de microfrontends más moderna!** 🚀
