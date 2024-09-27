import { delay } from "../utils/delay";
import { printTime } from "../utils/printTime";
import { Atendimento } from "./Atendimento";
import { Caminhao } from "./Caminhao";
import { Fila } from "./Fila";
import { PontoDeCarregamento } from "./PontoDeCarregamento";

export class Simulacao {
  atendimentos: Atendimento[] = [];
  fila = new Fila();
  pontos: PontoDeCarregamento[];
  taxaDeTempo: number;

  constructor(pontos: PontoDeCarregamento[], taxaDeTempo: number = 1) {
    this.pontos = pontos;
    this.taxaDeTempo = taxaDeTempo;
  }

  async executar(caminhoes: Caminhao[]) {
    if (caminhoes.length < 2)
      throw new Error("Dados insuficientes! Insira pelo menos 2 caminhões.");

    const promises = caminhoes.map(async (caminhao) => {
      const tempoChegadaAjustado =
        (caminhao.tempoChegada.getTime() -
          caminhoes[0].tempoChegada.getTime()) /
        this.taxaDeTempo;

      await delay(tempoChegadaAjustado);

      this.fila.adicionarCaminhao(caminhao);
      console.log(
        `[${printTime(caminhao.tempoChegada)}] Caminhão ${
          caminhao.id
        } adicionado à fila.`
      );
      await this.processarFila();
    });

    await Promise.all(promises);
    console.log("Simulação concluída.");
  }

  async processarFila() {
    const pontoDisponivel = this.pontos.find((ponto) => !ponto.isOcupado);
    const proximoCaminhao = this.fila.verProximoCaminhao();

    if (pontoDisponivel && proximoCaminhao) {
      this.fila.removerCaminhao();
      const atendimentosDoPonto = this.atendimentos.filter(
        (a) => a.pontoId === pontoDisponivel.id
      );
      const ultimoAtendimento =
        atendimentosDoPonto[atendimentosDoPonto.length - 1];
      const horarioInicio =
        ultimoAtendimento?.fim > proximoCaminhao.tempoChegada
          ? ultimoAtendimento?.fim
          : proximoCaminhao.tempoChegada;

      proximoCaminhao.iniciarCarregamento(horarioInicio);
      pontoDisponivel.carregarCaminhao(proximoCaminhao);

      const tempoCarregamentoAjustado =
        proximoCaminhao.tempoCarregamento! * 60000 * (1 / this.taxaDeTempo);

      const horarioFim = new Date(
        horarioInicio.getTime() + proximoCaminhao.tempoCarregamento! * 60000
      );

      console.log(
        `[${printTime(horarioInicio)}] Ponto ${
          pontoDisponivel.id
        } ocupado por caminhão ${proximoCaminhao.id}. Terminará às ${printTime(
          horarioFim
        )}. `
      );

      this.atendimentos.push(
        new Atendimento(
          proximoCaminhao,
          pontoDisponivel.id,
          horarioInicio,
          horarioFim
        )
      );

      await delay(tempoCarregamentoAjustado);

      pontoDisponivel.desocupar();
      console.log(
        `[${printTime(proximoCaminhao.getTempoSaida()!)}] Ponto ${
          pontoDisponivel.id
        } desocupado por caminhão ${proximoCaminhao.id}.`
      );

      await this.processarFila();
    } else if (proximoCaminhao) {
      console.log(
        `Caminhão ${proximoCaminhao.id} não pôde ser atendido. Pontos ocupados.`
      );
    }
  }

  getTaxaDeChegadaDosCaminhoes() {
    if (this.atendimentos.length < 2) return 0;

    const inicio = this.atendimentos[0].inicio;
    const fim = this.atendimentos[this.atendimentos.length - 1].inicio;
    const duracaoEmHoras =
      (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60);
    return this.atendimentos.length / duracaoEmHoras;
  }

  getTempoTotalDeCiclo(): number {
    if (this.atendimentos.length === 0) return 0;

    const inicio = this.atendimentos[0].inicio;
    const fim = this.atendimentos[this.atendimentos.length - 1].fim;
    const duracaoEmMinutos = (fim.getTime() - inicio.getTime()) / (1000 * 60);
    return duracaoEmMinutos;
  }

  getTempoDeEspera(): number {
    const temposDeEspera = this.atendimentos.map((a) =>
      a.caminhao.getTempoDeEspera()
    );
    return temposDeEspera.reduce((total, tempo) => total + tempo, 0);
  }

  getTempoDeEsperaMedio(): number {
    const tempoDeEspera = this.getTempoDeEspera();
    return tempoDeEspera / this.atendimentos.length;
  }
}
