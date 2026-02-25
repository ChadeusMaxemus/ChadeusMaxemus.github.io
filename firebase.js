import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMPJxyL0RNE5httHgw1t5oapNQqk8CrT4",
  authDomain: "climbing-competition-ranking.firebaseapp.com",
  projectId: "climbing-competition-ranking",
  storageBucket: "climbing-competition-ranking.firebasestorage.app",
  messagingSenderId: "767948937718",
  appId: "1:767948937718:web:78ea65f1f206f75bf7cfd7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);