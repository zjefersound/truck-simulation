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

  executar(caminhoes: Caminhao[]) {
    if (caminhoes.length < 2)
      throw new Error("Dados insuficientes! Insira pelo menos 2 caminhões.");

    for (const caminhao of caminhoes) {
      console.log("----------------------------------");
      this.fila.adicionarCaminhao(caminhao);
      console.log(
        `[${printTime(caminhao.tempoChegada)}] Caminhão ${
          caminhao.id
        } adicionado à fila.`
      );

      const pontoDisponivel = this.pontos.find((ponto) => !ponto.isOcupado);

      if (pontoDisponivel) {
        const ultimoAtendimento =
          this.atendimentos[this.atendimentos.length - 1];
        const horarioInicio = ultimoAtendimento?.fim ?? caminhao.tempoChegada;
        caminhao.iniciarCarregamento(horarioInicio);
        pontoDisponivel.carregarCaminhao(caminhao);

        const horarioFim = new Date(
          horarioInicio.getTime() + caminhao.tempoCarregamento! * 60000
        );

        console.log(
          `\t   - Caminhão ${caminhao.id} terminará carregamento às ${printTime(horarioFim)}.`
        );

        this.atendimentos.push(
          new Atendimento(caminhao, horarioInicio, horarioFim)
        );

        pontoDisponivel.desocupar();
        console.log(
          `[${printTime(caminhao.getTempoSaida()!)}] Ponto de carregamento desocupado por caminhão ${caminhao.id}.`
        );
      } else {
        console.log(
          `Caminhão ${caminhao.id} não pôde ser atendido porque todos os pontos estão ocupados.`
        );
      }

      this.fila.removerCaminhao();
      console.log(
        `[${printTime(caminhao.getTempoSaida()!)}] Caminhão ${caminhao.id} removido da fila após o carregamento.`
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
