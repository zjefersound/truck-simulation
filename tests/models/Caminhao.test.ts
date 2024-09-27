import { Caminhao } from "../../models/Caminhao";

describe("Caminhao", () => {
  test("deve definir o início do carregamento", () => {
    const caminhao = new Caminhao(
      "1",
      10,
      new Date("2024-09-26T07:06:00.000000Z")
    );
    caminhao.iniciarCarregamento(new Date("2024-09-26T07:06:00.000000Z"));
    expect(caminhao.inicioCarregamento).toEqual(
      new Date("2024-09-26T07:06:00.000000Z")
    );
  });

  test("deve ter tempo de espera", () => {
    const caminhao = new Caminhao(
      "1",
      10,
      new Date("2024-09-26T07:00:00.000000Z")
    );
    caminhao.iniciarCarregamento(new Date("2024-09-26T07:30:00.000000Z"));
    expect(caminhao.getTempoDeEspera()).toBe(30);
  });

  test("deve definir tempo de carregamento", () => {
    const caminhao = new Caminhao(
      "1",
      10,
      new Date("2024-09-26T07:00:00.000000Z")
    );
    caminhao.iniciarCarregamento(new Date("2024-09-26T07:30:00.000000Z"));
    caminhao.setTempoCarregamento(30);
    expect(caminhao.tempoCarregamento).toBe(30);
  });

  test("deve trazer tempo de saída", () => {
    const caminhao = new Caminhao(
      "1",
      10,
      new Date("2024-09-26T07:00:00.000000Z")
    );
    caminhao.iniciarCarregamento(new Date("2024-09-26T07:30:00.000000Z"));
    caminhao.setTempoCarregamento(30);
    expect(caminhao.getTempoSaida()).toEqual(
      new Date("2024-09-26T08:00:00.000000Z")
    );
  });
});
