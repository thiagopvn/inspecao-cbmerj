import React, { useState, useEffect } from 'react';

// Componente de Carregamento
export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

// Componente de Erro
export function ErrorMessage({ message, onClose }) {
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
export function Layout({ children, currentPage, onNavigate, onLogout, userName }) {
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
                <button onClick={() => onNavigate('dashboard')}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9"></rect>
                    <rect x="14" y="3" width="7" height="5"></rect>
                    <rect x="14" y="12" width="7" height="9"></rect>
                    <rect x="3" y="16" width="7" height="5"></rect>
                  </svg>
                  Dashboard
                </button>
              </li>
              <li className={currentPage === 'inspections' || currentPage === 'new-inspection' || currentPage === 'inspection-details' ? 'active' : ''}>
                <button onClick={() => onNavigate('inspections')}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Inspeções
                </button>
              </li>
              <li className={currentPage === 'reports' ? 'active' : ''}>
                <button onClick={() => onNavigate('reports')}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Relatórios
                </button>
              </li>
              <li className={currentPage === 'gbm-management' ? 'active' : ''}>
                <button onClick={() => onNavigate('gbm-management')}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Gerenciamento de GBMs
                </button>
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
export function LoginScreen({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-demo">
          <p>Para demonstração: email = "admin@cbmerj.gov.br", senha = "123456"</p>
        </div>
      </div>
    </div>
  );
}

// Componente StatCard utilizado no Dashboard
export function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

// Componente de Barra de Progresso/Conformidade
export function ComplianceBar({ value }) {
  // Definir a cor baseada no valor
  const getColor = () => {
    if (value >= 85) return 'compliance-high';
    if (value >= 70) return 'compliance-medium';
    return 'compliance-low';
  };
  
  return (
    <div className="compliance-bar">
      <div 
        className={`compliance-value ${getColor()}`} 
        style={{ width: `${value}%` }}
      ></div>
      <span className="compliance-text">{value}%</span>
    </div>
  );
}

// Componente Badge de Status
export function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case 'Concluída':
        return 'status-completed';
      case 'Em andamento':
        return 'status-in-progress';
      case 'Conforme':
        return 'status-conforme';
      case 'Não Conforme':
        return 'status-nao-conforme';
      case 'Não Aplicável':
        return 'status-nao-aplicavel';
      case 'Pendente':
        return 'status-pendente';
      default:
        return '';
    }
  };
  
  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
}

// Componente Dashboard
export function Dashboard({ inspections, onNewInspection, onViewInspection }) {
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
        <StatCard 
          title="Total de Inspeções" 
          value={totalInspections}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          }
        />
        <StatCard 
          title="Concluídas" 
          value={completedInspections}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          }
        />
        <StatCard 
          title="Em Andamento" 
          value={inProgressInspections}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
          }
        />
        <StatCard 
          title="Conformidade Média" 
          value={`${averageCompliance}%`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          }
        />
      </div>
      
      <div className="recent-inspections">
        <div className="section-header">
          <h3>Inspeções Recentes</h3>
          <button onClick={() => onNewInspection()} className="btn btn-primary">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nova Inspeção
          </button>
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
                    <StatusBadge status={inspection.status} />
                  </td>
                  <td>
                    <ComplianceBar value={inspection.conformidadeGeral || 0} />
                  </td>
                  <td>
                    <button onClick={() => onViewInspection(inspection.id)} className="btn btn-secondary">
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <p>Nenhuma inspeção realizada ainda.</p>
            <button onClick={onNewInspection} className="btn btn-primary">Iniciar Primeira Inspeção</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente Lista de Inspeções
