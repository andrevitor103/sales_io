import GetOrderByCpf from '../../src/application/GetOrderByCpf';
import OrderRepositoryInMemory from '../../src/infra/repository/memory/OrderRepositoryInMemory';
import { Dimension } from '../../src/model/entity/Dimension';
import Item from '../../src/model/entity/Item';
import Order from '../../src/model/entity/Order';

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3));
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4, 10));
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10, 1));

test('Deve recuperar todos os pedidos de um cpf', async () => {
    
    const cpf = '112.592.099-89';

    const orderRepository = new OrderRepositoryInMemory();
    const orderOne = new Order(cpf, new Date(), 1);
    orderOne.addItem(itemOne, 1);
    orderOne.addItem(itemTwo, 1);
    orderOne.addItem(itemThree, 1);

    orderRepository.save(orderOne);

    const getOrderByCpf = new GetOrderByCpf(orderRepository);

    const orders = await getOrderByCpf.execute(cpf);

    expect(orders.length).toBe(1);
    expect(orders[0].total).toBe(6030);
});


test('Deve tentar recuperar todos os pedidos de um cpf sem pedidos', async () => {

    const orderRepository = new OrderRepositoryInMemory();

    const getOrderByCpf = new GetOrderByCpf(orderRepository);

    const orders = await getOrderByCpf.execute('');

    expect(orders.length).toBe(0);
});