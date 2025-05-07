import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@email.com' && senha === '123456') {
      navigate('/UserProfile'); 
    } else {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className={styles['login-container']}>
        <form className={styles['login-box']} onSubmit={handleLogin}>
        <h2>Seja bem vindo</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p className={styles.loginHelp}>
          Não consegue entrar na sua conta? <a href="#">Recuperar senha</a>
        </p>
      </form>
    </div>
  );
}
