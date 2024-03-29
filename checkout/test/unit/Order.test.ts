import Coupon from "../../src/model/entity/Coupon";
import { Dimension } from "../../src/model/entity/Dimension";
import Item from "../../src/model/entity/Item";
import Order from "../../src/model/entity/Order";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10,  3));
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4, 10));
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10, 1));

test("Não deve criar um pedido com CPF inválido", function () {
	expect(() => Order.create("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

test("Deve criar um pedido sem itens", function () {
	const order = Order.create("317.153.361-86");
	const total = order.getTotal();
	expect(total).toBe(0);
});

test("Deve criar um pedido com 3 itens", function () {
	const order = Order.create("317.153.361-86");
	order.addItem(itemOne, 1);
	order.addItem(itemTwo, 1);
	order.addItem(itemThree, 3);
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
	const order = Order.create("317.153.361-86");
	order.addItem(itemOne, 1);
	order.addItem(itemTwo, 1);
	order.addItem(itemThree, 3);
	order.addCoupon(new Coupon("VALE20", 20));
	const total = order.getTotal();
	expect(total).toBe(4872);
});

test("não deve aplicar cupom de desconto expirado", function () {
	const order = Order.create("317.153.361-86");
	expect(() => order.addCoupon(new Coupon("VALE20", 20, new Date("2022-10-06T00:00:00")))).toThrow(new Error('Cupom expirado'));
});


test("Não deve adicionar item com quantidade negativa", function () {
	const order = Order.create("317.153.361-86");
	expect(() => order.addItem(itemOne, -1)).toThrow(new Error('Quantidade não pode ser zero ou negativa'));
});

test("Não deve adicionar itens duplicados", function () {
	const order = Order.create("317.153.361-86");
	order.addItem(itemOne, 1);
	order.addItem(itemTwo, 1);
	expect(() => order.addItem(itemOne, 1)).toThrow(new Error('Item já adicionado no pedido'));
});

test("Deve criar um pedido com codigo", function () {
	const order = Order.create("317.153.361-86");
	order.addItem(itemOne, 1);
	expect(order.getCode()).toBe("202200000001");
});

