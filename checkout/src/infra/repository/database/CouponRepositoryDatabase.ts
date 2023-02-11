
import Coupon from "../../../model/entity/Coupon";
import CouponRepository from "../../../model/repository/CouponRepository";
import Connection from "../../database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {

    constructor(readonly connection: Connection) {
    }

    async save(coupon: Coupon): Promise<void> {
        await this.connection.save('coupon', {
            'code': coupon?.code, 
            'percentage': coupon?.percentage, 
            'expire_date': coupon?.expirationDate
        });
    }
    async getCoupon(code: string): Promise<Coupon | undefined> {
        let [couponData] = await this.connection.query('SELECT * FROM coupon WHERE code = ?', [code]);
        couponData = couponData[0];
        return new Coupon(
            couponData?.code,
            couponData?.percentage,
            couponData?.expire_date
        );
    }

    async close(): Promise<void> {
        await this.connection.close();
    }

}