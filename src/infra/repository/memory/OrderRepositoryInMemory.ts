import { Dimension } from "../../../model/entity/Dimension";
import Item from "../../../model/entity/Item";
import Order from "../../../model/entity/Order";
import OrderRepository from "../../../model/repository/OrderRepository";

export default class OrderRepositoryInMemory implements OrderRepository {
    private orders: Order[]

    constructor(){
        this.orders = [
        ]
    }

    async getByCpf(cpf: string): Promise<Order[]> {
        return this.orders.filter(order => order.cpf.value === cpf);
    }

    save(order: Order): void {
        this.orders.push(order);
    }

}
