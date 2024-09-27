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
  new Caminhao(10, new Date("2024-09-26T07:00:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T07:30:00.000Z")),
  new Caminhao(12, new Date("2024-09-26T08:00:00.000Z")),
  new Caminhao(8, new Date("2024-09-26T08:15:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T08:45:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T09:00:00.000Z")),
  new Caminhao(12, new Date("2024-09-26T09:30:00.000Z")),
  new Caminhao(8, new Date("2024-09-26T10:00:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T10:15:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T10:45:00.000Z")),
  new Caminhao(12, new Date("2024-09-26T11:00:00.000Z")),
  new Caminhao(8, new Date("2024-09-26T11:30:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T12:00:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T12:30:00.000Z")),
  new Caminhao(12, new Date("2024-09-26T13:00:00.000Z")),
  new Caminhao(8, new Date("2024-09-26T13:15:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T14:00:00.000Z")),
  new Caminhao(10, new Date("2024-09-26T14:30:00.000Z")),
  new Caminhao(12, new Date("2024-09-26T15:00:00.000Z")),
  new Caminhao(8, new Date("2024-09-26T15:00:00.000Z")),
];

// A unica unidade de medida linear é o momento do atendimento:
// Um caminhão chega e é atendido em X minutos.
// O início do atendimento do próximo é feito com base no final do anterior

const ponto1 = new PontoDeCarregamento(20);

const simulacao = new Simulacao([ponto1]);
simulacao.executar(caminhoes);

console.log(
  simulacao.atendimentos.map((ha) => ({
    ...ha,
    tempoEspera: ha.caminhao.getTempoDeEspera(),
  }))
);

console.log(`Taxa De Chegada: ${simulacao.getTaxaDeChegadaDosCaminhoes().toFixed(2)} caminhões por hora`);
console.log(`Tempo total do ciclo: ${simulacao.getTempoTotalDeCiclo()} minutos`);
console.log(`Tempo de espera médio: ${simulacao.getTempoDeEsperaMedio()} minutos`);
