let frequenciaGlobal = {};

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

  frequenciaGlobal = frequencia;

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

  const div = document.getElementById(
    "frequencia"
  );

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

  const div = document.getElementById(
    "atrasos"
  );

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

  const div = document.getElementById(
    "exclusoes"
  );

  div.innerHTML = "";

  Object.entries(freq)
  .sort((a,b)=>a[1]-b[1])
  .slice(0,5)
  .forEach(item=>{

    div.innerHTML += `
      <div class="numero">
        ${item[0]}
      </div>
    `;

  });

}

export function mostrarQuentesFrias(){

  const quentes =
    Object.entries(frequenciaGlobal)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5);

  const frias =
    Object.entries(frequenciaGlobal)
    .sort((a,b)=>a[1]-b[1])
    .slice(0,5);

  const divQuentes =
    document.getElementById("quentes");

  const divFrias =
    document.getElementById("frias");

  divQuentes.innerHTML = "";

  divFrias.innerHTML = "";

  quentes.forEach(item=>{

    divQuentes.innerHTML += `
      <div class="numero">
        🔥 ${item[0]}
      </div>
    `;

  });

  frias.forEach(item=>{

    divFrias.innerHTML += `
      <div class="numero">
        ❄️ ${item[0]}
      </div>
    `;

  });

}

export function mostrarRanking(){

  const div =
    document.getElementById(
      "rankingForca"
    );

  div.innerHTML = "";

  Object.entries(frequenciaGlobal)
  .sort((a,b)=>b[1]-a[1])
  .forEach((item,index)=>{

    div.innerHTML += `
      <div class="numero">
        #${index+1} → ${item[0]}
      </div>
    `;

  });

}

export function mostrarGrafico(){

  const canvas =
    document.getElementById(
      "graficoFrequencia"
    );

  if(!canvas) return;

  new Chart(canvas, {

    type:"bar",

    data:{

      labels:Object.keys(
        frequenciaGlobal
      ),

      datasets:[{

        label:"Frequência",

        data:Object.values(
          frequenciaGlobal
        )

      }]

    }

  });

}
