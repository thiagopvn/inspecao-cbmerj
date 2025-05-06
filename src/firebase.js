// Import required Firebase services
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
  orderBy,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';

// Configuração do Firebase fornecida pelo usuário
const firebaseConfig = {
    apiKey: "AIzaSyDlTmgi_YLgjv0qkb-7LraNHAcp15lksUw",
    authDomain: "inspecao-cbmerj.firebaseapp.com",
    projectId: "inspecao-cbmerj",
    storageBucket: "inspecao-cbmerj.firebasestorage.app",
    messagingSenderId: "249073941601",
    appId: "1:249073941601:web:2ae450c26213ab2ce87e20",
    measurementId: "G-7EFXNTJJZQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Authentication Functions
/**
 * Login with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error in logout:", error);
    throw error;
  }
};

/**
 * Create a new user account
 * @param {string} email 
 * @param {string} password 
 * @param {string} displayName 
 * @returns {Promise<UserCredential>}
 */
export const createUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore
    await addDoc(collection(db, "usuarios"), {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      role: "inspetor", // Default role
      createdAt: serverTimestamp()
    });
    
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Get current user state
 * @param {function} callback - Function to call when auth state changes
 * @returns {function} - Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// GBM Operations
/**
 * Get all GBM units
 * @returns {Promise<Array>} - Array of GBM objects
 */
export const getAllGBMs = async () => {
  try {
    const q = query(collection(db, "gbms"), orderBy("nome"));
    const querySnapshot = await getDocs(q);
    
    const gbms = [];
    querySnapshot.forEach(doc => {
      gbms.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return gbms;
  } catch (error) {
    console.error("Error getting GBMs:", error);
    throw error;
  }
};

/**
 * Get a specific GBM by id
 * @param {string} gbmId - GBM document ID
 * @returns {Promise<Object>} - GBM data
 */
export const getGBMById = async (gbmId) => {
  try {
    const docRef = doc(db, "gbms", gbmId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("GBM not found");
    }
  } catch (error) {
    console.error("Error getting GBM:", error);
    throw error;
  }
};

// Inspection Operations
/**
 * Create a new inspection
 * @param {Object} inspectionData - Inspection data
 * @returns {Promise<string>} - ID of created inspection
 */
export const createInspection = async (inspectionData) => {
  try {
    const docRef = await addDoc(collection(db, "inspecoes"), {
      ...inspectionData,
      dataInicio: Timestamp.now(),
      status: "Em andamento",
      conformidadeGeral: 0,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating inspection:", error);
    throw error;
  }
};

/**
 * Get all inspections
 * @returns {Promise<Array>} - Array of inspection objects
 */
export const getAllInspections = async () => {
  try {
    const q = query(collection(db, "inspecoes"), orderBy("dataInicio", "desc"));
    const querySnapshot = await getDocs(q);
    
    const inspections = [];
    querySnapshot.forEach(doc => {
      inspections.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return inspections;
  } catch (error) {
    console.error("Error getting inspections:", error);
    throw error;
  }
};

/**
 * Get inspections filtered by user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of inspection objects
 */
export const getUserInspections = async (userId) => {
  try {
    const q = query(
      collection(db, "inspecoes"), 
      where("inspetorId", "==", userId),
      orderBy("dataInicio", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const inspections = [];
    querySnapshot.forEach(doc => {
      inspections.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return inspections;
  } catch (error) {
    console.error("Error getting user inspections:", error);
    throw error;
  }
};

/**
 * Get a specific inspection by id
 * @param {string} inspectionId - Inspection document ID
 * @returns {Promise<Object>} - Inspection data with sections
 */
export const getInspectionById = async (inspectionId) => {
  try {
    // Get inspection document
    const inspectionRef = doc(db, "inspecoes", inspectionId);
    const inspectionSnap = await getDoc(inspectionRef);
    
    if (!inspectionSnap.exists()) {
      throw new Error("Inspection not found");
    }
    
    const inspection = {
      id: inspectionSnap.id,
      ...inspectionSnap.data(),
      sections: []
    };
    
    // Get sections
    const sectionsQuery = query(collection(db, "inspecoes", inspectionId, "secoes"));
    const sectionsSnap = await getDocs(sectionsQuery);
    
    // Process each section
    for (const sectionDoc of sectionsSnap.docs) {
      const section = {
        id: sectionDoc.id,
        ...sectionDoc.data(),
        items: []
      };
      
      // Get items for this section
      const itemsQuery = query(collection(db, "inspecoes", inspectionId, "secoes", sectionDoc.id, "itens"));
      const itemsSnap = await getDocs(itemsQuery);
      
      // Add items to section
      itemsSnap.forEach(itemDoc => {
        section.items.push({
          id: itemDoc.id,
          ...itemDoc.data()
        });
      });
      
      inspection.sections.push(section);
    }
    
    return inspection;
  } catch (error) {
    console.error("Error getting inspection:", error);
    throw error;
  }
};

/**
 * Add a section to an inspection
 * @param {string} inspectionId - Inspection ID
 * @param {Object} sectionData - Section data
 * @returns {Promise<string>} - ID of created section
 */
export const addSectionToInspection = async (inspectionId, sectionData) => {
  try {
    const sectionRef = await addDoc(
      collection(db, "inspecoes", inspectionId, "secoes"), 
      {
        ...sectionData,
        createdAt: serverTimestamp()
      }
    );
    return sectionRef.id;
  } catch (error) {
    console.error("Error adding section:", error);
    throw error;
  }
};

/**
 * Add an item to a section
 * @param {string} inspectionId - Inspection ID
 * @param {string} sectionId - Section ID
 * @param {Object} itemData - Item data
 * @returns {Promise<string>} - ID of created item
 */
export const addItemToSection = async (inspectionId, sectionId, itemData) => {
  try {
    const itemRef = await addDoc(
      collection(db, "inspecoes", inspectionId, "secoes", sectionId, "itens"), 
      {
        ...itemData,
        createdAt: serverTimestamp()
      }
    );
    return itemRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

/**
 * Update an item status and observation
 * @param {string} inspectionId - Inspection ID
 * @param {string} sectionId - Section ID
 * @param {string} itemId - Item ID
 * @param {string} status - New status
 * @param {string} observacao - Observation text
 * @returns {Promise<boolean>} - Success indicator
 */
export const updateInspectionItem = async (inspectionId, sectionId, itemId, status, observacao) => {
  try {
    // Update the item
    const itemRef = doc(db, "inspecoes", inspectionId, "secoes", sectionId, "itens", itemId);
    await updateDoc(itemRef, {
      status,
      observacao,
      updatedAt: serverTimestamp()
    });
    
    // Recalculate section compliance
    await recalculateSectionCompliance(inspectionId, sectionId);
    
    // Recalculate overall compliance
    await recalculateInspectionCompliance(inspectionId);
    
    return true;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

/**
 * Finalize inspection
 * @param {string} inspectionId - Inspection ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const finalizeInspection = async (inspectionId) => {
  try {
    const inspectionRef = doc(db, "inspecoes", inspectionId);
    await updateDoc(inspectionRef, {
      status: "Concluída",
      dataFim: Timestamp.now(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error finalizing inspection:", error);
    throw error;
  }
};

// Helper Functions
/**
 * Recalculate section compliance percentage
 * @param {string} inspectionId - Inspection ID
 * @param {string} sectionId - Section ID
 * @returns {Promise<number>} - Compliance percentage
 */
const recalculateSectionCompliance = async (inspectionId, sectionId) => {
  try {
    // Get all items for the section
    const itemsQuery = query(collection(db, "inspecoes", inspectionId, "secoes", sectionId, "itens"));
    const itemsSnap = await getDocs(itemsQuery);
    
    let totalItems = 0;
    let conformeItems = 0;
    
    // Count items and conforming items
    itemsSnap.forEach(doc => {
      const item = doc.data();
      if (item.status !== "Não Aplicável") {
        totalItems++;
        if (item.status === "Conforme") {
          conformeItems++;
        }
      }
    });
    
    // Calculate compliance percentage
    const compliancePercentage = totalItems > 0 ? Math.round((conformeItems / totalItems) * 100) : 0;
    
    // Update section compliance
    const sectionRef = doc(db, "inspecoes", inspectionId, "secoes", sectionId);
    await updateDoc(sectionRef, {
      conformidade: compliancePercentage,
      updatedAt: serverTimestamp()
    });
    
    return compliancePercentage;
  } catch (error) {
    console.error("Error recalculating section compliance:", error);
    throw error;
  }
};

/**
 * Recalculate overall inspection compliance
 * @param {string} inspectionId - Inspection ID
 * @returns {Promise<number>} - Overall compliance percentage
 */
const recalculateInspectionCompliance = async (inspectionId) => {
  try {
    // Get all sections
    const sectionsQuery = query(collection(db, "inspecoes", inspectionId, "secoes"));
    const sectionsSnap = await getDocs(sectionsQuery);
    
    let totalCompliance = 0;
    let sectionCount = 0;
    
    // Sum section compliances
    sectionsSnap.forEach(doc => {
      const section = doc.data();
      totalCompliance += section.conformidade || 0;
      sectionCount++;
    });
    
    // Calculate overall compliance
    const overallCompliance = sectionCount > 0 ? Math.round(totalCompliance / sectionCount) : 0;
    
    // Update inspection compliance
    const inspectionRef = doc(db, "inspecoes", inspectionId);
    await updateDoc(inspectionRef, {
      conformidadeGeral: overallCompliance,
      updatedAt: serverTimestamp()
    });
    
    return overallCompliance;
  } catch (error) {
    console.error("Error recalculating inspection compliance:", error);
    throw error;
  }
};

// Export Firebase instances and functions
export {
  auth,
  db,
  analytics
};