export default function ChamadoCard({ chamado, perfil, onDelete }) {
  const statusExibicao = chamado.status === "fechado" ? "Concluído" : chamado.status;

  return (
    <div className="card-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <a href={`/chamado/${chamado.id}`} className="card" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
        <h2>{chamado.titulo}</h2>
        <p>{chamado.descricao.substring(0,80)}...</p>
        <small>Status: {statusExibicao}</small>
      </a>
      {perfil === "tecnico" && onDelete && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDelete(chamado.id);
          }}
          style={{ 
            backgroundColor: 'red', 
            color: 'white', 
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Excluir
        </button>
      )}
    </div>
  );
}