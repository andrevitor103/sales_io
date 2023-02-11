import { Checkout } from "../src/application/Checkout";
import GetOrderByCpf from "../src/application/GetOrderByCpf";
import ItemRepositoryInMemory from "../src/infra/repository/memory/ItemRepositoryInMemory"
import OrderRepositoryInMemory from "../src/infra/repository/memory/OrderRepositoryInMemory";
import { Dimension } from "../src/model/entity/Dimension";
import Item from "../src/model/entity/Item";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3);
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4), 10);
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10), 1);

test('Deve realizar um pedido', async () => {
    //dado

    // entrada (cpf, item, quantidade)
    // criar um pedido
    // adicionar itens no pedido
    // salvar pedido
    const input = {
        cpf: '198.454.187-08',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 2}
        ]
    }
    const itemRepository = new ItemRepositoryInMemory();
    const orderRepository = new OrderRepositoryInMemory();
    itemRepository.save(itemOne);
    itemRepository.save(itemTwo);
    itemRepository.save(itemThree);
    const checkout = new Checkout(orderRepository, itemRepository);
    //quando
    await checkout.execute(input);
    const getOrdersByCpf = new GetOrderByCpf(orderRepository);
    const orders = await getOrdersByCpf.execute('198.454.187-08');
    //então
    expect(orders).toHaveLength(1);
    expect(orders[0].total).toBe(6060);
})