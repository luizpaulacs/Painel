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
  limit,
  getDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

  analisarConcursos,
  mostrarGrafico,
  mostrarQuentesFrias,
  mostrarRanking

} from "./analise.js";

import { executarSimulacao } from "./simulador.js";

const textarea = document.getElementById("concursosInput");

const analisarBtn = document.getElementById("analisarBtn");

const logoutBtn = document.getElementById("logoutBtn");

const simularBtn = document.getElementById("simularBtn");

const buscarBtn = document.getElementById("buscarBtn");

const buscarNumero = document.getElementById("buscarNumero");

let concursosCarregados = [];

onAuthStateChanged(auth, async(user)=>{

  if(!user){

    window.location.href = "index.html";

    return;

  }

  await carregarConcursos();

});

logoutBtn.addEventListener("click", async()=>{

  await signOut(auth);

  window.location.href = "index.html";

});

analisarBtn.addEventListener("click", async()=>{

  const texto = textarea.value.trim();

  if(!texto) return;

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
      .filter(n=>n !== "");

    await setDoc(
      doc(db,"concursos",numeroConcurso),
      {
        numero:Number(numeroConcurso),
        data:dataConcurso,
        dezenas:dezenas,
        timestamp:new Date()
      }
    );

  }

  textarea.value = "";

  await carregarConcursos();

});

async function carregarConcursos(){

  const concursosRef = collection(db,"concursos");

  const q = query(
    concursosRef,
    orderBy("numero","desc"),
    limit(100)
  );

  const snapshot = await getDocs(q);

  concursosCarregados = [];

  snapshot.forEach((documento)=>{

    const dados = documento.data();

    if(dados.dezenas){

      concursosCarregados.push(dados);

    }

    // compatibilidade modelo antigo
    if(dados.concursos){

      dados.concursos.forEach(c=>{

        concursosCarregados.push({
          dezenas:c
        });

      });

    }

  });

  const apenasDezenas =
    concursosCarregados.map(c=>c.dezenas);

  analisarConcursos(apenasDezenas);

  mostrarGrafico();

  mostrarQuentesFrias();

  mostrarRanking();

}

simularBtn.addEventListener("click", ()=>{

  executarSimulacao(concursosCarregados);

});

buscarBtn.addEventListener("click", async()=>{

  const numero = buscarNumero.value;

  if(!numero) return;

  const docRef = doc(db,"concursos",numero);

  const resultado = await getDoc(docRef);

  const div = document.getElementById(
    "resultadoBusca"
  );

  if(resultado.exists()){

    const dados = resultado.data();

    div.innerHTML = `

      <div class="numero">
        Concurso ${dados.numero}
      </div>

      <div class="numero">
        ${dados.dezenas.join(" - ")}
      </div>

    `;

  }else{

    div.innerHTML = `
      Concurso não encontrado
    `;

  }

});
