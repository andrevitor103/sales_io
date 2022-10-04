import Order from "../model/entity/Order";
import ItemRepository from "../model/repository/ItemRepository";
import OrderRepository from "../model/repository/OrderRepository";

export class Checkout {
    /**
     * recebe uma entrada (cpf, item, quantidade)
     * cria um pedido
     * adiciona cada item no pedido
     * salva pedido
     */

    constructor(readonly orderRepository: OrderRepository, readonly itemRepository: ItemRepository) {
    }

    async execute(input: Input): Promise<void> {
        const order = Order.create(input.cpf);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        await this.orderRepository.save(order);
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[]
}