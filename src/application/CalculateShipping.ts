import { Coordinate } from "../model/entity/Coordinate";
import { Distance } from "../model/entity/Distance";
import { DistanceCalculator } from "../services/DistanceCalculator";
import { ShippingCalculator } from "../model/entity/ShippingCalculator";
import ItemRepository from "../model/repository/ItemRepository";
import { CalculateShippingDTO } from "./Dtos/CalculateShippingDTO";
import ZipcodeRepository from "../model/repository/ZipcodeRepository";

export class CalculateShipping {
    /**
     * recebe uma entrada (item, quantidade)
     * recupera item com suas informações
     * calcula frete
     * retorna total
     */

    constructor(readonly itemRepository: ItemRepository, readonly zipcodeRepository: ZipcodeRepository) {
    }

    async execute(input: CalculateShippingDTO): Promise<number> {
        let shippingTotal = 0;
        let distance = new Distance(0);

        if (input.orderItems.from && input.orderItems.to) {
            const from = await this.zipcodeRepository.getByCode(input.orderItems.from);
            const to = await this.zipcodeRepository.getByCode(input.orderItems.to);
            distance = DistanceCalculator.calculate(from.coord, to.coord);
        }
        for (const orderItem of input.orderItems.OrderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);

            const shipping = new ShippingCalculator(distance, item);
            shippingTotal += ( shipping.calculate() * orderItem.quantity );
        }
        return shippingTotal;
    }
}
