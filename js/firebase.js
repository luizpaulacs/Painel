import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyD75Zy6dBNHQEsSdUbIpTv2JKtP9VZv5dM",

authDomain: "luizpaulacs.github.io",

projectId: "painel-avaliar-loto",

storageBucket: "painel-avaliar-loto.firebasestorage.app",

messagingSenderId: "41190701411",

appId: "1:41190701411:web:0a337e709944ec8de4fb56"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

