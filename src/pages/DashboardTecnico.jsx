import { useEffect, useState, useCallback, useContext } from "react";
import api from "../api/api";
import ChamadoCard from "../components/ChamadoCard";
import { AuthContext } from "../context/AuthContext";

export default function DashboardTecnico() {
  const { usuario } = useContext(AuthContext);
  const [chamados, setChamados] = useState([]);
  // 'fechado' é usado no backend, mas aqui exibo como 'Concluído'
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Função para buscar chamados, dependente do filtro de status
  const fetchChamados = useCallback(async () => {
    try {
      let url = "/chamados/tudo";
      // Se não for 'todos', adiciona o filtro na query
      if (filtroStatus !== "todos") {
        url = `/chamados/tudo?status=${filtroStatus}`;
      }
      const res = await api.get(url);
      setChamados(res.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  }, [filtroStatus]);

  useEffect(() => {
    if (usuario && usuario.perfil === 'tecnico') {
      fetchChamados();
    }
  }, [fetchChamados, usuario]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este chamado?")) {
      try {
        await api.delete(`/chamados/${id}`);
        // Remove o item excluído do estado local
        setChamados(chamados.filter(c => c.id !== id));
      } catch (error) {
        console.error("Erro ao deletar chamado:", error);
        alert("Não foi possível excluir o chamado.");
      }
    }
  };

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "aberto", label: "Aberto" },
    { value: "em andamento", label: "Em andamento" },
    { value: "fechado", label: "Concluído" },
  ];

  if (!usuario || usuario.perfil !== 'tecnico') {
    return <p>Acesso negado.</p>;
  }

  return (
    <div className="container">
      <h1>Painel do Técnico</h1>
      
      <div className="filter-group" style={{ marginBottom: '20px' }}>
        <label htmlFor="status-filter">Filtrar por Status: </label>
        <select 
          id="status-filter" 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {chamados.map(c => (
        <ChamadoCard 
          key={c.id} 
          chamado={c} 
          perfil={usuario?.perfil} 
          onDelete={handleDelete}
        />
      ))}
      {chamados.length === 0 && <p>Nenhum chamado encontrado.</p>}
    </div>
  );
}