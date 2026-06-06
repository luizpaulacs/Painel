import { auth, db } from "./firebase.js";

import {

  onAuthStateChanged,
  signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { analisarConcursos } from "./analise.js";

import { executarSimulacao } from "./simulador.js";

const textarea = document.getElementById("concursosInput");

const analisarBtn = document.getElementById("analisarBtn");

const logoutBtn = document.getElementById("logoutBtn");

const simularBtn = document.getElementById("simularBtn");

onAuthStateChanged(auth, async (user)=>{

  if(!user){

    window.location.href = "index.html";

    return;

  }

  carregarConcursos();

});

logoutBtn.addEventListener("click", async ()=>{

  await signOut(auth);

  window.location.href = "index.html";

});

analisarBtn.addEventListener("click", async ()=>{

  const texto = textarea.value.trim();

  const linhas = texto.split("\n");

  for(const linha of linhas){

    const partes = linha.split("-");

    if(partes.length < 2) continue;

    const info = partes[0].trim();

    const dezenasTexto = partes[1].trim();

    const infoPartes = info.split(" ");

    const numeroConcurso = infoPartes[0];

    const dataConcurso = infoPartes[1] || "";

    const dezenas = dezenasTexto
      .split(" ")
      .filter(n => n !== "");

    await setDoc(
      doc(db, "concursos", numeroConcurso),
      {
        numero: Number(numeroConcurso),
        data: dataConcurso,
        dezenas: dezenas,
        timestamp: new Date()
      }
    );

  }

  textarea.value = "";

  carregarConcursos();

});

async function carregarConcursos(){

  const concursosRef = collection(db, "concursos");

  const q = query(
    concursosRef,
    orderBy("numero", "desc"),
    limit(100)
  );

  const snapshot = await getDocs(q);

  const concursos = [];

  snapshot.forEach((doc)=>{

    const dados = doc.data();

    concursos.push(dados);

  });

  analisarConcursos(
    concursos.map(c=>c.dezenas)
  );

  simularBtn.onclick = ()=>{

    executarSimulacao(concursos);

  };

}
