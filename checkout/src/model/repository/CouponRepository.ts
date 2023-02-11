import Coupon from "../entity/Coupon";

export default interface couponRepository {
    save(coupon: Coupon): void;
    getCoupon(code: string): Promise<Coupon | undefined>;
}
