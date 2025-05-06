import React, { useState, useEffect } from 'react';
import { 
  getAllGBMsFromFirestore, 
  addGBM, 
  updateGBM, 
  deleteGBM,
  migrateGBMsToFirestore
} from './firebase';
import { gbmList } from './data'; // Importando a lista estática para migração inicial

// Componente GBMManagement
function GBMManagement() {
  const [gbms, setGbms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  
  // Estados para o formulário de GBM
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentGBM, setCurrentGBM] = useState({
    numeroGBM: '',
    nome: '',
    endereco: ''
  });
  
  // Buscar GBMs do Firestore
  const fetchGBMs = async () => {
    try {
      setLoading(true);
      const gbmsData = await getAllGBMsFromFirestore();
      
      // Se não houver GBMs no Firestore, migrar da lista estática
      if (gbmsData.length === 0) {
        await migrateGBMsToFirestore(gbmList);
        const migratedGBMs = await getAllGBMsFromFirestore();
        setGbms(migratedGBMs);
      } else {
        setGbms(gbmsData);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar GBMs:", error);
      setError("Não foi possível carregar os GBMs. Tente novamente mais tarde.");
      setLoading(false);
    }
  };
  
  // Carregar GBMs ao montar o componente
  useEffect(() => {
    fetchGBMs();
  }, []);
  
  // Filtrar GBMs
  const filteredGBMs = filter 
    ? gbms.filter(gbm => 
        gbm.nome.toLowerCase().includes(filter.toLowerCase()) || 
        String(gbm.numeroGBM).includes(filter))
    : gbms;
  
  // Resetar o formulário
  const resetForm = () => {
    setCurrentGBM({
      numeroGBM: '',
      nome: '',
      endereco: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };
  
  // Manipular alterações no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGBM({
      ...currentGBM,
      [name]: value
    });
  };
  
  // Iniciar edição de um GBM
  const handleEdit = (gbm) => {
    setCurrentGBM({
      id: gbm.id,
      numeroGBM: gbm.numeroGBM,
      nome: gbm.nome,
      endereco: gbm.endereco || ''
    });
    setIsEditing(true);
    setShowForm(true);
  };
  
  // Iniciar criação de um novo GBM
  const handleNew = () => {
    resetForm();
    setShowForm(true);
  };
  
  // Salvar GBM (adicionar ou atualizar)
  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validar dados
      if (!currentGBM.numeroGBM || !currentGBM.nome) {
        setError("Por favor, preencha o número e o nome do GBM.");
        setLoading(false);
        return;
      }
      
      if (isEditing) {
        // Atualizar GBM existente
        const { id, ...gbmData } = currentGBM;
        await updateGBM(id, gbmData);
      } else {
        // Adicionar novo GBM
        await addGBM(currentGBM);
      }
      
      // Recarregar GBMs
      await fetchGBMs();
      resetForm();
      setError(null);
    } catch (error) {
      console.error("Erro ao salvar GBM:", error);
      setError(`Erro ao salvar GBM: ${error.message}`);
      setLoading(false);
    }
  };
  
  // Excluir GBM
  const handleDelete = async (gbmId) => {
    if (!window.confirm("Tem certeza que deseja excluir este GBM?")) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteGBM(gbmId);
      await fetchGBMs();
      setError(null);
    } catch (error) {
      console.error("Erro ao excluir GBM:", error);
      setError(`Erro ao excluir GBM: ${error.message}`);
      setLoading(false);
    }
  };
  
  return (
    <div className="gbm-management">
      <div className="section-header">
        <h2>Gerenciamento de GBMs</h2>
        <button onClick={handleNew} className="btn btn-primary">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Novo GBM
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="close-button">×</button>
        </div>
      )}
      
      {showForm && (
        <div className="card form-card">
          <div className="card-header">
            <h3>{isEditing ? 'Editar GBM' : 'Novo GBM'}</h3>
            <button onClick={resetForm} className="btn-close">×</button>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="numeroGBM">Número do GBM</label>
                <input
                  type="number"
                  id="numeroGBM"
                  name="numeroGBM"
                  value={currentGBM.numeroGBM}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nome">Nome do GBM</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={currentGBM.nome}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endereco">Endereço</label>
                <textarea
                  id="endereco"
                  name="endereco"
                  value={currentGBM.endereco}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="filter-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Filtrar GBMs..." 
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
      
      {loading && !showForm ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando GBMs...</p>
        </div>
      ) : (
        filteredGBMs.length > 0 ? (
          <table className="gbm-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredGBMs.map(gbm => (
                <tr key={gbm.id}>
                  <td>{gbm.numeroGBM}</td>
                  <td>{gbm.nome}</td>
                  <td>{gbm.endereco || "-"}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleEdit(gbm)} 
                      className="btn btn-sm btn-secondary"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(gbm.id)} 
                      className="btn btn-sm btn-danger"
                      title="Excluir"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <p>{filter ? "Nenhum GBM encontrado com o filtro aplicado." : "Nenhum GBM cadastrado ainda."}</p>
            {!filter && (
              <button onClick={handleNew} className="btn btn-primary">Adicionar Primeiro GBM</button>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default GBMManagement;