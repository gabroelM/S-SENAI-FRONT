import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "usuario" // Padrão: usuario
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    nav("/");
  };

  return (
    <div className="container">
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nome"
          onChange={(e) => setForm({...form, nome: e.target.value})}/>
        <input placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="password"
          placeholder="Senha"
          onChange={(e) => setForm({...form, senha: e.target.value})}/>
        
        {/* NOVO CAMPO DE SELEÇÃO DE PERFIL */}
        <select
          onChange={(e) => setForm({...form, perfil: e.target.value})}
          value={form.perfil}
        >
          <option value="usuario">Usuário Comum</option>
          <option value="tecnico">Técnico</option>
        </select>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}