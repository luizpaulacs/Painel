export function analisarConcursos(concursos){

const frequencia = {};

const atrasos = {};

for(let i=1;i<=25;i++){

const numero = String(i).padStart(2,"0");

frequencia[numero] = 0;

atrasos[numero] = 0;

}

concursos.forEach(concurso=>{

concurso.forEach(numero=>{

frequencia[numero]++;

});

});

for(let i=1;i<=25;i++){

const numero = String(i).padStart(2,"0");

let atraso = 0;

for(let c=0;c<concursos.length;c++){

if(concursos[c].includes(numero)){

break;

}

atraso++;

}

atrasos[numero] = atraso;

}

mostrarFrequencia(frequencia);

mostrarAtrasos(atrasos);

gerarExclusoes(frequencia);

}

function mostrarFrequencia(freq){

const div = document.getElementById("frequencia");

div.innerHTML = "";

Object.entries(freq)
.sort((a,b)=>b[1]-a[1])
.forEach(item=>{

div.innerHTML += `
<div class="numero">
${item[0]} → ${item[1]}x
</div>
`;

});

}

function mostrarAtrasos(atrasos){

const div = document.getElementById("atrasos");

div.innerHTML = "";

Object.entries(atrasos)
.sort((a,b)=>b[1]-a[1])
.forEach(item=>{

div.innerHTML += `
<div class="numero">
${item[0]} → ${item[1]}
</div>
`;

});

}

function gerarExclusoes(freq){

const div = document.getElementById("exclusoes");

div.innerHTML = "";

const exclusoes = Object.entries(freq)
.sort((a,b)=>a[1]-b[1])
.slice(0,5);

exclusoes.forEach(item=>{

div.innerHTML += `
<div class="numero">
${item[0]}
</div>
`;

});

}
