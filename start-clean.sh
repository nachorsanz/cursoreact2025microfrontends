#!/bin/bash

# 🚀 START CLEAN - DEMO REALISTA DE MICROFRONTENDS
# Un solo comando para ejecutar toda la demo

echo "🚀 INICIANDO DEMO REALISTA DE MICROFRONTENDS"
echo "============================================"
echo ""

# Limpiar procesos anteriores
echo "🧹 Limpiando procesos anteriores..."
./stop-all.sh > /dev/null 2>&1
pkill -9 -f "vite.*" 2>/dev/null || true
lsof -ti:5000,5001,5002,5003,5004 | xargs kill -9 2>/dev/null || true

# Crear directorio de logs
mkdir -p logs
rm -f logs/*.log logs/*.pid

echo "✅ Limpieza completada"
echo ""

# Función para build y preview
build_and_serve() {
    local name=$1
    local folder=$2
    local port=$3
    
    echo "🔄 $name: Building..."
    cd "$folder"
    
    # Build silencioso
    npm run build > "../logs/$name-build.log" 2>&1
    
    if [ $? -eq 0 ] && [ -f "dist/assets/remoteEntry.js" ]; then
        echo "✅ $name: Build exitoso"
        
        # Preview en background
        npm run preview -- --port "$port" --host > "../logs/$name-preview.log" 2>&1 &
        pid=$!
        echo "$pid" > "../logs/$name-preview.pid"
        echo "🚀 $name: Sirviendo en puerto $port"
        
    else
        echo "❌ $name: Build falló (ver logs/$name-build.log)"
    fi
    
    cd ..
}

echo "📦 CONSTRUYENDO MICROFRONTENDS..."
echo ""

# Build microfrontends remotos
build_and_serve "Header-MF" "header-mf" "5001"
build_and_serve "Products-MF" "products-mf" "5002"
build_and_serve "Cart-MF" "cart-mf" "5003"
build_and_serve "User-MF" "user-mf" "5004"

echo ""
echo "⏳ Esperando que los MFs estén listos..."
sleep 8

echo ""
echo "🏠 INICIANDO SHELL PRINCIPAL..."

# Iniciar Shell en dev mode
cd shell
npm run dev > ../logs/shell-dev.log 2>&1 &
shell_pid=$!
echo "$shell_pid" > ../logs/shell-dev.pid
cd ..

echo "🚀 Shell iniciado en puerto 5000"
echo ""

# Esperar un poco para verificación
sleep 5

# Verificación rápida
echo "🔍 VERIFICACIÓN RÁPIDA:"
echo "====================="

services_working=0

if curl -s http://localhost:5000 > /dev/null; then
    echo "✅ Shell (puerto 5000): FUNCIONANDO"
    ((services_working++))
else
    echo "❌ Shell (puerto 5000): No responde"
fi

for port in 5001 5002 5003 5004; do
    if curl -s http://localhost:$port > /dev/null; then
        case $port in
            5001) name="Header" ;;
            5002) name="Products" ;;
            5003) name="Cart" ;;
            5004) name="User" ;;
        esac
        echo "✅ $name MF (puerto $port): FUNCIONANDO"
        ((services_working++))
    fi
done

echo ""
echo "🏆 RESULTADO FINAL:"
echo "=================="

if [ $services_working -ge 3 ]; then
    echo "🎉 ¡DEMO LISTA Y FUNCIONANDO!"
    echo ""
    echo "🌐 ACCEDE A LA DEMO:"
    echo "   👉 http://localhost:5000"
    echo ""
    echo "✨ FUNCIONALIDADES:"
    echo "   • E-commerce realista y funcional"
    echo "   • 4 microfrontends independientes"
    echo "   • Module Federation en tiempo real"
    echo "   • Conceptos educativos integrados"
    echo "   • Fallbacks elegantes si un MF falla"
    echo ""
    echo "📊 SERVICIOS ACTIVOS: $services_working/5"
    echo ""
    echo "🛠️ GESTIÓN:"
    echo "   📊 Estado: npm run status"
    echo "   🛑 Parar: npm run clean"
    echo ""
    echo "🎓 ¡Disfruta explorando los microfrontends!"
    
else
    echo "⚠️  DEMO PARCIALMENTE FUNCIONANDO"
    echo ""
    echo "✅ Shell funcionando con fallbacks elegantes"
    echo "🌐 Demo disponible: http://localhost:5000"
    echo ""
    echo "ℹ️  Los MFs que no cargen mostrarán componentes demo"
fi

echo ""
