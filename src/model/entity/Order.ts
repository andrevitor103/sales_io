import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import { OrderCode } from "./orderCode";
import OrderItem from "./OrderItem";

export default class Order {
	cpf: Cpf;
	orderItems: OrderItem[];
	coupon?: Coupon;
	orderCode: OrderCode;
	freight?: number;

	constructor (cpf: string, date: Date, sequence: number) {
		this.cpf = new Cpf(cpf);
		this.orderCode = new OrderCode(date, sequence);
		this.orderItems = [];
	}
	
<<<<<<<< HEAD:checkout/src/model/entity/Order.ts
	public static create(cpf: string, date: Date = new Date(), sequence: number = 1): Order {
		return new Order(cpf, date, sequence);
========
	public static create(cpf: string): Order {
		return new Order(cpf);
>>>>>>>> de2e0ed6e55129342af4d5bd0a9ea9626a6a68ee:src/model/entity/Order.ts
	}

	public addItem (item: Item, quantity: number) {
		if ( this.isDuplicated(item) ) {
			throw new Error('Item já adicionado no pedido');
		}
		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
	}

	private isDuplicated(newItem: Item): boolean {
		return this.orderItems.filter((item) => item.idItem == newItem.idItem).length > 0;
	}

	public addCoupon (coupon: Coupon) {
		if (coupon.isExpired()) {
			throw new Error('Cupom expirado');
		}
		this.coupon = coupon;
	}

<<<<<<<< HEAD:checkout/src/model/entity/Order.ts
	public getTotal (): number {
========
	public getTotal () {
>>>>>>>> de2e0ed6e55129342af4d5bd0a9ea9626a6a68ee:src/model/entity/Order.ts
		let total = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotal();
			return total;
		}, 0);
		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}
		return total;
	}

	public getCode(): string {
		return this.orderCode.getOrderCode();
	}
}
