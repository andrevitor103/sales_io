import Order from "../model/entity/Order";
import CouponRepository from "../model/repository/CouponRepository";
import ItemRepository from "../model/repository/ItemRepository";
import OrderRepository from "../model/repository/OrderRepository";
import { ValidateCouponDTO } from "./Dtos/ValidateCouponDTO";

export class ValidateCoupon {
    /**
     * recebe uma entrada (cpf, item, quantidade)
     * deve retornar se um cupom é valido
     */

    constructor(readonly couponRepository: CouponRepository) {
    }

    async execute(input: ValidateCouponDTO): Promise<boolean> {
        const coupon = (await this.couponRepository.getCoupon(input.coupon.code));
        if(!coupon) throw new Error('Coupon not found'); 
        return coupon.isExpired(input.coupon.date);
    }
}

type Input = {
    date?: Date,
    code: string
}