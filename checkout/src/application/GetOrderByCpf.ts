import OrderRepository from "../model/repository/OrderRepository";
import { GetOrderByCpfDTO } from "./Dtos/output/GetOrderByCpfDTO";

export default class GetOrderByCpf {

	constructor (readonly orderRepository: OrderRepository) {
	}

	async execute (cpf: string): Promise<GetOrderByCpfDTO[]> {
		const output = [];
		const orders = await this.orderRepository.getByCpf(cpf);
		for (const order of orders) {
			output.push({ code: order.getCode(), total: order.getTotal() });
		}
		return output;
	}
}
