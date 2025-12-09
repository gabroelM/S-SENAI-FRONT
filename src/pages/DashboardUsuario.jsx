import { useEffect, useState } from "react";
import api from "../api/api";
import ChamadoCard from "../components/ChamadoCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardUsuario() {
  const { usuario } = useContext(AuthContext); 
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    api.get("/chamados/tudo").then(res => {
      // Removida a filtragem manual, o backend deve garantir que apenas os chamados do usuário sejam retornados
      setChamados(res.data);
    });
  }, []);

  // Passar o perfil para o ChamadoCard para que ele saiba como se renderizar
  return (
    <div className="container">
      <h1>Meus Chamados</h1>
      <a href="/novo-chamado" className="btn">+ Abrir Chamado</a>

      {chamados.map(c => <ChamadoCard key={c.id} chamado={c} perfil={usuario?.perfil} />)}
      {chamados.length === 0 && <p>Nenhum chamado encontrado. <a href="/novo-chamado">Abra um novo chamado.</a></p>}
    </div>
  );
}