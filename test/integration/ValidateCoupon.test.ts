import { ValidateCouponDTO } from "../../src/application/Dtos/ValidateCouponDTO";
import { ValidateCoupon } from "../../src/application/ValidateCoupon";
import CouponRepositoryInMemory from "../../src/infra/repository/memory/CouponRepositoryInMemory";
import Coupon from "../../src/model/entity/Coupon";

test("deve validar um cupom", async () => {
    //dado
    const input = {
        date: new Date("2022-10-10T10:00:00"),
        code: "AADAMS20"   
    }

    const validateCouponDto = new ValidateCouponDTO(input);
    const couponRepository = new CouponRepositoryInMemory();
    couponRepository.save(new Coupon("AADAMS20", 20, new Date("2022-10-08T10:00:00")));

    //quando
    const validateCoupon = new ValidateCoupon(couponRepository);
    const isValid = await validateCoupon.execute(validateCouponDto);

    //então

    expect(isValid).toBeTruthy();

});

test("deve tentar validar um cupom que não existe", async () => {
    //dado
    const input = {
        date: new Date("2022-10-10T10:00:00"),
        code: "AADAMS20"   
    }

    const validateCouponDto = new ValidateCouponDTO(input);
    const couponRepository = new CouponRepositoryInMemory();

    //quando
    const validateCoupon = new ValidateCoupon(couponRepository);

    //então
    try {
        await validateCoupon.execute(validateCouponDto)
    } catch(error) {
    }
});
