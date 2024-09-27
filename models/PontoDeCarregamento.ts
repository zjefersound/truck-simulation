import { Caminhao } from "./Caminhao";

export class PontoDeCarregamento {
  isOcupado: boolean = false;
  capacidadePorHora: number; // Toneladas por hora

  constructor(capacidadePorHora: number) {
    this.capacidadePorHora = capacidadePorHora;
  }

  carregarCaminhao(caminhao: Caminhao): number {
    this.isOcupado = true;
    const tempoParaCarregarEmHoras =
      caminhao.capacidade / this.capacidadePorHora;
    const tempoParaCarregarEmMinutos = Math.ceil(tempoParaCarregarEmHoras * 60);
    caminhao.setTempoCarregamento(tempoParaCarregarEmMinutos);
    return tempoParaCarregarEmMinutos;
  }

  desocupar() {
    this.isOcupado = false;
  }
}
