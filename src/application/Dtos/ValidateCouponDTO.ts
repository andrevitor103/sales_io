export class ValidateCouponDTO {
    public readonly coupon: Coupon
    constructor(coupon: Coupon) {
        this.coupon = coupon
    }
}

type Coupon = {
    date?: Date,
    code: string
}
