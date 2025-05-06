import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  Timestamp, 
  orderBy 
} from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Lista de GBMs
const gbmList = [
  { id: 1, name: "1º GBM - Centro" },
  { id: 2, name: "2º GBM - Méier" },
  { id: 3, name: "3º GBM - Humaitá" },
  { id: 4, name: "4º GBM - Nova Iguaçu" },
  { id: 5, name: "5º GBM - Copacabana" },
  { id: 6, name: "6º GBM - Tijuca" },
  { id: 7, name: "7º GBM - São Cristóvão" },
  { id: 8, name: "8º GBM - Campinho" },
  { id: 9, name: "9º GBM - Macaé" },
  { id: 10, name: "10º GBM - Angra dos Reis" },
  { id: 11, name: "11º GBM - Vila Isabel" },
  { id: 12, name: "12º GBM - Jacarepaguá" },
  { id: 13, name: "13º GBM - Campo Grande" },
  { id: 14, name: "14º GBM - Duque de Caxias" },
  { id: 15, name: "15º GBM - Petrópolis" },
  { id: 16, name: "16º GBM - Teresópolis" },
  { id: 17, name: "17º GBM - Cabo Frio" },
  { id: 18, name: "18º GBM - Volta Redonda" },
  { id: 19, name: "19º GBM - Ilha do Governador" },
  { id: 20, name: "20º GBM - São Gonçalo" },
  { id: 21, name: "21º GBM - Itaperuna" },
  { id: 22, name: "22º GBM - Nova Friburgo" },
  { id: 23, name: "23º GBM - Resende" },
  { id: 24, name: "24º GBM - Irajá" },
  { id: 25, name: "25º GBM - Gávea" },
  { id: 26, name: "26º GBM - Campos dos Goytacazes" },
  { id: 27, name: "27º GBM - Santa Cruz" },
  { id: 28, name: "28º GBM - Araruama" },
  { id: 29, name: "29º GBM - Itaipava" }
];

// Dados do Caderno de Inspeção
const inspectionData = [
  {
    section: "B/1",
    title: "ADMINISTRAÇÃO",
    subsections: [
      {
        id: "1.1",
        title: "Documentação Administrativa",
        items: [
          { id: "a", description: "Os assentamentos das Praças BM estão atualizados e devidamente assinados por autoridade competente?" },
          { id: "b", description: "Os Boletins internos das OBMs e do CBA estão atualizados, lançados no portal e disponibilizados para a leitura?" },
          { id: "c", description: "Publicação em Boletim (no mês anterior ao de referência) da Escala de Expediente dos militares da atividade-meio?" },
          // Outros itens do caderno
        ]
      },
      {
        id: "1.2",
        title: "Gestão de Pessoal",
        items: [
          { id: "a", description: "Controle de dispensa e licença para tratamento de saúde: é feita a publicação em Boletim Interno dos militares com DM/LTS?" },
          { id: "b", description: "Controle de férias dos militares: Ocorre a publicação em Boletim Interno e o devido registro nos assentamentos do militar?" },
          // Outros itens do caderno
        ]
      }
    ]
  },
  {
    section: "B/2",
    title: "LOGÍSTICA",
    subsections: [
      {
        id: "2.1",
        title: "Infraestrutura da AI",
        items: [
          { id: "a", description: "Rede de Acesso Internet?" },
          { id: "b", description: "Linha telefônica?" },
          // Outros itens do caderno
        ]
      }
    ]
  }
  // Outras seções do caderno
];

