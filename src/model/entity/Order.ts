import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
	cpf: Cpf;
	orderItems: OrderItem[];
	coupon?: Coupon;

	constructor (cpf: string) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
	}
	
	addItem (item: Item, quantity: number) {
		if ( this.isDuplicated(item) ) {
			throw new Error('Item já adicionado no pedido');
		}
		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
	}

	private isDuplicated(newItem: Item): boolean {
		return this.orderItems.filter((item) => item.idItem == newItem.idItem).length > 0;
	}

	addCoupon (coupon: Coupon) {
		if (coupon.isExpired()) {
			throw new Error('Cupom expirado');
		}
		this.coupon = coupon;
	}

	getTotal () {
		let total = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotal();
			return total;
		}, 0);
		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}
		return total;
	}
}
