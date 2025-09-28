#!/bin/bash

# 🚀 Script para levantar todos los microfrontends con Lerna
# Autor: Nacho RS (@nachorsanz)

echo "🏗️  Iniciando arquitectura de Microfrontends..."
echo "=================================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Función para mostrar puerto y estado
show_service() {
    local name=$1
    local port=$2
    local color=$3
    echo -e "${color}🎯 $name${NC} ejecutándose en puerto ${YELLOW}$port${NC}"
}

echo -e "${CYAN}📦 Verificando dependencias...${NC}"
if ! command -v lerna &> /dev/null; then
    echo -e "${RED}❌ Lerna no encontrado. Instalando...${NC}"
    npm install
fi

echo -e "${CYAN}🔄 Limpiando procesos anteriores...${NC}"
pkill -f "vite.*dev" 2>/dev/null || true

echo -e "${CYAN}🚀 Iniciando todos los microfrontends...${NC}"
echo ""

# Usar Lerna para ejecutar en paralelo
npm run dev &

# Esperar un poco para que se inicializen
sleep 3

echo ""
echo "🎉 ¡Arquitectura de Microfrontends iniciada!"
echo "=================================================="
echo ""

show_service "Shell (Host)" "5000" "$BLUE"
show_service "Header MF" "5001" "$GREEN" 
show_service "Products MF" "5002" "$YELLOW"
show_service "Cart MF" "5003" "$PURPLE"
show_service "User MF" "5004" "$CYAN"

echo ""
echo -e "${GREEN}✅ Abre tu navegador en: ${YELLOW}http://localhost:5000${NC}"
echo -e "${BLUE}📚 Documentación: Ver README.md${NC}"
echo ""
echo -e "${YELLOW}⚠️  Para detener todos los servicios: Ctrl+C o npm run stop${NC}"
echo ""

# Mantener el script corriendo para ver los logs
wait
