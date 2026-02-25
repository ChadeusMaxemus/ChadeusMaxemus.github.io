import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

/* Number of boulders shown */
const BOULDERS = 10;

/* Generate UI */
const container = document.getElementById("boulderContainer");

for(let i=1;i<=BOULDERS;i++){

    container.innerHTML += `
    <div style="border:1px solid #ccc; padding:10px; margin:10px">

    <h4>Boulder ${i}</h4>

    Attempts:
    <button onclick="changeAttempts(${i},-1)">-</button>
    <span id="att_${i}">0</span>
    <button onclick="changeAttempts(${i},1)">+</button>

    <br><br>

    <label>
    <input type="checkbox" id="zone_${i}">
    Zone
    </label>

    <label>
    <input type="checkbox" id="top_${i}">
    Top
    </label>

    </div>
    `;
}

window.changeAttempts = function(id,delta){
    let el=document.getElementById("att_"+id);
    let val=Math.max(0,parseInt(el.innerText)+delta);
    el.innerText=val;
}

window.saveResults = async function(){

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const league = document.getElementById("league").value;
    const gender = document.getElementById("gender").value;

    if(!name || !phone){
        alert("Enter name and phone");
        return;
    }

    const { collection, query, where, getDocs, addDoc, updateDoc, doc } =
    await import("https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js");

    // Check if competitor already exists
    const q = query(
        collection(window.db,"competitors"),
        where("name","==",name),
        where("phone","==",phone)
    );

    const snapshot = await getDocs(q);

    let competitorId;
    let totalScore = 0;

    if(!snapshot.empty){
        // Existing account → update
        const existing = snapshot.docs[0];
        competitorId = existing.id;
        totalScore = existing.data().totalScore || 0;

        await updateDoc(doc(window.db,"competitors",competitorId),{
            league,
            gender,
            name,
            phone
        });
    }
    else{
        // New competitor
        const ref = await addDoc(collection(window.db,"competitors"),{
            name,
            phone,
            league,
            gender,
            totalScore:0,
            createdAt:Date.now()
        });

        competitorId = ref.id;
    }

    alert("Saved");
};
