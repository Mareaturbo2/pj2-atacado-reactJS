import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obterListas } from '../../utils/listas';
import './VisualizarLista.css';

export default function VisualizarLista() {
  const { id } = useParams();
  const [lista, setLista] = useState(null);

  useEffect(() => {
    const listas = obterListas();
    const encontrada = listas.find(l => l.id === id);
    setLista(encontrada || null);
  }, [id]);

  if (!lista) {
    return <p style={{ textAlign: 'center' }}>Lista não encontrada.</p>;
  }

  return (
    <div className="lista-container">
      <h1>{lista.nome}</h1>

      <div className="top-bar">
        <input type="text" className="busca" placeholder="🔍 Buscar produto" disabled />
        <button className="btn-adicionar">Adicionar à lista</button>
      </div>

      <div className="produtos">
        {lista.produtos.map((produto, index) => (
          <div className="card" key={index}>
            <img src={produto.imagem} alt={produto.nome} />
            <div className="info">
              <p className="nome">{produto.nome}</p>
              <p className="preco">{produto.preco}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
