# 🛠️ Guía Completa de Lerna para Microfrontends

Esta guía explica cómo usar **Lerna** para gestionar eficientemente todos los microfrontends desde un solo lugar.

## 🎯 ¿Qué es Lerna?

**Lerna** es una herramienta de gestión de monorepos que permite:

- 🚀 Ejecutar comandos en **múltiples paquetes** simultáneamente
- 📦 **Gestionar dependencias** de forma centralizada
- ⚡ **Paralelizar builds** y operaciones
- 📊 **Visualizar el estado** de todo el ecosistema

## 🚀 Comandos Principales

### Desarrollo (Más Usados)

```bash
# 🎯 COMANDO ESTRELLA: Iniciar TODO de una vez
npm run dev

# Comandos individuales
npm run dev:shell      # Solo Shell (puerto 5000)
npm run dev:header     # Solo Header (puerto 5001)
npm run dev:products   # Solo Products (puerto 5002)
npm run dev:cart       # Solo Cart (puerto 5003)
npm run dev:user       # Solo User (puerto 5004)
```

### Gestión de Dependencias

```bash
# Instalar dependencias en TODOS los microfrontends
npm run install:all

# Ver el estado de todos los packages
npm run status
```

### Build y Deployment

```bash
# Build TODOS los microfrontends en paralelo
npm run build

# Build solo el Shell
npm run build:shell

# Limpiar todo (node_modules + dist)
npm run clean
```

### Otros Útiles

```bash
# Alias para npm run dev
npm start

# Detener todos los procesos en background
npm run stop

# Ejecutar tests en todos los MFs
npm run test
```

## ⚙️ Configuración del Monorepo

### 📄 package.json (Raíz)

```json
{
  "name": "microfrontends-demo",
  "private": true,
  "workspaces": [
    "shell",
    "header-mf",
    "products-mf",
    "cart-mf",
    "user-mf"
  ],
  "scripts": {
    "dev": "lerna run dev --parallel",
    "install:all": "npm install && npm run install:workspaces",
    "build": "lerna run build --parallel"
  }
}
```

### 📄 lerna.json

```json
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

## 🔄 Flujo de Trabajo Típico

### Primer Uso (Setup Inicial)

```bash
cd microfrontends-demo

# 1. Instalar Lerna y dependencias raíz
npm install

# 2. Instalar dependencias de TODOS los microfrontends
npm run install:all

# 3. ¡Iniciar todo el ecosistema!
npm run dev
```

### Uso Diario

```bash
# Solo necesitas ejecutar:
npm run dev

# Se abrirán automáticamente:
# - Shell:    http://localhost:5000
# - Header:   http://localhost:5001
# - Products: http://localhost:5002
# - Cart:     http://localhost:5003
# - User:     http://localhost:5004
```

### Para el Curso/Demo

```bash
# Opción 1: Script con colores y feedback
./start-all.sh

# Opción 2: Comando directo
npm start

# Opción 3: Solo una aplicación específica
npm run dev:shell
```

## 📊 Monitoreo y Debugging

### Ver Estado del Ecosistema

```bash
npm run status
```

Output esperado:

```
lerna success found 5 packages
cart-mf     (PRIVATE)
header-mf   (PRIVATE)
products-mf (PRIVATE)
shell       (PRIVATE)
user-mf     (PRIVATE)
```

### Debugging de Procesos

```bash
# Ver puertos ocupados
lsof -i :5000,5001,5002,5003,5004

# Matar procesos específicos de Vite
npm run stop

# Limpiar caché si hay problemas
npm run clean && npm run install:all
```

## 🎯 Ventajas vs Método Manual

### ❌ Método Manual (Sin Lerna)

```bash
# Necesitas 5 terminales diferentes:
Terminal 1: cd shell && npm run dev
Terminal 2: cd header-mf && npm run dev
Terminal 3: cd products-mf && npm run dev
Terminal 4: cd cart-mf && npm run dev
Terminal 5: cd user-mf && npm run dev
```

### ✅ Método con Lerna

```bash
# Solo necesitas 1 comando:
npm run dev

# Todo se ejecuta automáticamente 🎉
```

## 🚨 Troubleshooting Común

### Problema: "Port already in use"

```bash
# Detener procesos previos
npm run stop
# O manual:
pkill -f "vite.*dev"

# Luego reiniciar
npm run dev
```

### Problema: "Cannot find module"

```bash
# Reinstalar dependencias
npm run clean
npm run install:all
```

### Problema: "Command not found"

```bash
# Verificar que Lerna esté instalado
npx lerna --version

# Si no está, instalar:
npm install
```

## 📚 Para Profesores/Estudiantes

### Demo para Clase

1. **Setup rápido**:

   ```bash
   npm run install:all
   npm run dev
   ```

2. **Mostrar arquitectura**:

   - Ir a http://localhost:5000
   - Mostrar que cada sección viene de un microfrontend diferente
   - Cambiar código en `products-mf/src` y mostrar hot reload

3. **Explicar beneficios**:
   - Un comando para todo el ecosistema
   - Desarrollo independiente por equipos
   - Deploy independiente de cada MF

### Ejercicios Sugeridos

1. **Modificar un microfrontend**: Cambiar el header y ver el efecto
2. **Añadir nueva funcionalidad**: Crear un nuevo componente en products-mf
3. **Comunicación entre MFs**: Añadir un evento desde products a cart
4. **Build y deploy**: Ejecutar `npm run build` y explicar bundles independientes

## 🎉 Conclusión

**Lerna transforma la gestión de microfrontends** de un proceso complejo y manual a **un flujo simple y automatizado**.

- ⚡ **Un comando** para levantar todo
- 🔄 **Ejecución paralela** automática
- 📦 **Gestión unificada** de dependencias
- 🎯 **Experiencia de desarrollo** simplificada

¡Perfecto para enseñar arquitecturas enterprise y para usar en proyectos reales! 🚀
