#!/bin/bash

# 🛑 Script para detener TODOS los microfrontends (dev y preview)

echo "🛑 Deteniendo todos los microfrontends y procesos relacionados..."

# Detener procesos usando PIDs guardados
if [ -d "logs" ]; then
    for pidfile in logs/*.pid; do
        if [ -f "$pidfile" ]; then
            pid=$(cat "$pidfile")
            name=$(basename "$pidfile" .pid)
            
            if kill -0 "$pid" 2>/dev/null; then
                echo "🔄 Deteniendo $name (PID: $pid)..."
                kill "$pid" 2>/dev/null || true
            fi
            rm -f "$pidfile"
        fi
    done
fi

# Cleanup comprehensivo
echo "🧹 Limpieza comprehensiva..."

# Matar procesos específicos
pkill -f "vite.*preview" 2>/dev/null || true
pkill -f "vite.*dev" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true

# Liberar puertos específicos
for port in 5000 5001 5002 5003 5004; do
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "🔓 Liberando puerto $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    fi
done

# Esperar un momento
sleep 2

# Verificar que todo esté limpio
echo ""
echo "🔍 Verificando limpieza..."
active_ports=0
for port in 5000 5001 5002 5003 5004; do
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "⚠️  Puerto $port todavía en uso"
        active_ports=$((active_ports + 1))
    else
        echo "✅ Puerto $port libre"
    fi
done

if [ $active_ports -eq 0 ]; then
    echo ""
    echo "✅ Todos los microfrontends detenidos correctamente!"
    echo "🚀 Puedes ejecutar ./setup-for-dev.sh para reiniciar"
else
    echo ""
    echo "⚠️  Algunos puertos siguen activos. Si persisten problemas:"
    echo "   sudo lsof -ti:5000,5001,5002,5003,5004 | xargs kill -9"
fi
