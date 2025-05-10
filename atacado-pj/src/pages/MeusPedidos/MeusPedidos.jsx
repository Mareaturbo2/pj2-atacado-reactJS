import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MeusPedidos.module.css';


export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosSalvos);
  }, []);

  const calcularStatus = (pedido) => {
  const dataCompra = new Date(pedido.data);
  const diasEntrega = parseInt(pedido.prazo?.match(/\d+/)?.[0]) || 0;
  const dataEntregaEstimada = new Date(dataCompra);
  dataEntregaEstimada.setDate(dataCompra.getDate() + diasEntrega);

  const hoje = new Date();

  if (hoje >= dataEntregaEstimada) return "Entregue";
  if (diasDesdeCompra(dataCompra) >= 2) return "Em transporte";
  return "Em preparação";
  };
  const diasDesdeCompra = (dataCompra) => {
  const hoje = new Date();
  const diffTime = Math.abs(hoje - dataCompra);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

  return (
    <div className={styles.container}>
      <h1>📄 Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido, index) => (
          <div className={styles.pedido} key={index}>
            <div className={styles.cabecalho}>
              <h2>Pedido #{pedido.id}</h2>
              <span
                className={`${styles.status} ${
                  calcularStatus(pedido) === 'Entregue' ? styles.entregue : styles.preparacao
                }`}
              >
                {calcularStatus(pedido)}
              </span>
            </div>

            <p><strong>Data da compra:</strong> {new Date(pedido.dataCompra).toLocaleDateString()}</p>
            <p><strong>Entrega estimada:</strong> {pedido.prazo}</p>
            <p className={styles.total}>
              <strong>Total:</strong> R$ {pedido.total.toFixed(2).replace('.', ',')}
            </p>

            <div className={styles.itens}>
              {pedido.itens.map((item, idx) => (
                <div className={styles.item} key={idx}>
                  <img src={item.imagem} alt={item.nome} />
                  <div>
                    <p className={styles.nome}>{item.nome}</p>
                    <p className={styles.preco}>Preço: {item.preco}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={styles['btn-detalhes']}
              onClick={() => navigate(`/pedido/${pedido.id}`)}
            >
              🔍 Ver detalhes
            </button>
          </div>
        ))
      )}
    </div>
  );
}
