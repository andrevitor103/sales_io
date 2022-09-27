export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {
	}
	
	isExpired(): boolean {
		return this.expirationDate ? this.expirationDate.getTime() < new Date().getTime() : false;
	}

	calculateDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}
