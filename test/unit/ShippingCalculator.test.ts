import { Dimension } from "../../src/model/entity/Dimension";
import { Distance } from "../../src/model/entity/Distance";
import Item from "../../src/model/entity/Item";
import { ShippingCalculator } from "../../src/model/entity/ShippingCalculator";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10,  3));
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4, 10));
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10, 1));

test("Deve calcular o valor do frete", function () {
	const expectedValue = 30;
	const shippingValue = new ShippingCalculator(new Distance(1000), itemOne).calculate();
	expect(shippingValue).toBe(expectedValue);	
});

test("Deve calcular o valor do frete minimo", function () {
	const minimum_value = 10;
	const shippingValue = new ShippingCalculator(new Distance(1000), itemThree).calculate();
	expect(shippingValue).toBe(minimum_value);	
});