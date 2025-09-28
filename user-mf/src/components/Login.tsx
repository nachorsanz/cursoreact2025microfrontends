import { useState } from "react";
import type { User } from "../types";

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("nacho@microfrontends.dev");
  const [password, setPassword] = useState("admin123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular login
    onLogin({
      id: 1,
      name: "Nacho RS",
      email,
      avatar: "👤",
      role: "Admin"
    });
  };

  return (
    <div className="mf-container">
      <div className="mf-header">
        <h2 className="mf-title">🔐 Iniciar Sesión</h2>
        <p className="mf-subtitle">
          Accede a tu cuenta para continuar
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleLogin} className="mf-card">
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white outline-none focus:border-purple-400"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white outline-none focus:border-purple-400"
            />
          </div>

          <button type="submit" className="mf-button w-full">
            🚀 Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
