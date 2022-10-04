import Order from "../model/entity/Order";
import ItemRepository from "../model/repository/ItemRepository";

export class Preview {
    /**
     * recebe uma entrada (cpf, item, quantidade)
     * cria um pedido
     * adiciona cada item no pedido
     * retorna total
     */

    constructor(readonly itemRepository: ItemRepository) {
    }

    async execute(input: Input): Promise<number> {
        const order = Order.create(input.cpf);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        const total = order.getTotal();
        return total; 
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[]
}