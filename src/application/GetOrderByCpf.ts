import OrderRepository from "../model/repository/OrderRepository";

export default class GetOrderByCpf {

	constructor (readonly orderRepository: OrderRepository) {
	}

	async execute (cpf: string): Promise<Output[]> {
		const output = [];
		const orders = await this.orderRepository.getByCpf(cpf);
		for (const order of orders) {
			output.push({ code: order.getCode(), total: order.getTotal() });
		}
		return output;
	}
}

type Output = {
	total: number,
	code: string
}
