import Coupon from "../../../model/entity/Coupon";
import Order from "../../../model/entity/Order";
import OrderItem from "../../../model/entity/OrderItem";
import OrderRepository from "../../../model/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {
    }

    async getByCpf(cpf: string): Promise<Order[]> {
        const [ordersData] = await this.connection.query('SELECT * FROM orders WHERE cpf = ?', [cpf]);
        const orders: Order[] = [];
        console.log(ordersData);
        for (const orderData of ordersData) {
            const order = Order.create(orderData.cpf, orderData.issue_date, orderData?.sequence ?? '');
            const orderItemsData = await this.connection.query('SELECT * FROM order_item WHERE id_order = ?', [orderData.id_order]);
            for(const orderItemData of orderItemsData) {
                console.log(orderItemData);
                order.orderItems.push(new OrderItem(orderItemData?.id_item, orderItemData?.price, orderItemData?.quantity));
            }

            if (orderData?.coupon_code) {
                order.coupon = new Coupon(orderData?.coupon_code, orderData?.percentage);
            }
            order.freight = orderData.freight ?? 0;
            orders.push(order);
        }
        return orders;
    }
    //@todo: ver implementação
    count(): number {
        return 2;
    }

    //@todo: ver caso do frete
    async save(order: Order): Promise<void> {
        await this.connection.save('orders', {
            'coupon_code': order.coupon?.code ?? '',
            'coupon_percent': order.coupon?.percentage ?? 0,
            'code': order.orderCode.getOrderCode(),
            'cpf': order.cpf.value,
            'freight': 0
        });

        for(const orderItem of order.orderItems) {
            await this.connection.save('order_item', {
                'id_order_item': `${orderItem?.idItem}-16`,
                'id_order': 16,
                'id_item': orderItem?.idItem,
                'price': orderItem?.price,
                'quantity': orderItem?.quantity
            });
        }
    }

    async close(): Promise<void> {
        await this.connection.close();
    }
}