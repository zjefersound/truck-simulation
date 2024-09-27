import { Simulacao } from "./Simulacao";

export class CustoSimulacao {
  simulacao: Simulacao;

  constructor(simulacao: Simulacao) {
    this.simulacao = simulacao;
  }

  getCustoOperacaoPontos(custoPorHora: number): number {
    const temposDeOcupacao = this.simulacao.getTemposDeOcupacaoPorPonto();

    const custoTotal = temposDeOcupacao.reduce((total, tempoOcupado) => {
      const tempoEmHoras = tempoOcupado / (1000 * 60 * 60);
      return total + tempoEmHoras * custoPorHora;
    }, 0);

    return custoTotal;
  }

  getCustoEsperaCaminhoes(custoPorHoraDeEspera: number): number {
    const temposDeEspera = this.simulacao.atendimentos.map((a) =>
      a.caminhao.getTempoDeEspera()
    );

    const custoTotal = temposDeEspera.reduce((total, tempoDeEspera) => {
      const tempoEmHoras = tempoDeEspera / 60;
      return total + tempoEmHoras * custoPorHoraDeEspera;
    }, 0);

    return custoTotal;
  }

  getCustoManutencaoPontos(custoFixoPorUtilizacao: number): number {
    const utilizacoesPorPonto = this.simulacao.pontos.map((ponto) => {
      return this.simulacao.atendimentos.filter((a) => a.pontoId === ponto.id)
        .length;
    });

    const custoTotal = utilizacoesPorPonto.reduce((total, utilizacoes) => {
      return total + utilizacoes * custoFixoPorUtilizacao;
    }, 0);

    return custoTotal;
  }

  getCustoTotal(
    custoPorHoraPonto: number,
    custoPorHoraDeEspera: number,
    custoFixoPorUtilizacao: number
  ): number {
    const custoOperacao = this.getCustoOperacaoPontos(custoPorHoraPonto);
    const custoEspera = this.getCustoEsperaCaminhoes(custoPorHoraDeEspera);
    const custoManutencao = this.getCustoManutencaoPontos(
      custoFixoPorUtilizacao
    );

    return custoOperacao + custoEspera + custoManutencao;
  }
}
