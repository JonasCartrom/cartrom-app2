// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// ── Logo base64 embutida (mesma do App.jsx) ──────────────────
import { LOGO_SRC } from "../assets/logo";

const C = {
  navy: "#1B2F6B", blue: "#5BBFCF", green: "#5DB840",
  white: "#FFFFFF", gray: "#6B7A8D", line: "#DEE5EE",
  text: "#1A2A3A", off: "#F7F9FC", red: "#D32F2F",
};

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await login(email, senha);
    } catch {
      setErro("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      fontFamily: "'Barlow', sans-serif",
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${C.navy} 0%, #253C80 60%, #1a5276 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

      {/* Logo */}
      <div style={{
        background: "#fff", borderRadius: 16,
        padding: "12px 24px", marginBottom: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}>
        <img src={LOGO_SRC} alt="Cartrom" style={{ height: 48, display: "block" }} />
      </div>

      {/* Card */}
      <div style={{
        background: C.white, borderRadius: 20,
        padding: "32px 28px", width: "100%", maxWidth: 400,
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
      }}>
        <h2 style={{ color: C.navy, fontSize: 22, fontWeight: 900, marginBottom: 4, textAlign: "center" }}>
          Bem-vindo
        </h2>
        <p style={{ color: C.gray, fontSize: 13, textAlign: "center", marginBottom: 28 }}>
          Gestão de Projetos Técnicos
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, color: C.gray, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{
                width: "100%", boxSizing: "border-box",
                border: `1.5px solid ${C.line}`, borderRadius: 10,
                padding: "12px 14px", fontSize: 14, color: C.text,
                outline: "none", fontFamily: "'Barlow', sans-serif",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, color: C.gray, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>
              Senha
            </label>
            <input
              type="password" required
              value={senha} onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%", boxSizing: "border-box",
                border: `1.5px solid ${C.line}`, borderRadius: 10,
                padding: "12px 14px", fontSize: 14, color: C.text,
                outline: "none", fontFamily: "'Barlow', sans-serif",
              }}
            />
          </div>

          {erro && (
            <div style={{
              background: "#FFEBEE", border: "1.5px solid #EF9A9A",
              borderRadius: 10, padding: "10px 14px",
              color: C.red, fontSize: 13, marginBottom: 16,
            }}>
              {erro}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%",
              background: loading ? C.gray : `linear-gradient(135deg, ${C.navy}, #253C80)`,
              color: C.white, border: "none", borderRadius: 12,
              padding: "15px", fontSize: 15, fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Barlow', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            {loading ? "Entrando…" : "ENTRAR"}
          </button>
        </form>
      </div>

      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 24 }}>
        Cartrom Embalagens © {new Date().getFullYear()}
      </p>
    </div>
  );
}
