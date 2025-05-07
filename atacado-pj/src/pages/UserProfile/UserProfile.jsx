import React from 'react';
import './UserProfile.css';
import avatar from '../../assets/avatar.png';

export default function UserProfile() {
  return (
    <div className="perfil-container">
      <div className="perfil-box">
      <img className="perfil-avatar" src={avatar} alt="Avatar" />
        <div className="perfil-buttons">
          <button className="editar">Editar</button>
          <button className="sair">Sair</button>
        </div>

        <div className="perfil-info">
          <p className="info">Nome de usuário</p>
          <p className="info">Endereço de entrega</p>
          <p className="info">(xx) xxxx-xxxx</p>
        </div>
      </div>

      <div className="perfil-menu">
        <div className="item"><span>Informações de identidade</span> <span className="verificado">verificado &gt;</span></div>
        <div className="item">Métodos de pagamento &gt;</div>
        <div className="item">Comprar novamente &gt;</div>
        <div className="item">À caminho &gt;</div>
        <div className="item">Cupons &gt;</div>
        <div className="item">Central de ajuda &gt;</div>
      </div>
    </div>
  );
}
