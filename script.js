import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const tableBody = document.getElementById("tableBody");
const customersCollection = collection(db, "customers");

async function loadData() {
  tableBody.innerHTML = "";
  const snapshot = await getDocs(customersCollection);
  snapshot.forEach((doc, i) => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td contenteditable>${data.name}</td>
      <td contenteditable>${data.phone}</td>
      <td contenteditable>${data.offer}</td>
      <td contenteditable>${data.drawing}</td>
      <td>
        <button onclick="confirm(${i})">✅</button>
        <button onclick="edit(${i})">✏️</button>
        <button onclick="contract(${i})">📄</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}
loadData();

// (تعديل، تأكيد، عقد لسه هنكملهم لاحقًا حسب تخزينك)
