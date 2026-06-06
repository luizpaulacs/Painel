export function executarSimulacao(concursos){

  let acerto4 = 0;
  let acerto5 = 0;
  let acerto6 = 0;

  let totalTestes = 0;

  for(let i=30; i<concursos.length-1; i++){

    const baseAnalise = concursos.slice(i-30, i);

    const resultadoReal = concursos[i];

    const frequencia = calcularFrequencia(baseAnalise);

    const exclusoes = gerarExclusoes(frequencia);

    const acertos = contarExclusoes(
      exclusoes,
      resultadoReal.dezenas
    );

    if(acertos >= 4) acerto4++;

    if(acertos >= 5) acerto5++;

    if(acertos >= 6) acerto6++;

    totalTestes++;

  }

  mostrarResultado(
    totalTestes,
    acerto4,
    acerto5,
    acerto6
  );

}

function calcularFrequencia(concursos){

  const freq = {};

  for(let i=1;i<=25;i++){

    const numero = String(i).padStart(2,"0");

    freq[numero] = 0;

  }

  concursos.forEach(concurso=>{

    concurso.dezenas.forEach(numero=>{

      freq[numero]++;

    });

  });

  return freq;

}

function gerarExclusoes(freq){

  return Object.entries(freq)
    .sort((a,b)=>a[1]-b[1])
    .slice(0,6)
    .map(item=>item[0]);

}

function contarExclusoes(exclusoes, resultado){

  let acertos = 0;

  exclusoes.forEach(numero=>{

    if(!resultado.includes(numero)){

      acertos++;

    }

  });

  return acertos;

}

function mostrarResultado(
  total,
  a4,
  a5,
  a6
){

  const div = document.getElementById(
    "resultadoSimulacao"
  );

  const eficiencia =
    ((a4+a5+a6)/total*100).toFixed(1);

  div.innerHTML = `

    <div class="simulacao-item">
      <strong>Testes:</strong> ${total}
    </div>

    <div class="simulacao-item">
      ✅ 4 exclusões: ${a4}
    </div>

    <div class="simulacao-item">
      ✅ 5 exclusões: ${a5}
    </div>

    <div class="simulacao-item">
      ✅ 6 exclusões: ${a6}
    </div>

    <div class="simulacao-item destaque">
      🎯 Eficiência: ${eficiencia}%
    </div>

  `;

}
