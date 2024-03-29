import GetItem from "../../src/application/GetItem";
import Dimension from "../../src/model/entity/Dimension";
import Item from "../../src/model/entity/Item";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryInMemory";

test("Deve obter o item", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)));
	const getItem = new GetItem(itemRepository)
	const item = await getItem.execute(1);
	expect(item.price).toBe(1000);
});