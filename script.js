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

    const name=document.getElementById("name").value;
    const phone=document.getElementById("phone").value;
    const league=document.getElementById("league").value;
    const gender=document.getElementById("gender").value;

    if(!name){
        alert("Enter name");
        return;
    }

    let totalScore=0;

    await addDoc(collection(db,"competitors"),{
        name,
        phone,
        league,
        gender,
        totalScore:0,
        createdAt:Date.now()
    });

    alert("Saved!");
}
