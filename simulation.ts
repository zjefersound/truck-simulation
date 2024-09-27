import { Caminhao } from "./models/Caminhao";
import { Fila } from "./models/Fila";
import { PontoDeCarregamento } from "./models/PontoDeCarregamento";

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
  new Caminhao(10, new Date("2024-09-26T07:45:00.000Z")),
];
const ponto1 = new PontoDeCarregamento(20);

class Atendimento {
  caminhao: Caminhao;
  inicio: Date;
  fim: Date;
  constructor(caminhao: Caminhao, inicio: Date, fim: Date) {
    this.caminhao = caminhao;
    this.inicio = inicio;
    this.fim = fim;
  }
}
const horariosAtendimento: Atendimento[] = [];
// A unica unidade de medida linear é o momento do atendimento:
// Um caminhão chega e é atendido em X minutos.
// O início do atendimento do próximo é feito com base no final do anterior

const fila = new Fila();
for (const caminhao of caminhoes) {
  fila.adicionarCaminhao(caminhao);
  if (!ponto1.isOcupado) {
    const ultimoAtendimento =
      horariosAtendimento[horariosAtendimento.length - 1];
    const horarioInicio = ultimoAtendimento?.fim ?? caminhao.tempoChegada;
    caminhao.iniciarCarregamento(horarioInicio);
    ponto1.carregarCaminhao(caminhao);

    const horarioFim = new Date(
      horarioInicio.getTime() + caminhao.tempoCarregamento! * 60000
    ); // Converte minutos para ms

    horariosAtendimento.push(
      new Atendimento(caminhao, horarioInicio, horarioFim)
    );
    ponto1.desocupar();
  }
  fila.removerCaminhao();
}


console.log(
  horariosAtendimento.map((ha) => ({
    ...ha,
    tempoEspera: ha.caminhao.getTempoDeEspera(),
  }))
);
