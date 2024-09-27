import { Caminhao } from "../../models/Caminhao";
import { PontoDeCarregamento } from "../../models/PontoDeCarregamento";

it("calcula o tempo para carregar caminhao", () => {
  const caminhao = new Caminhao(10, new Date("2024-09-26T07:01:00.000Z"));
  caminhao.iniciarCarregamento(caminhao.tempoChegada)
  const ponto = new PontoDeCarregamento(20);
  ponto.carregarCaminhao(caminhao)
  expect(caminhao.tempoCarregamento).toBe(30)
});
