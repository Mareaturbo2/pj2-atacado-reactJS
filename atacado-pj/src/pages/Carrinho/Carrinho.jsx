import React from 'react';
import { useCarrinho } from '../../Carrinho/Carrinho';
import styles from './Carrinho.module.css';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho } = useCarrinho();

  const total = carrinho.reduce((soma, item) => {
    const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    return soma + preco;
  }, 0);

  return (
    <div className={styles['carrinho-container']}>
      <h1 className={styles['titulo']}>Seu Carrinho</h1>

      <input
        type="text"
        placeholder="🔍 Buscar produto no carrinho"
        className={styles['campo-busca']}
        disabled
      />

      {carrinho.length === 0 ? (
        <p className={styles['vazio']}>O carrinho está vazio.</p>
      ) : (
        <div className={styles['lista-itens']}>
          {carrinho.map((item, index) => (
            <div className={styles['item']} key={index}>
              <img src={item.imagem} alt={item.nome} />
              <div className={styles['info']}>
                <p className={styles['nome']}>{item.nome}</p>
                <p className={styles['descricao']}>Categoria | Utilidades</p>
                <p className={styles['preco']}>{item.preco}</p>
              </div>
              <button
                className={styles['remover']}
                onClick={() => removerDoCarrinho(item.id)}
              >
                Remover
              </button>
            </div>
          ))}

          <div className={styles['total']}>
            <span>Total:</span>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>
      )}

      <div className={styles['acoes']}>
        <button className={styles['botao-opcao']}>Aplicar cupom de desconto</button>
        <button className={styles['botao-opcao']}>Métodos de pagamento</button>
        <button className={styles['botao-opcao']}>Informações de entrega</button>
      </div>

      <div className={styles['rodape']}>
        <button className={styles['btn-finalizar']}>Finalizar Compra</button>
      </div>
    </div>
  );
}