// Componente principal
function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [selectedGBM, setSelectedGBM] = useState(null);

  // Verificar estado de autenticação ao carregar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
      if (user) {
        setCurrentPage('dashboard');
        fetchInspections();
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Buscar inspeções do Firestore
  const fetchInspections = async () => {
    try {
      const q = query(collection(db, "inspecoes"), orderBy("dataInicio", "desc"));
      const querySnapshot = await getDocs(q);
      const inspectionsData = [];
      querySnapshot.forEach((doc) => {
        inspectionsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setInspections(inspectionsData);
    } catch (error) {
      console.error("Erro ao buscar inspeções:", error);
      setError("Não foi possível carregar as inspeções. Tente novamente mais tarde.");
    }
  };

  // Função de login
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Se chegar aqui, o login foi bem-sucedido
      setError(null);
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Falha no login. Verifique suas credenciais e tente novamente.");
      setLoading(false);
    }
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('login');
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  // Iniciar nova inspeção
  const startNewInspection = async (gbmId) => {
    try {
      const gbm = gbmList.find(g => g.id === gbmId);
      const inspectionRef = await addDoc(collection(db, "inspecoes"), {
        gbmId: gbmId,
        gbmName: gbm.name,
        inspetorId: user.uid,
        inspetorName: user.displayName || user.email,
        dataInicio: Timestamp.now(),
        status: "Em andamento",
        conformidadeGeral: 0
      });
      
      // Adicionar seções e itens
      for (const section of inspectionData) {
        const sectionRef = await addDoc(collection(db, "inspecoes", inspectionRef.id, "secoes"), {
          codigo: section.section,
          titulo: section.title,
          conformidade: 0
        });
        
        for (const subsection of section.subsections) {
          for (const item of subsection.items) {
            await addDoc(collection(db, "inspecoes", inspectionRef.id, "secoes", sectionRef.id, "itens"), {
              subsecaoId: subsection.id,
              subsecaoTitulo: subsection.title,
              codigo: item.id,
              descricao: item.description,
              status: "Pendente",
              observacao: ""
            });
          }
        }
      }
      
      // Buscar inspeções atualizadas
      fetchInspections();
      setCurrentPage('inspections');
    } catch (error) {
      console.error("Erro ao criar inspeção:", error);
      setError("Não foi possível criar uma nova inspeção. Tente novamente.");
    }
  };

  // Visualizar detalhes da inspeção
  const viewInspectionDetails = async (inspectionId) => {
    try {
      const inspectionRef = doc(db, "inspecoes", inspectionId);
      const inspectionSnap = await getDoc(inspectionRef);
      
      if (inspectionSnap.exists()) {
        const inspection = {
          id: inspectionSnap.id,
          ...inspectionSnap.data(),
          sections: []
        };
        
        // Buscar seções
        const sectionsQuery = query(collection(db, "inspecoes", inspectionId, "secoes"));
        const sectionsSnap = await getDocs(sectionsQuery);
        
        for (const sectionDoc of sectionsSnap.docs) {
          const section = {
            id: sectionDoc.id,
            ...sectionDoc.data(),
            items: []
          };
          
          // Buscar itens
          const itemsQuery = query(collection(db, "inspecoes", inspectionId, "secoes", sectionDoc.id, "itens"));
          const itemsSnap = await getDocs(itemsQuery);
          
          itemsSnap.forEach(itemDoc => {
            section.items.push({
              id: itemDoc.id,
              ...itemDoc.data()
            });
          });
          
          inspection.sections.push(section);
        }
        
        setSelectedInspection(inspection);
        setCurrentPage('inspection-details');
      } else {
        setError("Inspeção não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da inspeção:", error);
      setError("Não foi possível carregar os detalhes da inspeção.");
    }
  };

  // Atualizar item da inspeção
  const updateInspectionItem = async (sectionId, itemId, status, observacao) => {
    try {
      const itemRef = doc(db, "inspecoes", selectedInspection.id, "secoes", sectionId, "itens", itemId);
      await updateDoc(itemRef, {
        status,
        observacao
      });
      
      // Atualizar inspeção local
      const updatedInspection = { ...selectedInspection };
      const sectionIndex = updatedInspection.sections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex !== -1) {
        const itemIndex = updatedInspection.sections[sectionIndex].items.findIndex(i => i.id === itemId);
        
        if (itemIndex !== -1) {
          updatedInspection.sections[sectionIndex].items[itemIndex].status = status;
          updatedInspection.sections[sectionIndex].items[itemIndex].observacao = observacao;
          
          // Recalcular conformidade
          const section = updatedInspection.sections[sectionIndex];
          const totalItems = section.items.length;
          const conformeItems = section.items.filter(i => i.status === "Conforme").length;
          const sectionCompliance = totalItems > 0 ? Math.round((conformeItems / totalItems) * 100) : 0;
          
          // Atualizar conformidade da seção
          const sectionRef = doc(db, "inspecoes", selectedInspection.id, "secoes", sectionId);
          await updateDoc(sectionRef, {
            conformidade: sectionCompliance
          });
          
          updatedInspection.sections[sectionIndex].conformidade = sectionCompliance;
          
          // Recalcular conformidade geral
          const totalSections = updatedInspection.sections.length;
          const totalCompliance = updatedInspection.sections.reduce((sum, s) => sum + s.conformidade, 0);
          const overallCompliance = totalSections > 0 ? Math.round(totalCompliance / totalSections) : 0;
          
          // Atualizar conformidade geral
          const inspectionRef = doc(db, "inspecoes", selectedInspection.id);
          await updateDoc(inspectionRef, {
            conformidadeGeral: overallCompliance
          });
          
          updatedInspection.conformidadeGeral = overallCompliance;
          
          setSelectedInspection(updatedInspection);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      setError("Não foi possível atualizar o item. Tente novamente.");
    }
  };

  // Finalizar inspeção
  const finalizeInspection = async () => {
    try {
      const inspectionRef = doc(db, "inspecoes", selectedInspection.id);
      await updateDoc(inspectionRef, {
        status: "Concluída",
        dataFim: Timestamp.now()
      });
      
      fetchInspections();
      setCurrentPage('inspections');
    } catch (error) {
      console.error("Erro ao finalizar inspeção:", error);
      setError("Não foi possível finalizar a inspeção. Tente novamente.");
    }
  };

  // Renderização condicional de páginas
  const renderContent = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    if (!isAuthenticated) {
      return <LoginScreen onLogin={handleLogin} error={error} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard 
          inspections={inspections} 
          onNewInspection={() => setCurrentPage('new-inspection')} 
          onViewInspection={viewInspectionDetails}
        />;
      case 'inspections':
        return <InspectionList 
          inspections={inspections} 
          onNewInspection={() => setCurrentPage('new-inspection')} 
          onViewInspection={viewInspectionDetails}
        />;
      case 'new-inspection':
        return <NewInspection 
          gbmList={gbmList} 
          onCancel={() => setCurrentPage('inspections')} 
          onSelect={setSelectedGBM}
          onStartInspection={startNewInspection}
          selectedGBM={selectedGBM}
        />;
      case 'inspection-details':
        return <InspectionDetails 
          inspection={selectedInspection} 
          onBack={() => setCurrentPage('inspections')} 
          onUpdateItem={updateInspectionItem}
          onFinalize={finalizeInspection}
        />;
      case 'reports':
        return <Reports inspections={inspections} />;
      default:
        return <Dashboard 
          inspections={inspections} 
          onNewInspection={() => setCurrentPage('new-inspection')} 
          onViewInspection={viewInspectionDetails}
        />;
    }
  };

  return (
    <div className="app-container">
      {isAuthenticated && (
        <Layout 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onLogout={handleLogout} 
          userName={user?.displayName || user?.email}
        >
          {renderContent()}
        </Layout>
      )}
      
      {!isAuthenticated && renderContent()}
      
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  );
}

// Componente de Carregamento
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

// Componente de Erro
function ErrorMessage({ message, onClose }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

// Componente de Layout
function Layout({ children, currentPage, onNavigate, onLogout, userName }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <img src="/logo-cbmerj.png" alt="CBMERJ Logo" />
          <h1>Sistema de Inspeção CBMERJ</h1>
        </div>
        <div className="user-info">
          <span>{userName}</span>
          <button onClick={onLogout}>Sair</button>
        </div>
      </header>
      
      <div className="main-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className={currentPage === 'dashboard' ? 'active' : ''}>
                <button onClick={() => onNavigate('dashboard')}>Dashboard</button>
              </li>
              <li className={currentPage === 'inspections' || currentPage === 'new-inspection' || currentPage === 'inspection-details' ? 'active' : ''}>
                <button onClick={() => onNavigate('inspections')}>Inspeções</button>
              </li>
              <li className={currentPage === 'reports' ? 'active' : ''}>
                <button onClick={() => onNavigate('reports')}>Relatórios</button>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

// Componente de Login
function LoginScreen({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  
  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-logo">
          <img src="/logo-cbmerj.png" alt="CBMERJ Logo" />
          <h1>Sistema de Inspeção CBMERJ</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="login-button">Entrar</button>
        </form>
        
        <div className="login-demo">
          <p>Para demonstração: email = "admin@cbmerj.gov.br", senha = "123456"</p>
        </div>
      </div>
    </div>
  );
}

// Componente Dashboard
function Dashboard({ inspections, onNewInspection, onViewInspection }) {
  // Estatísticas
  const totalInspections = inspections.length;
  const completedInspections = inspections.filter(i => i.status === "Concluída").length;
  const inProgressInspections = totalInspections - completedInspections;
  
  // Cálculo da conformidade média
  const averageCompliance = inspections.length > 0 
    ? Math.round(inspections.reduce((sum, i) => sum + (i.conformidadeGeral || 0), 0) / inspections.length) 
    : 0;
  
  // Lista de inspeções recentes
  const recentInspections = inspections.slice(0, 5);
  
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total de Inspeções</h3>
          <p className="stat-value">{totalInspections}</p>
        </div>
        <div className="stat-card">
          <h3>Concluídas</h3>
          <p className="stat-value">{completedInspections}</p>
        </div>
        <div className="stat-card">
          <h3>Em Andamento</h3>
          <p className="stat-value">{inProgressInspections}</p>
        </div>
        <div className="stat-card">
          <h3>Conformidade Média</h3>
          <p className="stat-value">{averageCompliance}%</p>
        </div>
      </div>
      
      <div className="recent-inspections">
        <div className="section-header">
          <h3>Inspeções Recentes</h3>
          <button onClick={() => onNewInspection()} className="new-button">Nova Inspeção</button>
        </div>
        
        {recentInspections.length > 0 ? (
          <table className="inspections-table">
            <thead>
              <tr>
                <th>GBM</th>
                <th>Data</th>
                <th>Status</th>
                <th>Conformidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentInspections.map(inspection => (
                <tr key={inspection.id}>
                  <td>{inspection.gbmName}</td>
                  <td>{new Date(inspection.dataInicio.toDate()).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <span className={`status-badge ${inspection.status === "Concluída" ? "completed" : "in-progress"}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td>
                    <div className="compliance-bar">
                      <div className="compliance-value" style={{width: `${inspection.conformidadeGeral || 0}%`}}></div>
                      <span>{inspection.conformidadeGeral || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => onViewInspection(inspection.id)} className="view-button">
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-inspections">Nenhuma inspeção realizada ainda.</p>
        )}
      </div>
    </div>
  );
}

// Componente Lista de Inspeções
function InspectionList({ inspections, onNewInspection, onViewInspection }) {
  const [filter, setFilter] = useState('');
  
  // Filtrar inspeções
  const filteredInspections = filter 
    ? inspections.filter(i => i.gbmName.toLowerCase().includes(filter.toLowerCase())) 
    : inspections;
  
  return (
    <div className="inspections-list">
      <div className="section-header">
        <h2>Inspeções</h2>
        <button onClick={onNewInspection} className="new-button">Nova Inspeção</button>
      </div>
      
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Filtrar por GBM..." 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          className="filter-input" 
        />
      </div>
      
      {filteredInspections.length > 0 ? (
        <table className="inspections-table">
          <thead>
            <tr>
              <th>GBM</th>
              <th>Data</th>
              <th>Status</th>
              <th>Conformidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.map(inspection => (
              <tr key={inspection.id}>
                <td>{inspection.gbmName}</td>
                <td>{new Date(inspection.dataInicio.toDate()).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span className={`status-badge ${inspection.status === "Concluída" ? "completed" : "in-progress"}`}>
                    {inspection.status}
                  </span>
                </td>
                <td>
                  <div className="compliance-bar">
                    <div className="compliance-value" style={{width: `${inspection.conformidadeGeral || 0}%`}}></div>
                    <span>{inspection.conformidadeGeral || 0}%</span>
                  </div>
                </td>
                <td>
                  <button onClick={() => onViewInspection(inspection.id)} className="view-button">
                    {inspection.status === "Em andamento" ? "Continuar" : "Visualizar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-inspections">Nenhuma inspeção encontrada.</p>
      )}
    </div>
  );
}

// Componente Nova Inspeção
function NewInspection({ gbmList, onCancel, onSelect, onStartInspection, selectedGBM }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar GBMs
  const filteredGBMs = searchTerm 
    ? gbmList.filter(gbm => gbm.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    : gbmList;
  
  return (
    <div className="new-inspection">
      <div className="section-header">
        <h2>Nova Inspeção</h2>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
      
      <div className="gbm-selection">
        <h3>Selecione o GBM para inspeção</h3>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar GBM..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="search-input" 
          />
        </div>
        
        <div className="gbm-list">
          {filteredGBMs.map(gbm => (
            <div 
              key={gbm.id} 
              className={`gbm-item ${selectedGBM === gbm.id ? 'selected' : ''}`}
              onClick={() => onSelect(gbm.id)}
            >
              <span>{gbm.name}</span>
              {selectedGBM === gbm.id && <span className="check-icon">✓</span>}
            </div>
          ))}
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={() => onStartInspection(selectedGBM)} 
            disabled={!selectedGBM} 
            className="start-button"
          >
            Iniciar Inspeção
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Detalhes da Inspeção
function InspectionDetails({ inspection, onBack, onUpdateItem, onFinalize }) {
  const [editingItem, setEditingItem] = useState(null);
  const [itemStatus, setItemStatus] = useState('');
  const [itemObservacao, setItemObservacao] = useState('');
  
  const handleEditItem = (sectionId, item) => {
    setEditingItem({ sectionId, itemId: item.id });
    setItemStatus(item.status);
    setItemObservacao(item.observacao || '');
  };
  
  const handleSaveItem = () => {
    onUpdateItem(editingItem.sectionId, editingItem.itemId, itemStatus, itemObservacao);
    setEditingItem(null);
  };
  
  const handleCancelEdit = () => {
    setEditingItem(null);
  };
  
  if (!inspection) return <LoadingScreen />;
  
  return (
    <div className="inspection-details">
      <div className="section-header">
        <h2>Detalhes da Inspeção</h2>
        <div className="header-actions">
          <button onClick={onBack} className="back-button">Voltar</button>
          {inspection.status === "Em andamento" && (
            <button onClick={onFinalize} className="finalize-button">Finalizar Inspeção</button>
          )}
        </div>
      </div>
      
      <div className="inspection-info">
        <div className="info-row">
          <div className="info-item">
            <span className="info-label">GBM:</span>
            <span className="info-value">{inspection.gbmName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data de Início:</span>
            <span className="info-value">{new Date(inspection.dataInicio.toDate()).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`status-badge ${inspection.status === "Concluída" ? "completed" : "in-progress"}`}>
              {inspection.status}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Conformidade Geral:</span>
            <div className="compliance-bar">
              <div className="compliance-value" style={{width: `${inspection.conformidadeGeral || 0}%`}}></div>
              <span>{inspection.conformidadeGeral || 0}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="inspection-sections">
        {inspection.sections.map(section => (
          <div key={section.id} className="inspection-section">
            <div className="section-title">
              <h3>{section.codigo} - {section.titulo}</h3>
              <div className="section-compliance">
                <span>{section.conformidade || 0}%</span>
                <div className="compliance-bar">
                  <div 
                    className="compliance-value" 
                    style={{width: `${section.conformidade || 0}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Status</th>
                  <th>Observação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.subsecaoId}.{item.codigo}</td>
                    <td>{item.descricao}</td>
                    <td>
                      {editingItem && editingItem.itemId === item.id ? (
                        <select 
                          value={itemStatus} 
                          onChange={e => setItemStatus(e.target.value)}
                          className="status-select"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Conforme">Conforme</option>
                          <option value="Não Conforme">Não Conforme</option>
                          <option value="Não Aplicável">Não Aplicável</option>
                        </select>
                      ) : (
                        <span className={`status-badge ${
                          item.status === "Conforme" ? "conforme" : 
                          item.status === "Não Conforme" ? "nao-conforme" : 
                          item.status === "Não Aplicável" ? "nao-aplicavel" : 
                          "pendente"
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingItem && editingItem.itemId === item.id ? (
                        <textarea 
                          value={itemObservacao} 
                          onChange={e => setItemObservacao(e.target.value)}
                          className="observation-textarea"
                          placeholder="Adicione uma observação..."
                        />
                      ) : (
                        <span>{item.observacao || "-"}</span>
                      )}
                    </td>
                    <td>
                      {inspection.status === "Em andamento" && (
                        editingItem && editingItem.itemId === item.id ? (
                          <div className="item-actions">
                            <button onClick={handleSaveItem} className="save-button">Salvar</button>
                            <button onClick={handleCancelEdit} className="cancel-button">Cancelar</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleEditItem(section.id, item)} 
                            className="edit-button"
                          >
                            Editar
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Relatórios
function Reports({ inspections }) {
  // Calcular conformidade por GBM
  const gbmCompliance = {};
  inspections.forEach(inspection => {
    if (inspection.gbmName && inspection.conformidadeGeral !== undefined) {
      if (!gbmCompliance[inspection.gbmName]) {
        gbmCompliance[inspection.gbmName] = {
          total: 0,
          count: 0
        };
      }
      gbmCompliance[inspection.gbmName].total += inspection.conformidadeGeral;
      gbmCompliance[inspection.gbmName].count += 1;
    }
  });
  
  const gbmComplianceList = Object.keys(gbmCompliance).map(gbm => ({
    gbm,
    compliance: Math.round(gbmCompliance[gbm].total / gbmCompliance[gbm].count)
  })).sort((a, b) => b.compliance - a.compliance);
  
  return (
    <div className="reports">
      <h2>Relatórios</h2>
      
      <div className="report-section">
        <h3>Conformidade por GBM</h3>
        
        {gbmComplianceList.length > 0 ? (
          <div className="compliance-chart">
            {gbmComplianceList.map(item => (
              <div key={item.gbm} className="chart-item">
                <div className="chart-label">{item.gbm}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{width: `${item.compliance}%`}}
                  ></div>
                  <span className="chart-value">{item.compliance}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Não há dados suficientes para análise.</p>
        )}
      </div>
      
      <div className="export-section">
        <h3>Exportar Relatórios</h3>
        <div className="export-buttons">
          <button className="export-button">Exportar para Excel</button>
          <button className="export-button">Exportar para PDF</button>
        </div>
      </div>
    </div>
  );
}

export default App;
