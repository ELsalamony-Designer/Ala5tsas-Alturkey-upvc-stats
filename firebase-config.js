// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgOby-sJuIUs8iCErmqtiMbqMuND5ZtCo",
  authDomain: "ala5tsas-alturkey-stats.firebaseapp.com",
  projectId: "ala5tsas-alturkey-stats",
  storageBucket: "ala5tsas-alturkey-stats.appspot.com",
  messagingSenderId: "649675735929",
  appId: "1:649675735929:web:f90a49614895c6958ea5a8",
  measurementId: "G-X2FHKZT21J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
