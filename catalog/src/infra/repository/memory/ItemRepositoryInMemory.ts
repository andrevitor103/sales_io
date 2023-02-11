import Item from "../../../model/entity/Item";
import ItemRepository from "../../../model/repository/ItemRepository";

export default class ItemRepositoryInMemory implements ItemRepository {
    private items: Item[]

    constructor(){
        this.items = []
    }

    async getItem(idItem: number): Promise<Item> {
        const item = this.items.find(item => item.idItem === idItem);
        if(!item) throw new Error('Item not found');
        return item;
    }

    save(item: Item): void {
        this.items.push(item);
    }

}