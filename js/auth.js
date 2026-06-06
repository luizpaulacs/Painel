import { auth } from "./firebase.js";

import {

  signInWithEmailAndPassword,
  createUserWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");

const senha = document.getElementById("senha");

const loginBtn = document.getElementById("loginBtn");

const cadastroBtn = document.getElementById("cadastroBtn");

const mensagem = document.getElementById("mensagem");

loginBtn.addEventListener("click", async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    );

    window.location.href = "dashboard.html";

  } catch(error){

    mensagem.innerHTML = error.message;

    console.log(error);

  }

});

cadastroBtn.addEventListener("click", async () => {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    );

    window.location.href = "dashboard.html";

  } catch(error){

    mensagem.innerHTML = error.message;

    console.log(error);

  }

});
