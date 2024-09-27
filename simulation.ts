import { Atendimento } from "./models/Atendimento";
import { Caminhao } from "./models/Caminhao";
import { Fila } from "./models/Fila";
import { PontoDeCarregamento } from "./models/PontoDeCarregamento";
import { Simulacao } from "./models/Simulacao";

// Entidades
// Caminhão: capacidade em toneladas, tempo de chegada, tempo de carregamento
// Ponto de Carregamento: capacidade de carga por hora, número de pontos
// Operador de Carregamento: eficiência, tempo médio
// Fila:

/**
 * Variáveis Importantes:
 * Taxa de Chegada dos Caminhões: Quantos caminhões chegam por hora (distribuição de chegada).
 * Taxa de Carregamento: Tempo médio para carregar um caminhão, considerando a capacidade do ponto de carregamento.
 * Tempo de Espera: Quanto tempo cada caminhão passa na fila antes de ser carregado.
 * Capacidade de Processamento: Número de caminhões que podem ser carregados simultaneamente (dependente da quantidade de pontos de carregamento).
 * Tempo Total de Ciclo: Tempo desde a chegada até o fim do carregamento de cada caminhão.
 */

// Classe Caminhão

const caminhoes = [
  new Caminhao("1", 10, new Date("2024-09-26T07:00:00.000Z")),
  new Caminhao("2", 10, new Date("2024-09-26T07:10:00.000Z")),
  new Caminhao("3", 10, new Date("2024-09-26T07:20:00.000Z")),
  // new Caminhao("3", 10, new Date("2024-09-26T08:00:00.000Z")),
  // new Caminhao(8, new Date("2024-09-26T08:15:00.000Z")),
  // new Caminhao(10, new Date("2024-09-26T08:45:00.000Z")),
];

// A unica unidade de medida linear é o momento do atendimento:
// Um caminhão chega e é atendido em X minutos.
// O início do atendimento do próximo é feito com base no final do anterior

const ponto1 = new PontoDeCarregamento('A', 20);
const ponto2 = new PontoDeCarregamento('B', 20);

const simulacao = new Simulacao([ponto1, ponto2], 300); // Taxa de tempo 60: 1 minuto = 1 segundo
simulacao.executar(caminhoes).then(() => {
  console.log("=================RESULTADOS=================");

  console.log(
    `Taxa De Chegada: ${simulacao
      .getTaxaDeChegadaDosCaminhoes()
      .toFixed(2)} caminhões por hora`
  );
  console.log(
    `Tempo total do ciclo: ${simulacao.getTempoTotalDeCiclo()} minutos`
  );
  console.log(`Tempo de espera total: ${simulacao.getTempoDeEspera()} minutos`);
  console.log(
    `Tempo de espera médio: ${simulacao.getTempoDeEsperaMedio()} minutos`
  );
});

