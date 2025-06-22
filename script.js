import { db, storage } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

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
      <td>
        <button onclick="goToContract(${data.code})">📄 عقد</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const offerFile = document.getElementById("offerImg").files[0];
  const drawingFile = document.getElementById("drawingImg").files[0];

  const snapshot = await getDocs(customersCollection);
  const code = snapshot.size + 1;

  const offerRef = ref(storage, `offers/offer_${code}.jpg`);
  const drawingRef = ref(storage, `drawings/drawing_${code}.jpg`);

  await uploadBytes(offerRef, offerFile);
  await uploadBytes(drawingRef, drawingFile);

  const offerURL = await getDownloadURL(offerRef);
  const drawingURL = await getDownloadURL(drawingRef);

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
