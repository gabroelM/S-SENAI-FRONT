import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function NovoChamado() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "baixa"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/chamados/criarChamado", form);
    nav("/usuario");
  };

  return (
    <div className="container">
      <h1>Abrir Chamado</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Título"
          onChange={(e) => setForm({...form, titulo: e.target.value})}/>
        <textarea placeholder="Descrição"
          onChange={(e) => setForm({...form, descricao: e.target.value})}/>
        <input placeholder="Categoria"
          onChange={(e) => setForm({...form, categoria: e.target.value})}/>
        <select
          onChange={(e) => setForm({...form, prioridade: e.target.value})}>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        <button type="submit">Criar Chamado</button>
      </form>
    </div>
  );
}
