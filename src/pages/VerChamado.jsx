import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function VerChamado() {
  const { id } = useParams();
  const nav = useNavigate();
  const [chamado, setChamado] = useState(null);

  const perfil = localStorage.getItem("perfil");

  useEffect(() => {
    api.get(`/chamados/${id}`).then(res => setChamado(res.data))
      .catch(error => {
        console.error("Erro ao carregar chamado:", error);
        nav(perfil === "tecnico" ? "/tecnico" : "/usuario");
      });
  }, [id, nav, perfil]);

  const atualizarStatus = async (novo) => {
    await api.put(`/chamados/${id}`, { status: novo });
    setChamado({ ...chamado, status: novo });
    api.get(`/chamados/${id}`).then(res => setChamado(res.data));
  };

  const deletarChamado = async () => {
    if (window.confirm("Tem certeza que deseja excluir este chamado?")) {
      await api.delete(`/chamados/${id}`);
      nav(perfil === "tecnico" ? "/tecnico" : "/usuario");
    }
  };

  if (!chamado) return <p>Carregando...</p>;

  const statusExibicao = chamado.status === "fechado" ? "Concluído" : chamado.status;

  return (
    <div className="container">
      <h1>{chamado.titulo}</h1>
      <p><b>Descrição:</b> {chamado.descricao}</p>
      <p><b>Status:</b> {statusExibicao}</p>

      {perfil === "tecnico" && (
        <div className="btn-group">
          <button onClick={() => atualizarStatus("em andamento")}>Em andamento</button>
          <button onClick={() => atualizarStatus("fechado")}>Concluir</button>
          <button onClick={deletarChamado} style={{ backgroundColor: 'red', marginLeft: '10px' }}>Excluir Chamado</button>
        </div>
      )}
    </div>
  );
}