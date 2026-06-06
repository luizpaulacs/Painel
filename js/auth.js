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
  const e = email.value.trim();
  const s = senha.value.trim();

  try {
    await signInWithEmailAndPassword(auth, e, s);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.log(error.code, error.message, error.customData);
    mensagem.textContent = `${error.code}: ${error.message}`;
  }
});

cadastroBtn.addEventListener("click", async () => {
  const e = email.value.trim();
  const s = senha.value.trim();

  try {
    await createUserWithEmailAndPassword(auth, e, s);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.log(error.code, error.message, error.customData);
    mensagem.textContent = `${error.code}: ${error.message}`;
  }
});
