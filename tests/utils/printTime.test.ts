import { printTime } from "../../utils/printTime";

describe("printTime", () => {
  test("deve retornar a informação de horas minutos e segundos de uma data", () => {
    const date = new Date("2024-09-26T07:06:00.000000Z");
    expect(printTime(date)).toBe('07:06:00')
  });
});
