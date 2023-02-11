import CouponRepository from "../model/repository/CouponRepository";
import { ValidateCouponDTO } from "./Dtos/ValidateCouponDTO";

export class ValidateCoupon {
    /**
     * recebe uma entrada (cpf, item, quantidade)
     * deve retornar se um cupom é valido
     */

    constructor(readonly couponRepository: CouponRepository) {
    }

    async execute(input: ValidateCouponDTO): Promise<boolean|void> {
        const coupon = (await this.couponRepository.getCoupon(input.coupon.code));
        if(!coupon) return false; 

        return coupon.isExpired(input.coupon.date);
    }
}

type Input = {
    date?: Date,
    code: string
}