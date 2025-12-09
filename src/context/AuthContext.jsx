import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("perfil");
    const nome = localStorage.getItem("nome");

    if (token) {
      setUsuario({ token, perfil, nome });
    }
  }, []);

  const login = async (email, senha) => {
    const res = await api.post("/auth/login", { email, senha });

    localStorage.setItem("token", res.data.token);

    // Decodificar payload do JWT
    const payload = JSON.parse(atob(res.data.token.split(".")[1]));

    localStorage.setItem("perfil", payload.perfil);
    localStorage.setItem("nome", payload.nome);

    setUsuario(payload);
    return payload;
  };

  const logout = () => {
    localStorage.clear();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
