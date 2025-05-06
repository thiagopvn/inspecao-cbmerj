import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { 
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

// Importar componentes do arquivo components.jsx
import { 
  LoadingScreen,
  ErrorMessage,
  Layout, // Mantenha apenas esta importação do Layout
  LoginScreen,
  Dashboard,
  InspectionList,
  NewInspection,
  InspectionDetails,
  Reports
} from './components';

// Importar o componente de gerenciamento de GBMs
import GBMManagement from './GBMManagement';

// Importar configuração e serviços do Firebase do arquivo firebase.js
import { 
  auth, 
  db, 
  loginWithEmailAndPassword, 
  logoutUser,
  getAllGBMsFromFirestore 
} from './firebase';

// Importar dados estáticos
import { gbmList, inspectionData } from './data';

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
  const [firebaseGBMs, setFirebaseGBMs] = useState([]);

  // Verificar estado de autenticação ao carregar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
      if (user) {
        setCurrentPage('dashboard');
        fetchInspections();
        fetchGBMs();
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Buscar GBMs do Firestore
  const fetchGBMs = async () => {
    try {
      const gbmsData = await getAllGBMsFromFirestore();
      setFirebaseGBMs(gbmsData);
    } catch (error) {
      console.error("Erro ao buscar GBMs:", error);
    }
  };

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

  // Função de login utilizando a função do firebase.js
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      await loginWithEmailAndPassword(email, password);
      // Se chegar aqui, o login foi bem-sucedido
      setError(null);
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Falha no login. Verifique suas credenciais e tente novamente.");
      setLoading(false);
    }
  };

  // Função de logout utilizando a função do firebase.js
  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentPage('login');
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  // Iniciar nova inspeção
  const startNewInspection = async (gbmId) => {
    try {
      // Usar GBMs do Firestore se disponíveis, senão usar a lista estática
      let gbmData;
      if (firebaseGBMs.length > 0) {
        gbmData = firebaseGBMs.find(g => g.numeroGBM === parseInt(gbmId));
      }
      
      if (!gbmData) {
        // Fallback para a lista estática
        gbmData = gbmList.find(g => g.id === gbmId);
      }
      
      const inspectionRef = await addDoc(collection(db, "inspecoes"), {
        gbmId: gbmId,
        gbmName: gbmData ? (gbmData.nome || gbmData.name) : `GBM ${gbmId}`,
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
          gbmList={firebaseGBMs.length > 0 ? firebaseGBMs.map(g => ({ id: g.numeroGBM, name: g.nome })) : gbmList} 
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
      case 'gbm-management':
        return <GBMManagement onGBMsUpdated={fetchGBMs} />;
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

export default App;