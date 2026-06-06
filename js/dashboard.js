import { auth, db } from "./firebase.js";

import {

onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

collection,
addDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { analisarConcursos } from "./analise.js";

const textarea = document.getElementById("concursosInput");

const analisarBtn = document.getElementById("analisarBtn");

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user)=>{

if(!user){

window.location.href = "index.html";

}

});

logoutBtn.addEventListener("click", async ()=>{

await signOut(auth);

window.location.href = "index.html";

});

analisarBtn.addEventListener("click", async ()=>{

const texto = textarea.value;

const linhas = texto.trim().split("\n");

const concursos = [];

linhas.forEach(linha=>{

const partes = linha.split("-");

if(partes.length > 1){

const numeros = partes[1]
.trim()
.split(" ")
.filter(n=>n !== "");

concursos.push(numeros);

}

});

await addDoc(
collection(db,"concursos"),
{
concursos,
data:new Date()
}
);

analisarConcursos(concursos);

});
