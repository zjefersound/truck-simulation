// CustoSimulacao.test.ts
import { CustoSimulacao } from "../../models/CustoSimulacao";
import { Simulacao } from "../../models/Simulacao";
import { Caminhao } from "../../models/Caminhao";
import { PontoDeCarregamento } from "../../models/PontoDeCarregamento";
import { Atendimento } from "../../models/Atendimento";

// Mock para a classe Caminhao
const mockCaminhao = (id: string, tempoDeEspera: number): Caminhao => ({
  id,
  getTempoDeEspera: () => tempoDeEspera, // Tempo de espera em milissegundos
  iniciarCarregamento: jest.fn(),
  tempoChegada: new Date(),
  tempoCarregamento: 60, // Tempo de carregamento em minutos
  getTempoSaida: jest.fn(() => new Date()),
  capacidade: 0,
  inicioCarregamento: null,
  setTempoCarregamento: function (tempoCarregamento: number): void {
    throw new Error("Function not implemented.");
  }
});

// Mock para a classe PontoDeCarregamento
const mockPontoDeCarregamento = (id: string): PontoDeCarregamento => ({
  id,
  isOcupado: false,
  carregarCaminhao: jest.fn(),
  desocupar: jest.fn(),
  capacidadePorHora: 20
});

// Mock para a classe Simulacao
const mockSimulacao = (): Simulacao => {
  const simulacao = new Simulacao([], 1);

  // Mock dos atendimentos
  simulacao.atendimentos = [
    new Atendimento(
      mockCaminhao("1", 3600000), // Caminhão 1 com 1h de espera
      "ponto1",
      new Date("2023-09-25T10:00:00"),
      new Date("2023-09-25T11:00:00")
    ),
    new Atendimento(
      mockCaminhao("2", 1800000), // Caminhão 2 com 30 minutos de espera
      "ponto2",
      new Date("2023-09-25T10:30:00"),
      new Date("2023-09-25T12:00:00")
    ),
  ];

  // Mock dos pontos de carregamento
  simulacao.pontos = [
    mockPontoDeCarregamento("ponto1"),
    mockPontoDeCarregamento("ponto2"),
  ];

  // Mock da função getTemposDeOcupacaoPorPonto
  simulacao.getTemposDeOcupacaoPorPonto = jest.fn(() => [3600000, 5400000]); // 1h e 1.5h

  return simulacao;
};

describe("CustoSimulacao", () => {
  let custoSimulacao: CustoSimulacao;
  let simulacao: Simulacao;

  beforeEach(() => {
    simulacao = mockSimulacao();
    custoSimulacao = new CustoSimulacao(simulacao);
  });

  test("deve calcular corretamente o custo de operação dos pontos", () => {
    const custoPorHora = 50; // R$ 50 por hora
    const custoOperacao = custoSimulacao.getCustoOperacaoPontos(custoPorHora);

    // Tempos de ocupação: 1h e 1.5h => 50 * (1 + 1.5) = 125
    expect(custoOperacao).toBe(125);
  });

  test("deve calcular corretamente o custo de espera dos caminhões", () => {
    const custoPorHoraDeEspera = 30; // R$ 30 por hora de espera
    const custoEspera =
      custoSimulacao.getCustoEsperaCaminhoes(custoPorHoraDeEspera);

    // Tempos de espera: 1h + 0.5h => 30 * (1 + 0.5) = 45
    expect(custoEspera).toBe(45);
  });

  test("deve calcular corretamente o custo de manutenção dos pontos", () => {
    const custoFixoPorUtilizacao = 100; // R$ 100 por utilização
    const custoManutencao = custoSimulacao.getCustoManutencaoPontos(
      custoFixoPorUtilizacao
    );

    // Cada ponto foi utilizado 1 vez: 100 * 2 = 200
    expect(custoManutencao).toBe(200);
  });

  test("deve calcular corretamente o custo total", () => {
    const custoPorHoraPonto = 50; // R$ 50 por hora
    const custoPorHoraDeEspera = 30; // R$ 30 por hora de espera
    const custoFixoPorUtilizacao = 100; // R$ 100 por utilização

    const custoTotal = custoSimulacao.getCustoTotal(
      custoPorHoraPonto,
      custoPorHoraDeEspera,
      custoFixoPorUtilizacao
    );

    // Custo de operação: 125
    // Custo de espera: 45
    // Custo de manutenção: 200
    // Total: 125 + 45 + 200 = 370
    expect(custoTotal).toBe(370);
  });
});
