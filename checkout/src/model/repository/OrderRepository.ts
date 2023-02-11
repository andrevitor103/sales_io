import Order from "../entity/Order";

export default interface OrderRepository {
    getByCpf(cpf: string):Promise<Order[]>;
    save(order: Order): void;
    count(): number;
}
