import React, { useEffect, useState } from 'react';
import styles from './MeusPedidos.module.css';

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosSalvos);
  }, []);

  function calcularStatus(pedido) {
    const agora = new Date();
    const entrega = new Date(pedido.dataEntrega);
    if (agora > entrega) return 'Entregue';
    return pedido.status || 'Em preparação';
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>📦 Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className={styles.vazio}>Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido, index) => (
          <div className={styles.pedido} key={index}>
            <div className={styles.cabecalho}>
              <h2>Pedido #{pedido.id}</h2>
              <span
                className={`${styles.status} ${
                  calcularStatus(pedido) === 'Entregue'
                    ? styles.entregue
                    : styles.preparacao
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
          </div>
        ))
      )}
    </div>
  );
}
