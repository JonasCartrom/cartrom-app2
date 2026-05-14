// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase user
  const [perfil, setPerfil] = useState(null);   // { nome, papel: 'lideranca' | 'tecnico' }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Busca papel do usuário no Firestore
        const snap = await getDoc(doc(db, "usuarios", firebaseUser.uid));
        if (snap.exists()) {
          setPerfil(snap.data());
        }
      } else {
        setUser(null);
        setPerfil(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, senha) =>
    signInWithEmailAndPassword(auth, email, senha);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, perfil, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
