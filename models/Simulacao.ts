import { Atendimento } from "./Atendimento";
import { Caminhao } from "./Caminhao";
import { Fila } from "./Fila";
import { PontoDeCarregamento } from "./PontoDeCarregamento";

export class Simulacao {
  atendimentos: Atendimento[] = [];
  fila = new Fila();
  pontos: PontoDeCarregamento[];
  constructor(pontos: PontoDeCarregamento[]) {
    this.pontos = pontos;
  }
  executar(caminhoes: Caminhao[]) {
    if (caminhoes.length < 2)
      console.error("Dados insuficientes! Insira pelo menos 2 caminhões.");

    for (const caminhao of caminhoes) {
      this.fila.adicionarCaminhao(caminhao);
      if (!this.pontos[0].isOcupado) {
        const ultimoAtendimento =
          this.atendimentos[this.atendimentos.length - 1];
        const horarioInicio = ultimoAtendimento?.fim ?? caminhao.tempoChegada;
        caminhao.iniciarCarregamento(horarioInicio);
        this.pontos[0].carregarCaminhao(caminhao);

        const horarioFim = new Date(
          horarioInicio.getTime() + caminhao.tempoCarregamento! * 60000
        );

        this.atendimentos.push(
          new Atendimento(caminhao, horarioInicio, horarioFim)
        );
        this.pontos[0].desocupar();
      }
      this.fila.removerCaminhao();
    }
  }

  getTaxaDeChegadaDosCaminhoes() {
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

  getTempoDeEsperaMedio(): number {
    const temposDeEspera = this.atendimentos.map((a) =>
      a.caminhao.getTempoDeEspera()
    );
    const tempoDeEsperaMedio =
      temposDeEspera.reduce((total, tempo) => total + tempo, 0) /
      this.atendimentos.length;
    return tempoDeEsperaMedio;
  }
}
