import { Caminhao } from "./models/Caminhao";
import { PontoDeCarregamento } from "./models/PontoDeCarregamento";
import { Simulacao } from "./models/Simulacao";
import data from "./data/large-data.json";
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

const caminhoes = data.map(
  (item) => new Caminhao(item.id, item.capacidade, new Date(item.tempoChegada))
);

// A unica unidade de medida linear é o momento do atendimento:
// Um caminhão chega e é atendido em X minutos.
// O início do atendimento do próximo é feito com base no final do anterior

const pontos = [
  new PontoDeCarregamento("A", 20),
  new PontoDeCarregamento("B", 20),
  new PontoDeCarregamento("C", 20),
  new PontoDeCarregamento("D", 20),
  new PontoDeCarregamento("E", 20),
  new PontoDeCarregamento("F", 20),
  new PontoDeCarregamento("G", 20),
  new PontoDeCarregamento("H", 20),
  new PontoDeCarregamento("I", 20),
  new PontoDeCarregamento("J", 20),
];

const simulacao = new Simulacao(pontos, 1200); // Taxa de tempo 60: 1 minuto = 1 segundo
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
  const taxasDeUtilizacao = simulacao.getTaxaDeUtilizacaoDosPontos();
  taxasDeUtilizacao.forEach((taxa, index) => {
    console.log(
      `Taxa de utilização do ponto ${simulacao.pontos[index].id}: ${(
        taxa * 100
      ).toFixed(2)}%`
    );
  });
});
