import Coupon from "../../../model/entity/Coupon";
import CouponRepository from "../../../model/repository/CouponRepository";

export default class CouponRepositoryInMemory implements CouponRepository {
    private coupon: Coupon[]

    constructor(){
        this.coupon = []
    }

    save(coupon: Coupon): void {
        this.coupon.push(coupon);
    }

    async getCoupon(code: string): Promise<Coupon | undefined> {
        return this.coupon.find(coupon => coupon.code === code);
    }

}