import React, { useState, useRef } from 'react';
import './ChatBot.css';
import TacadinhoOi from '../../assets/tacadinhooi.png'

const respostas = [
  { keywords: ["casamento"], resposta: "🎁 Para casamento, sugerimos conjuntos de jantar, eletrodomésticos ou itens de decoração elegante!" },
  { keywords: ["aniversário"], resposta: "🎂 Para aniversário: perfumes, relógios, roupas estilosas ou acessórios como bolsas e carteiras!" },
  { keywords: ["dia das mães", "mãe","mae"], resposta: "💐 Para o Dia das Mães: flores, joias, perfumes, kits de spa ou bolsas sofisticadas!" },
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
  { keywords: ["horario das lojas","horario", "funciona", "abertura"], resposta: `
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
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage('user', input);

    setTimeout(() => {
      addMessage('bot', 'Digitando...', true);

      setTimeout(() => {
        removeLastTempMessage();
        const botReply = generateResponse(input);
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
    const msgLower = userMessage.toLowerCase();
    for (const r of respostas) {
      if (r.keywords.some(k => msgLower.includes(k))) {
        return r.resposta;
      }
    }
    return "🤔 Desculpe, não entendi. Pode perguntar sobre presentes, lojas ou horários!";
  };

  return (
    <div>
      <button id="chatButton" onClick={() => setIsOpen(!isOpen)}>💬</button>

      {isOpen && (
        <div id="chatContainer" style={{ display: 'flex' }}>
        <div id="chatHeader">
              Tacadinho
              <button id="minimizeButton" onClick={toggleChat} aria-label="Minimizar chat">
              &#x25BC;
              </button>
        </div>
          <div id="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.type === "bot" && (
                  <img src={TacadinhoOi} alt="Bot" className="avatar" />
                )}
                <div className="bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div id="inputArea">
            <input
              type="text"
              id="userInput"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button id="sendButton" onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
