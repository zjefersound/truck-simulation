import { Caminhao } from "./Caminhao";
import { PontoDeCarregamento } from "./PontoDeCarregamento";

export class Atendimento {
  caminhao: Caminhao;
  pontoId: string;
  inicio: Date;
  fim: Date;
  constructor(
    caminhao: Caminhao,
    pontoId: string,
    inicio: Date,
    fim: Date
  ) {
    this.caminhao = caminhao;
    this.pontoId = pontoId;
    this.inicio = inicio;
    this.fim = fim;
  }
}
