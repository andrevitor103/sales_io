import { Preview } from "../src/application/Preview";
import ItemRepositoryInMemory from "../src/infra/repository/memory/ItemRepositoryInMemory"
import { Dimension } from "../src/model/entity/Dimension";
import Item from "../src/model/entity/Item";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3);
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4), 10);
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10), 1);

test('Deve simular um pedido', async () => {
    //dado

    const input = {
        cpf: '198.454.187-08',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 2}
        ]
    }    
    const itemRepository = new ItemRepositoryInMemory();
    itemRepository.save(itemOne);
    itemRepository.save(itemTwo);
    itemRepository.save(itemThree);

    const preview = new Preview(itemRepository);

    //quando

    const total = await preview.execute(input);

    //então

    expect(total).toBe(6060);
})
