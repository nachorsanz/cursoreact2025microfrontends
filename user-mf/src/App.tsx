import { useState } from "react";
import Profile from "./components/Profile";
import Login from "./components/Login";
import type { User } from "./types";
import "./index.css";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 1,
    name: "Nacho RS",
    email: "nacho@microfrontends.dev",
    avatar: "👤",
    role: "Admin"
  });

  return (
    <div className="min-h-screen">
      {currentUser ? (
        <Profile user={currentUser} onLogout={() => setCurrentUser(null)} />
      ) : (
        <Login onLogin={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
