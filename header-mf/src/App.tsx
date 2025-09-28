import { useState } from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [menuClicks, setMenuClicks] = useState(0);

  // Usuario demo
  const demoUser = {
    id: "1",
    name: "Ana García",
    email: "ana@microstore.com",
    avatar: "👩‍💼",
  };

  const handleMenuClick = () => {
    setMenuClicks((prev) => prev + 1);
    console.log("Menu clicked in standalone mode");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header onMenuClick={handleMenuClick} user={demoUser} />

      {/* Demo content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">🎯 Header Microfrontend</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Modo Standalone - Desarrollo</h2>

            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Estado del Componente:</span>
                <span className="text-blue-700">✅ Funcionando</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-green-900">Menu Clicks:</span>
                <span className="text-green-700 font-bold">{menuClicks}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <span className="font-medium text-yellow-900">Puerto:</span>
                <span className="text-yellow-700 font-mono">5001</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <span className="font-medium text-purple-900">Expuesto como:</span>
                <span className="text-purple-700 font-mono">headerMf/Header</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Funcionalidades Implementadas:</h3>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                <li>• 🧭 Navegación principal responsiva</li>
                <li>• 🔍 Barra de búsqueda integrada</li>
                <li>• 🔔 Sistema de notificaciones</li>
                <li>• 👤 Gestión de usuario y dropdown</li>
                <li>• ⏰ Reloj en tiempo real</li>
                <li>• 📱 Menú móvil completamente funcional</li>
                <li>• 🎨 UI/UX moderna con Tailwind CSS</li>
                <li>• 🔗 Comunicación con host via props</li>
              </ul>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>
                💡 Este header funciona tanto de manera independiente como integrado en el shell principal através de
                Module Federation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
