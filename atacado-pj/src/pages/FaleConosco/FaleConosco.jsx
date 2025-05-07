import React, { useState } from 'react';
import './FaleConosco.css';
import { MapPin, MapPinned } from 'lucide-react'; 

export default function FaleConosco() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    setForm({ nome: '', email: '', assunto: '' });
  };

  return (
    <div className="contato-container">
      <div className="contato-infos">
        <h2>Nossos contatos</h2>
        <ul>
          <li><MapPin color="red" /> Unidade São José – (81) 3424-5407</li>
          <li><MapPinned color="green" /> Unidade Torre – (81) 3445-9034</li>
          <li><MapPin color="red" /> Unidade Curado – (81) 3878-0687</li>
          <li><MapPinned color="green" /> Unidade Boa Vista – (81) 3421-4280</li>
        </ul>
      </div>

      <form className="contato-form" onSubmit={handleSubmit}>
        <h2>Fale conosco</h2>
        <label>Nome completo:</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Assunto:</label>
        <textarea name="assunto" rows="4" value={form.assunto} onChange={handleChange} required />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
