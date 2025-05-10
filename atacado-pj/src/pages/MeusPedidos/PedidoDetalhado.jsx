import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PedidoDetalhado.module.css';

export default function PedidoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const encontrado = pedidos.find(p => p.id === id);

    if (!encontrado) {
      alert('Pedido não encontrado');
      navigate('/meus-pedidos');
      return;
    }

    const dataCompra = new Date(encontrado.dataCompra);
    const dataEntrega = new Date(encontrado.dataEntrega);
    const hoje = new Date();

    const diasDesdeCompra = Math.floor((hoje - dataCompra) / (1000 * 60 * 60 * 24));

    let status = 'Em preparação';
    if (hoje >= dataEntrega) status = 'Entregue';
    else if (diasDesdeCompra >= 2) status = 'Em transporte';

    setPedido({ ...encontrado, status });
  }, [id, navigate]);

  if (!pedido) return null;

  return (
    <div className={styles.container}>
      <h1>📦 Detalhes do Pedido</h1>
      <p><strong>ID:</strong> {pedido.id}</p>
      <p><strong>Status:</strong> {pedido.status}</p>
      <p><strong>Data da compra:</strong> {new Date(pedido.dataCompra).toLocaleDateString()}</p>
      <p><strong>Entrega estimada:</strong> {pedido.prazo}</p>
      <p><strong>Endereço:</strong> {pedido.endereco}</p>

      <h2>Produtos</h2>
      <div className={styles.itens}>
        {pedido.itens.map((item, index) => (
          <div key={index} className={styles.item}>
            <img src={item.imagem} alt={item.nome} />
            <div>
              <p><strong>{item.nome}</strong></p>
              <p>{item.preco}</p>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.total}>
        <strong>Total:</strong> R$ {pedido.total.toFixed(2).replace('.', ',')}
      </p>

      <button className={styles.voltar} onClick={() => navigate('/meus-pedidos')}>
        🔙 Voltar
      </button>
    </div>
  );
}
