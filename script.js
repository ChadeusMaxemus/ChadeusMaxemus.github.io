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

    let totalScore = 0;

    // Calculate score correctly
    for(let i=1;i<=10;i++){

        const attemptsEl = document.getElementById("att_"+i);
        const zoneEl = document.getElementById("zone_"+i);
        const topEl = document.getElementById("top_"+i);

        if(!attemptsEl || !zoneEl || !topEl) continue;

        let attempts = parseInt(attemptsEl.innerText) || 0;
        let zone = zoneEl.checked;
        let top = topEl.checked;

        let points = 0;

        if(top){
            points = (attempts === 1) ? 4 : 3;
        }
        else if(zone){
            points = 1;
        }

        totalScore += points;
    }

    const { collection, query, where, getDocs, addDoc, updateDoc, doc } =
    await import("https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js");

    const q = query(
        collection(window.db,"competitors"),
        where("name","==",name),
        where("phone","==",phone)
    );

    const snapshot = await getDocs(q);

    if(!snapshot.empty){

        const competitor = snapshot.docs[0];

        await updateDoc(doc(window.db,"competitors",competitor.id),{
            name,
            phone,
            league,
            gender,
            totalScore
        });

    } else {

        await addDoc(collection(window.db,"competitors"),{
            name,
            phone,
            league,
            gender,
            totalScore,
            createdAt:Date.now()
        });
    }

    alert("Saved");
};