export function InspectionList({ inspections, onNewInspection, onViewInspection }) {
  const [filter, setFilter] = useState('');
  
  // Filtrar inspeções
  const filteredInspections = filter 
    ? inspections.filter(i => i.gbmName.toLowerCase().includes(filter.toLowerCase())) 
    : inspections;
  
  return (
    <div className="inspections-list">
      <div className="section-header">
        <h2>Inspeções</h2>
        <button onClick={onNewInspection} className="btn btn-primary">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nova Inspeção
        </button>
      </div>
      
      <div className="filter-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Filtrar por GBM..." 
            value={filter} 
            onChange={e => setFilter(e.target.value)} 
            className="filter-input" 
          />
          {filter && (
            <button 
              className="clear-filter" 
              onClick={() => setFilter('')}
              aria-label="Limpar filtro"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
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
                  <StatusBadge status={inspection.status} />
                </td>
                <td>
                  <ComplianceBar value={inspection.conformidadeGeral || 0} />
                </td>
                <td>
                  <button 
                    onClick={() => onViewInspection(inspection.id)} 
                    className="btn btn-secondary"
                  >
                    {inspection.status === "Em andamento" ? (
                      <>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Continuar
                      </>
                    ) : (
                      <>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Visualizar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          {filter ? (
            <p>Nenhuma inspeção encontrada com o filtro aplicado.</p>
          ) : (
            <p>Nenhuma inspeção realizada ainda.</p>
          )}
          {!filter && (
            <button onClick={onNewInspection} className="btn btn-primary">Iniciar Primeira Inspeção</button>
          )}
        </div>
      )}
    </div>
  );
}

// Componente Nova Inspeção - ATUALIZADO
export function NewInspection({ gbmList, onCancel, onSelect, onStartInspection, selectedGBM, isLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar GBMs
  const filteredGBMs = searchTerm 
    ? gbmList.filter(gbm => gbm.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    : gbmList;
  
  return (
    <div className="new-inspection">
      <div className="section-header">
        <h2>Nova Inspeção</h2>
        <button onClick={onCancel} className="btn btn-secondary">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Cancelar
        </button>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>Selecione o GBM para inspeção</h3>
        </div>
        
        <div className="card-body">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Buscar GBM..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="search-input" 
              />
              {searchTerm && (
                <button 
                  className="clear-filter" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpar busca"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="gbm-list">
            {filteredGBMs.length > 0 ? (
              filteredGBMs.map(gbm => (
                <div 
                  key={gbm.id} 
                  className={`gbm-item ${selectedGBM === gbm.id ? 'selected' : ''}`}
                  onClick={() => onSelect(gbm.id)}
                >
                  <svg className="gbm-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>{gbm.name}</span>
                  {selectedGBM === gbm.id && (
                    <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Nenhum GBM encontrado com o termo "{searchTerm}".</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card-footer">
          <button 
            onClick={() => onStartInspection(selectedGBM)} 
            disabled={!selectedGBM || isLoading} 
            className="btn btn-primary"
          >
            {isLoading ? (
              <>
                <div className="spinner-small"></div>
                Criando Inspeção...
              </>
            ) : (
              <>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Iniciar Inspeção
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


// Componente Detalhes da Inspeção
export function InspectionDetails({ inspection, onBack, onUpdateItem, onFinalize }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [itemStatus, setItemStatus] = useState('');
  const [itemObservacao, setItemObservacao] = useState('');
  
  useEffect(() => {
    // Inicializar todas as seções como expandidas
    if (inspection && inspection.sections) {
      const initialExpandedState = {};
      inspection.sections.forEach(section => {
        initialExpandedState[section.id] = true;
      });
      setExpandedSections(initialExpandedState);
    }
  }, [inspection]);
  
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
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
          <button onClick={onBack} className="btn btn-secondary">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar
          </button>
          {inspection.status === "Em andamento" && (
            <button onClick={onFinalize} className="btn btn-primary">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Finalizar Inspeção
            </button>
          )}
        </div>
      </div>
      
      <div className="inspection-info-card">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">GBM:</span>
            <span className="info-value">{inspection.gbmName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data de Início:</span>
            <span className="info-value">{new Date(inspection.dataInicio.toDate()).toLocaleDateString('pt-BR')}</span>
          </div>
          {inspection.dataFim && (
            <div className="info-item">
              <span className="info-label">Data de Conclusão:</span>
              <span className="info-value">{new Date(inspection.dataFim.toDate()).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
          <div className="info-item">
            <span className="info-label">Status:</span>
            <StatusBadge status={inspection.status} />
          </div>
          <div className="info-item">
            <span className="info-label">Inspetor:</span>
            <span className="info-value">{inspection.inspetorName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Conformidade Geral:</span>
            <ComplianceBar value={inspection.conformidadeGeral || 0} />
          </div>
        </div>
      </div>
      
      <div className="inspection-sections">
        {inspection.sections.map(section => (
          <div key={section.id} className="inspection-section-card">
            <div 
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-title">
                <svg 
                  className={`chevron-icon ${expandedSections[section.id] ? 'expanded' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <h3>{section.codigo} - {section.titulo}</h3>
              </div>
              <div className="section-compliance">
                <span>{section.conformidade || 0}%</span>
                <div className="mini-compliance-bar">
                  <div 
                    className={`mini-compliance-value ${
                      section.conformidade >= 85 ? 'high' : 
                      section.conformidade >= 70 ? 'medium' : 'low'
                    }`}
                    style={{width: `${section.conformidade || 0}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            {expandedSections[section.id] && (
              <div className="section-content">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Descrição</th>
                      <th>Status</th>
                      <th>Observação</th>
                      {inspection.status === "Em andamento" && <th>Ações</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map(item => (
                      <tr key={item.id}>
                        <td className="item-code">{item.subsecaoId}.{item.codigo}</td>
                        <td className="item-description">{item.descricao}</td>
                        <td className="item-status">
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
                            <StatusBadge status={item.status} />
                          )}
                        </td>
                        <td className="item-observation">
                          {editingItem && editingItem.itemId === item.id ? (
                            <textarea 
                              value={itemObservacao} 
                              onChange={e => setItemObservacao(e.target.value)}
                              className="observation-textarea"
                              placeholder="Adicione uma observação..."
                              rows={3}
                            />
                          ) : (
                            <span>{item.observacao || "-"}</span>
                          )}
                        </td>
                        {inspection.status === "Em andamento" && (
                          <td className="item-actions">
                            {editingItem && editingItem.itemId === item.id ? (
                              <div className="action-buttons">
                                <button onClick={handleSaveItem} className="btn btn-sm btn-success">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  Salvar
                                </button>
                                <button onClick={handleCancelEdit} className="btn btn-sm btn-danger">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleEditItem(section.id, item)} 
                                className="btn btn-sm btn-secondary"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Editar
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Relatórios
export function Reports({ inspections }) {
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
  
  // Estatísticas gerais
  const totalInspections = inspections.length;
  const completedInspections = inspections.filter(i => i.status === "Concluída").length;
  const avgCompliance = totalInspections > 0 
    ? Math.round(inspections.reduce((sum, i) => sum + (i.conformidadeGeral || 0), 0) / totalInspections) 
    : 0;
  
  return (
    <div className="reports">
      <h2>Relatórios</h2>
      
      <div className="stats-container">
        <StatCard 
          title="Total de Inspeções" 
          value={totalInspections}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          }
        />
        <StatCard 
          title="Inspeções Concluídas" 
          value={completedInspections}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          }
        />
        <StatCard 
          title="Conformidade Média" 
          value={`${avgCompliance}%`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          }
        />
      </div>
      
      <div className="report-section-card">
        <div className="card-header">
          <h3>Conformidade por GBM</h3>
        </div>
        
        <div className="card-body">
          {gbmComplianceList.length > 0 ? (
            <div className="compliance-chart">
              {gbmComplianceList.map(item => (
                <div key={item.gbm} className="chart-item">
                  <div className="chart-label">{item.gbm}</div>
                  <div className="chart-bar-container">
                    <div 
                      className={`chart-bar ${
                        item.compliance >= 85 ? 'high' : 
                        item.compliance >= 70 ? 'medium' : 'low'
                      }`}
                      style={{width: `${item.compliance}%`}}
                    ></div>
                    <span className="chart-value">{item.compliance}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <p>Não há dados suficientes para análise.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="report-section-card">
        <div className="card-header">
          <h3>Exportar Relatórios</h3>
        </div>
        <div className="card-body">
          <p className="export-description">
            Selecione uma opção para exportar os dados das inspeções.
          </p>
          <div className="export-buttons">
            <button className="btn btn-secondary">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <rect x="8" y="12" width="8" height="2"></rect>
                <rect x="8" y="16" width="8" height="2"></rect>
                <path d="M10 8H8"></path>
              </svg>
              Exportar para Excel
            </button>
            <button className="btn btn-secondary">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M9 13h6"></path>
                <path d="M9 17h6"></path>
                <path d="M9 9h1"></path>
              </svg>
              Exportar para PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}