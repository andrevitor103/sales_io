import { Coordinate } from "../../src/model/entity/Coordinate";
import { DistanceCalculator } from "../../src/services/DistanceCalculator";

    test('deve calcular a distancia entre dois pontos', () => {
    const from = new Coordinate(-27.5945, -48.5477);
    const to = new Coordinate(-22.9129, -43.2003);
    const distanceCalculator = DistanceCalculator.calculate(from, to);
    const result = distanceCalculator.distance;

    expect(result).toBe(748.2);
})

test('deve retornar zero quando os dois pontos tem as mesmas coordenadas', () => {
    const from = new Coordinate(-27.5945, -48.5477);
    const to = new Coordinate(-27.5945, -48.5477);
    const distanceCalculator = DistanceCalculator.calculate(from, to);
    const result = distanceCalculator.distance;

    expect(result).toBe(0);
})
