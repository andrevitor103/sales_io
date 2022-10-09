import { ShippingCalculator } from "../model/entity/ShippingCalculator";
import ItemRepository from "../model/repository/ItemRepository";
import { CalculateShippingDTO } from "./CalculateShippingDTO";

export class CalculateShipping {
    /**
     * recebe uma entrada (item, quantidade)
     * recupera item com suas informações
     * calcula frete
     * retorna total
     */

    constructor(readonly itemRepository: ItemRepository) {
    }

    async execute(input: CalculateShippingDTO): Promise<number> {
        let shippingTotal = 0;
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            const shipping = new ShippingCalculator(1000, item);
            shippingTotal += ( shipping.calculate() * orderItem.quantity );
        }
        return shippingTotal;
    }
}
