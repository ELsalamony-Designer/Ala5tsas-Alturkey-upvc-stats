import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const customersCollection = collection(db, "customers");
const tableBody = document.getElementById("tableBody");

// تحميل البيانات وعرضها في الجدول
async function loadData() {
  tableBody.innerHTML = "";

  const q = query(customersCollection, orderBy("code", "asc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.code}</td>
      <td>${data.name}</td>
      <td>${data.phone}</td>
      <td><img src="${data.offer}" alt="عرض السعر" /></td>
      <td><img src="${data.drawing}" alt="رسومات" /></td>
      <td>
        <button onclick="goToContract(${data.code})">📄 عقد</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// عند الضغط على زر تأكيد
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const offerURL = document.getElementById("offerImg").value.trim();
  const drawingURL = document.getElementById("drawingImg").value.trim();

  if (!name || !phone || !offerURL || !drawingURL) {
    alert("من فضلك املأ كل الحقول.");
    return;
  }

  try {
    const snapshot = await getDocs(customersCollection);
    const code = snapshot.size + 1;

    await setDoc(doc(db, "customers", code.toString()), {
      code,
      name,
      phone,
      offer: offerURL,
      drawing: drawingURL
    });

    alert("✅ تم حفظ البيانات بنجاح!");
    location.reload();
  } catch (error) {
    console.error("❌ خطأ أثناء حفظ البيانات:", error);
    alert("حدث خطأ أثناء حفظ البيانات. تأكد من الاتصال بالإنترنت وصلاحيات Firestore.");
  }
});

// تحويل لصفحة العقد
window.goToContract = function(code) {
  localStorage.setItem("contractCode", code);
  window.location.href = "contract.html";
};

// تحميل البيانات عند فتح الصفحة
loadData();
