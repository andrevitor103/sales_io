import { CalculateShipping } from "../../src/application/CalculateShipping";
import { CalculateShippingDTO } from "../../src/application/CalculateShippingDTO";
import ItemRepositoryInMemory from "../../src/infra/repository/memory/ItemRepositoryInMemory";
import { Dimension } from "../../src/model/entity/Dimension";
import Item from "../../src/model/entity/Item";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3));
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4, 10));
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10, 1));

test("Deve simular o valor do frete", async () => {
    /**
     * dado um conjunto de itens com suas quantidades
     * deve ser retornado o valor do frete
     */

    const orderItems = [
            { idItem: 1, quantity: 2 }
        ]

    const calculateShippingDto = new CalculateShippingDTO(orderItems);
    
    const itemRepository = new ItemRepositoryInMemory();
    itemRepository.save(itemOne);
    
    const calculateShipping = new CalculateShipping(itemRepository);
    
    const shippingTotal = await calculateShipping.execute(calculateShippingDto);

    expect(shippingTotal).toBe(60);
});
