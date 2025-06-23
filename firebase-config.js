// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFfikBhlWhcMUK50w3-GvaanceJjuQSBs",
  authDomain: "ala5tsas-alturkey-stats-56299.firebaseapp.com",
  databaseURL: "https://ala5tsas-alturkey-stats-56299-default-rtdb.firebaseio.com",
  projectId: "ala5tsas-alturkey-stats-56299",
  storageBucket: "ala5tsas-alturkey-stats-56299.appspot.com",
  messagingSenderId: "432379375706",
  appId: "1:432379375706:web:843fc3cb6c445c56a3a863",
  measurementId: "G-CHYVT4EYFL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, database, storage };
