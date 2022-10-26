import { CalculateShipping } from "../../src/application/CalculateShipping";
import { CalculateShippingDTO } from "../../src/application/Dtos/CalculateShippingDTO";
import KnexConnection from "../../src/infra/database/KnexConnection";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryInMemory from "../../src/infra/repository/memory/ItemRepositoryInMemory";
import ZipcodeRepositoryInMemory from "../../src/infra/repository/memory/ZipcodeRepositoryInMemory";
import { Coordinate } from "../../src/model/entity/Coordinate";
import { Dimension } from "../../src/model/entity/Dimension";
import Item from "../../src/model/entity/Item";
import { Zipcode } from "../../src/model/entity/Zipcode";

let itemOne: Item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3));
let itemTwo: Item = new Item(2, "Amplificador", 5000, new Dimension(10, 20, 4, 10));
let itemThree: Item = new Item(3, "Cabo", 30, new Dimension(10, 15, 10, 1));

let zipcodeOne: Zipcode = new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coordinate(-27.5945, -48.5477));
let zipcodeTwo: Zipcode = new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coordinate(-22.9129, -43.2003));

test("Deve simular o valor do frete", async () => {
    /**
     * dado um conjunto de itens com suas quantidades
     * deve ser retornado o valor do frete
     */

    const input = {
        OrderItems: [{
         idItem: 1, 
         quantity: 2
        }],
        from: "88015600", 
        to: "22060030"
    }


    const calculateShippingDto = new CalculateShippingDTO(input);
    
    //const itemRepository = new ItemRepositoryInMemory();
    
    const connection = new KnexConnection();
    const itemRepository = new ItemRepositoryDatabase(connection);
    itemRepository.save(itemOne);

    const zipcodeRepository = new ZipcodeRepositoryInMemory();
    zipcodeRepository.save(zipcodeOne);
    zipcodeRepository.save(zipcodeTwo);
    
    const calculateShipping = new CalculateShipping(itemRepository, zipcodeRepository);
    
    const shippingTotal = await calculateShipping.execute(calculateShippingDto);

    expect(shippingTotal).toBe(44.892);

});

test("O valor do frete deve ser zero, quando ceps iguais", async () => {
    /**
     * dado um conjunto de itens com suas quantidades
     * deve ser retornado o valor do frete
     */

    const input = {
        OrderItems: [{
         idItem: 2, 
         quantity: 2
        }],
        from: "88015600", 
        to: "88015600"
    }


    const calculateShippingDto = new CalculateShippingDTO(input);
    
    const connection = new KnexConnection();
    const itemRepository = new ItemRepositoryDatabase(connection);

    itemRepository.save(itemTwo);

    const zipcodeRepository = new ZipcodeRepositoryInMemory();
    zipcodeRepository.save(zipcodeOne);
    zipcodeRepository.save(zipcodeTwo);
    
    const calculateShipping = new CalculateShipping(itemRepository, zipcodeRepository);
    
    const shippingTotal = await calculateShipping.execute(calculateShippingDto);
    const expectedValueWithoutShipping = 20;
    expect(shippingTotal).toBe(expectedValueWithoutShipping);

});
