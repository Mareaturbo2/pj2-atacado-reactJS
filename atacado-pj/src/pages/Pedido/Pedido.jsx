import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCarrinho } from '../../Carrinho/Carrinho';
import styles from './Pedido.module.css';

export default function Pedido() {
  const navigate = useNavigate();
  const location = useLocation();
  const { carrinho, endereco } = location.state || {};
  const { limparCarrinho } = useCarrinho();

  const [pedidoId, setPedidoId] = useState('');
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [total, setTotal] = useState(0);
  const pedidoCriadoRef = useRef(false); 
  const carrinhoLimpo = useRef(false);   

  useEffect(() => {
    if (!carrinho || !endereco || carrinho.length === 0) {
      alert('Informações do pedido incompletas.');
      navigate('/');
      return;
    }

    if (pedidoCriadoRef.current) return;
    pedidoCriadoRef.current = true;

    // Gera ID e dados do pedido
    const id = 'ATC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setPedidoId(id);

    const dias = Math.floor(Math.random() * 3) + 3;
    setPrazoEntrega(`${dias} dias úteis`);

    const totalPedido = carrinho.reduce((soma, item) => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return soma + preco;
    }, 0);
    setTotal(totalPedido);

    const dataEntrega = new Date();
    dataEntrega.setDate(dataEntrega.getDate() + dias);

    const novoPedido = {
      id,
      prazo: `${dias} dias úteis`,
      itens: carrinho,
      total: totalPedido,
      dataCompra: new Date().toISOString(),
      dataEntrega: dataEntrega.toISOString(),
      status: 'Em preparação',
      endereco,
    };

    const pedidosAntigos = JSON.parse(localStorage.getItem('pedidos')) || [];
    localStorage.setItem('pedidos', JSON.stringify([novoPedido, ...pedidosAntigos]));

    // 🔥 Remove os produtos da lista de origem
    const idListaOrigem = localStorage.getItem('listaOrigem');
    if (idListaOrigem) {
      const listas = JSON.parse(localStorage.getItem('listas')) || [];
      const index = listas.findIndex(l => l.id === idListaOrigem);
      if (index !== -1) {
        const idsComprados = carrinho.map(item => item.id);
        const novaLista = {
          ...listas[index],
          produtos: listas[index].produtos.filter(p => !idsComprados.includes(p.id))
        };
        listas[index] = novaLista;
        localStorage.setItem('listas', JSON.stringify(listas));
      }
      localStorage.removeItem('listaOrigem');
    }

    if (!carrinhoLimpo.current) {
      limparCarrinho?.();
      carrinhoLimpo.current = true;
    }
  }, [carrinho, endereco, navigate, limparCarrinho]);

  return (
    <div className={styles['pedido-container']}>
      <h1>✅ Pedido confirmado!</h1>
      <p className={styles['id-pedido']}>Pedido #{pedidoId}</p>
      <p className={styles['prazo']}>Entrega estimada: {prazoEntrega}</p>
      <p className={styles['total']}>
        Total pago: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
      </p>
      <p className={styles['entrega']}>
        📦 Entrega em: <strong>{endereco}</strong>
      </p>

      <div className={styles['lista-produtos']}>
        {carrinho.map((item, index) => (
          <div className={styles['item']} key={index}>
            <img src={item.imagem} alt={item.nome} />
            <div className={styles['info']}>
              <p className={styles['nome']}>{item.nome}</p>
              <p className={styles['preco']}>{item.preco}</p>
            </div>
          </div>
        ))}
      </div>

      <p className={styles['mensagem']}>Obrigado por comprar conosco! 🎁</p>

      <button onClick={() => navigate('/')} className={styles['btn-voltar']}>
        Voltar à loja
      </button>
    </div>
  );
}
