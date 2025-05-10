import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatBot.module.css';
import TacadinhoOi from '../../assets/tacadinhooi.png';
import { obterListas } from '../../utils/listas';

const respostas = [
  { keywords: ["casamento"], resposta: "🎁 Para casamento, sugerimos conjuntos de jantar, eletrodomésticos ou itens de decoração elegante!" },
  { keywords: ["aniversário"], resposta: "🎂 Para aniversário: perfumes, relógios, roupas estilosas ou acessórios como bolsas e carteiras!" },
  { keywords: ["dia das mães", "mãe", "mae"], resposta: "💐 Para o Dia das Mães: flores, joias, perfumes, kits de spa ou bolsas sofisticadas!" },
  { keywords: ["amigo secreto", "amigo oculto"], resposta: "🎁 Para amigo secreto: canecas personalizadas, chocolates, fones de ouvido ou kits de beleza." },
  { keywords: ["dia dos pais", "pai"], resposta: "🎉 Para o Dia dos Pais: carteiras, kits de churrasco, relógios." },
  { keywords: ["natal"], resposta: "🎄 No Natal temos roupas, eletrônicos, brinquedos, kits de beleza e muito mais!" },
  { keywords: ["departamentos"], resposta: "🏬 Nossa loja possui Moda, Beleza, Decoração, Eletrodomésticos, Esportes e Tecnologia." },
  { keywords: ["moda", "roupa"], resposta: "👕 Na moda temos roupas femininas, masculinas, infantis, moda praia e fitness!" },
  { keywords: ["decoração"], resposta: "🏡 Em decoração: quadros, almofadas, velas aromáticas e pequenos móveis." },
  { keywords: ["endereço", "lojas", "localização"], resposta: `
🏬 Nossas lojas:

1️⃣ São Jose - Rua das calçadas, 330  
2️⃣ Curado - Rod. BR232 KM-15  
3️⃣ Torre - Rua José Bonifácio, 961  
4️⃣ Boa Vista - Av. Conde da Boa Vista, 385  
5️⃣ Imbiribeira - Av. Mal. Mascarenhas de Morais, 4075
` },
  { keywords: ["horario das lojas", "horario", "funciona", "abertura"], resposta: `
⏰ Nosso horário de funcionamento:

🛍️ Segunda a Sábado: 10h às 22h  
🛍️ Domingo e feriados: 14h às 20h
` },
  { keywords: ["obrigado", "valeu"], resposta: "🙌 De nada! Volte sempre que precisar!" },
  { keywords: ["oi", "olá", "e aí"], resposta: "👋 Olá! Bem-vindo(a) ao atacado dos presentes. Como posso ajudar hoje?" },
  { keywords: ["tchau", "adeus"], resposta: "👋 Tchau! Esperamos vê-lo novamente em breve!" }
];

const ChatBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ultimaLista, setUltimaLista] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.__goToLista = (id) => {
      navigate(`/lista/${id}`);
    };
  }, [navigate]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    addMessage('user', userMsg);

    setTimeout(() => {
      addMessage('bot', 'Digitando...', true);
      setTimeout(() => {
        removeLastTempMessage();
        const botReply = generateResponse(userMsg);
        addMessage('bot', botReply);
      }, 1200);
    }, 300);

    setInput('');
  };

  const addMessage = (type, text, isTemporary = false) => {
    setMessages(prev => [...prev, { type, text, isTemporary }]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const removeLastTempMessage = () => {
    setMessages(prev => prev.filter(m => !m.isTemporary));
  };

  const generateResponse = (userMessage) => {
    const listas = obterListas();
    const msgLower = userMessage.toLowerCase().trim();

    // Extrai ID no formato lista-xxxxxx com ou sem "#"
    const match = msgLower.match(/#?(lista-[a-z0-9]+)/i);
    const possívelId = match ? match[1] : msgLower;

    if (possívelId === "sim" && ultimaLista) {
      navigate(`/lista/${ultimaLista.id}`);
      return "🔁 Redirecionando para sua lista agora...";
    }

    // Tenta encontrar lista pelo ID ou nome exato
    let encontrada = listas.find(
      (lista) =>
        lista.id.toLowerCase() === possívelId.toLowerCase() ||
        lista.nome.toLowerCase() === possívelId.toLowerCase()
    );

    // Tenta por nome parcial dentro da frase
    if (!encontrada) {
      encontrada = listas.find((lista) =>
        msgLower.includes(lista.nome.toLowerCase())
      );
    }

    if (encontrada) {
      setUltimaLista(encontrada);
      return `
🎉 Encontrei a lista <strong>${encontrada.nome}</strong>!

<div style="margin-top:12px;">
  <button onclick="window.__goToLista('${encontrada.id}')" style="background: linear-gradient(90deg, #78BE21 0%, #5aa018 100%); border: none; padding: 10px 18px; border-radius: 30px; color: white; font-weight: bold; cursor: pointer; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.2s ease, background 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    👉 Visualizar Lista
  </button>
</div>

<br/>
Ou digite: <strong>"Sim"</strong> para ser redirecionado agora.
`;
    }

    for (const r of respostas) {
      if (r.keywords.some(k => msgLower.includes(k))) {
        return r.resposta;
      }
    }

    return "🤔 Desculpe, não entendi. Pode perguntar sobre presentes, listas, lojas ou horários!";
  };

  return (
    <div>
      <button className={styles.chatButton} onClick={toggleChat}>💬</button>

      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            Tacadinho
            <button className={styles.minimizeButton} onClick={toggleChat} aria-label="Minimizar chat">
              &#x25BC;
            </button>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.type]}`}>
                {msg.type === "bot" && (
                  <img src={TacadinhoOi} alt="Bot" className={styles.avatar} />
                )}
                <div className={styles.bubble}>
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br/>") }} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.userInput}
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendButton} onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
