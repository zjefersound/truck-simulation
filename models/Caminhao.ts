export class Caminhao {
  id: string;
  capacidade: number; // Capacidade em toneladas
  tempoChegada: Date; // Hora de chegada do caminhão
  inicioCarregamento: Date | null = null; // Hora de início do carregamento
  tempoCarregamento: number | null = null; // Tempo de carregamento em minutos

  constructor(capacidade: number, tempoChegada: Date) {
    this.id = Math.random().toFixed(4)
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

  getTempoSaida(): Date | null {
    if (!this.inicioCarregamento || !this.tempoCarregamento) {
      return null;
    }
    
    const tempoSaida = new Date(
      this.inicioCarregamento.getTime() + this.tempoCarregamento * 60000
    );
    return tempoSaida;
  }
}
