#!/bin/bash

# 🔍 Script para diagnosticar el estado de microfrontends y estilos

echo "🔍 DIAGNÓSTICO COMPLETO DE MICROFRONTENDS"
echo "======================================="
echo ""

# Verificar servicios
echo "🌐 Estado de Servicios:"
services=("5000:Shell" "5001:Header" "5002:Products" "5003:Cart" "5004:User")
all_up=true

for service in "${services[@]}"; do
    port="${service%%:*}"
    name="${service##*:}"
    
    if curl -s http://localhost:$port > /dev/null; then
        echo "✅ $name (puerto $port) - Activo"
        
        if [ "$port" != "5000" ]; then
            # Verificar Module Federation
            if curl -s http://localhost:$port/assets/remoteEntry.js 2>/dev/null | grep -q "moduleMap\|__webpack_require__\|const currentImports"; then
                echo "   🔗 Module Federation: ✅ Funcionando"
            else
                echo "   ⚠️  Module Federation: ❌ No disponible (modo dev?)"
            fi
        fi
    else
        echo "❌ $name (puerto $port) - No disponible"
        all_up=false
    fi
done

echo ""

# Verificar estilos del Shell
echo "🎨 Verificación de Estilos (Shell):"
if curl -s http://localhost:5000 > /dev/null; then
    css_response=$(curl -s "http://localhost:5000/src/index.css")
    
    if echo "$css_response" | grep -q "tailwindcss"; then
        echo "✅ TailwindCSS: Detectado y compilado"
    else
        echo "❌ TailwindCSS: No detectado"
    fi
    
    if echo "$css_response" | grep -q "bg-gray-50\|min-h-screen"; then
        echo "✅ Clases de Tailwind: Disponibles"
    else
        echo "❌ Clases de Tailwind: No encontradas"
    fi
    
    # Verificar estilos conflictivos
    if echo "$css_response" | grep -q "display: flex.*place-items: center"; then
        echo "⚠️  Estilos conflictivos: Detectados estilos de Vite por defecto"
    else
        echo "✅ Estilos conflictivos: Limpios"
    fi
    
    # Verificar background correcto
    if echo "$css_response" | grep -q "#f8fafc"; then
        echo "✅ Background: Configurado correctamente (#f8fafc)"
    else
        echo "❌ Background: No configurado correctamente"
    fi
else
    echo "❌ Shell no disponible - no se puede verificar CSS"
fi

echo ""

# Verificar conexiones entre microfrontends
echo "🔗 Verificación de Conexiones:"
if curl -s http://localhost:5000 > /dev/null; then
    shell_html=$(curl -s http://localhost:5000)
    
    # Buscar errores de carga de MFs en el HTML/JS
    if echo "$shell_html" | grep -q "Header MF no disponible\|Product MF no disponible"; then
        echo "⚠️  Detectados fallbacks de microfrontends en el HTML"
        echo "   Esto indica que los MFs remotos no se están cargando"
    else
        echo "✅ No se detectaron mensajes de error de MFs"
    fi
fi

echo ""

# Recomendaciones
echo "💡 Recomendaciones:"
if [ "$all_up" = true ]; then
    echo "✅ Todos los servicios están activos"
    echo "🌐 Abre http://localhost:5000 en tu navegador"
    echo ""
    echo "Si los estilos se ven mal:"
    echo "  - Ctrl+F5 para refrescar caché"
    echo "  - Inspeccionar elemento para ver CSS aplicado"
    echo "  - tail -f logs/shell-dev.log para errores"
    echo ""
    echo "Si los microfrontends no cargan:"
    echo "  - Solo Header MF debería funcionar completamente (puerto 5001)"
    echo "  - Los demás están en modo dev y pueden mostrar fallbacks"
    echo "  - Para full demo, ejecuta: ./build-all-and-serve.sh"
else
    echo "❌ Algunos servicios no están activos"
    echo "🔄 Ejecuta: ./stop-all.sh && ./fix-and-start.sh"
fi

echo ""
echo "📊 Para monitoreo continuo:"
echo "  tail -f logs/shell-dev.log       # Logs del Shell"
echo "  tail -f logs/*-preview.log       # Logs de MFs en preview"
echo "  ./check-status.sh                # Repetir diagnóstico"
