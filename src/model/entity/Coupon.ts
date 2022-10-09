export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {
	}
	
	isExpired(now: Date = new Date()): boolean {
		return this.expirationDate ?   now.getTime() > this.expirationDate.getTime() : false;
	}

	calculateDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}
