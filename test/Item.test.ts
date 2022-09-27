import Coupon from "../src/Coupon";
import { Dimension } from "../src/Dimension";
import Item from "../src/Item";

test("Não deve criar um item com dimensões negativas", function () {
	expect(() => new Item(1, "Guitarra", 1000, new Dimension(-10, 20, -4), 10)).toThrow(new Error('Item com dimensões inválidas'));
});

test("Não deve criar um item com peso negativo", function () {
	expect(() => new Item(1, "Guitarra", 1000, new Dimension(10, 20, 4), -10)).toThrow(new Error('Item com peso inválido'));
});
