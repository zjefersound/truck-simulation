import { Caminhao } from "./Caminhao";

export class Atendimento {
  caminhao: Caminhao;
  inicio: Date;
  fim: Date;
  constructor(caminhao: Caminhao, inicio: Date, fim: Date) {
    this.caminhao = caminhao;
    this.inicio = inicio;
    this.fim = fim;
  }
}
