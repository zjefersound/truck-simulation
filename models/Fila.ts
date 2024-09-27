import { Caminhao } from "./Caminhao";

export class Fila {
  caminhoes: Caminhao[] = [];

  adicionarCaminhao(caminhao: Caminhao): void {
    this.caminhoes.push(caminhao);
  }

  removerCaminhao(): Caminhao | undefined {
    return this.caminhoes.shift();
  }

  getTamanhoFila(): number {
    return this.caminhoes.length;
  }
  verProximoCaminhao(): Caminhao | undefined {
    return this.caminhoes[0];
  }
}
