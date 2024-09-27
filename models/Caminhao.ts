export class Caminhao {
  capacidade: number; // Capacidade em toneladas
  tempoChegada: Date; // Hora de chegada do caminhão
  inicioCarregamento: Date | null = null; // Hora de início do carregamento
  tempoCarregamento: number | null = null; // Tempo de carregamento em minutos

  constructor(capacidade: number, tempoChegada: Date) {
    this.capacidade = capacidade;
    this.tempoChegada = tempoChegada;
  }

  iniciarCarregamento(tempoInicio: Date): void {
    this.inicioCarregamento = tempoInicio;
  }

  setTempoCarregamento(tempoCarregamento: number) {
    this.tempoCarregamento = tempoCarregamento;
  }

  getTempoDeEspera(): number {
    if (!this.inicioCarregamento) return 0;
    // Calcula o tempo de espera em minutos
    const esperaMs =
      this.inicioCarregamento.getTime() - this.tempoChegada.getTime();
    return Math.floor(esperaMs / 60000); // Converte de milissegundos para minutos
  }
}