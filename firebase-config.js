// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC15Rb8pukWGcdDlmgEig8YGiIG27RGxJc",
  authDomain: "aaus-654c4.firebaseapp.com",
  databaseURL: "https://aaus-654c4-default-rtdb.firebaseio.com",
  projectId: "aaus-654c4",
  storageBucket: "aaus-654c4.appspot.com",
  messagingSenderId: "976513022962",
  appId: "1:976513022962:web:35f5ec4acfa0efef6e896b",
  measurementId: "G-FLCXMFYSJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export needed services
export const database = getDatabase(app);
export const storage = getStorage(app);
