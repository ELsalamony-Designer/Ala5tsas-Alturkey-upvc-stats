import { db } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const customersCollection = collection(db, "customers");
const tableBody = document.getElementById("tableBody");

async function loadData() {
  tableBody.innerHTML = "";
  const q = query(customersCollection, orderBy("code", "asc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.code}</td>
      <td>${data.name}</td>
      <td>${data.phone}</td>
      <td><img src="${data.offer}" /></td>
      <td><img src="${data.drawing}" /></td>
      <td><button onclick="goToContract(${data.code})">📄 عقد</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const offerURL = document.getElementById("offerImg").value;
  const drawingURL = document.getElementById("drawingImg").value;

  const snapshot = await getDocs(customersCollection);
  const code = snapshot.size + 1;

  await addDoc(customersCollection, {
    code,
    name,
    phone,
    offer: offerURL,
    drawing: drawingURL
  });

  alert("تمت الإضافة!");
  location.reload();
});

window.goToContract = function(code) {
  localStorage.setItem("contractCode", code);
  window.location.href = "contract.html";
};

loadData();
