// src/App.jsx
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user, perfil, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#1B2F6B",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Barlow', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, border: "4px solid rgba(255,255,255,0.2)",
            borderTop: "4px solid #5DB840", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Carregando…</p>
        </div>
      </div>
    );
  }

  if (!user || !perfil) return <Login />;
  return <Dashboard />;
}
