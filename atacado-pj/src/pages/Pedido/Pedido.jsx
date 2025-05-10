import React, { useEffect, useState } from 'react';
import { useCarrinho } from '../../Carrinho/Carrinho';
import { useNavigate } from 'react-router-dom';
import styles from './Pedido.module.css';

export default function Pedido() {
  const { carrinho, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const [pedidoId, setPedidoId] = useState('');
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [itensPedido, setItensPedido] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const idGerado = 'ATC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setPedidoId(idGerado);

    const dias = Math.floor(Math.random() * 3) + 3;
    setPrazoEntrega(`${dias} dias úteis`);

    const totalPedido = carrinho.reduce((soma, item) => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return soma + preco;
    }, 0);

    setTotal(totalPedido);
    setItensPedido(carrinho);

    const novoPedido = {
      id: idGerado,
      prazo: `${dias} dias úteis`,
      itens: carrinho,
      total: totalPedido,
      data: new Date().toISOString(),
    };

    const pedidosAntigos = JSON.parse(localStorage.getItem('pedidos')) || [];
    localStorage.setItem('pedidos', JSON.stringify([novoPedido, ...pedidosAntigos]));

    limparCarrinho?.();
  }, []); 

  return (
    <div className={styles['pedido-container']}>
      <h1>✅ Pedido confirmado!</h1>
      <p className={styles['id-pedido']}>Pedido #{pedidoId}</p>
      <p className={styles['prazo']}>Entrega estimada: {prazoEntrega}</p>

      <div className={styles['lista-produtos']}>
        {itensPedido.map((item, index) => (
          <div className={styles['item']} key={index}>
            <img src={item.imagem} alt={item.nome} />
            <div className={styles['info']}>
              <p className={styles['nome']}>{item.nome}</p>
              <p className={styles['preco']}>Preço: {item.preco}</p>
            </div>
          </div>
        ))}
      </div>

      <p className={styles['total']}>
        Total pago: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
      </p>

      <p className={styles['mensagem']}>Obrigado por comprar conosco! 🎁</p>

      <button onClick={() => navigate('/')} className={styles['btn-voltar']}>
        Voltar à loja
      </button>
    </div>
  );
}
