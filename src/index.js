import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importando CSS diretamente da pasta src
import App from './App'; // Importando o componente App (pode ser .js ou .jsx)

// Obter o elemento raiz onde o React vai renderizar
const rootElement = document.getElementById('root');

// Verificar se o elemento root existe
if (!rootElement) {
  console.error('Elemento "root" não encontrado no HTML!');
} else {
  try {
    // Criar a raiz do React (usando a API moderna do React 18+)
    const root = ReactDOM.createRoot(rootElement);

    // Renderizar o aplicativo 
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Erro ao renderizar o aplicativo:', error);
    
    // Exibir mensagem amigável para o usuário caso falhe a renderização
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 20px; font-family: sans-serif;">
        <h2>Erro ao iniciar o aplicativo</h2>
        <p>Ocorreu um problema ao carregar o Sistema de Inspeção CBMERJ.</p>
        <p>Por favor, verifique o console para mais detalhes ou contate o suporte.</p>
      </div>
    `;
  }
}

// Log de inicialização (útil para debug)
console.log('Sistema de Inspeção CBMERJ - Aplicação iniciada');