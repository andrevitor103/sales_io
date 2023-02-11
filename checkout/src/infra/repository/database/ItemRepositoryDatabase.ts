import { Dimension } from "../../../model/entity/Dimension";
import Item from "../../../model/entity/Item";
import ItemRepository from "../../../model/repository/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(readonly connection: Connection) {
    }

    async getItem(idItem: number): Promise<Item> {
        let [item] = await this.connection.query('SELECT * FROM item where id_item = ? LIMIT 1', [idItem]);
        item = item[0];
        return new Item(
            item?.id_item, 
            item?.description, 
            item?.price, 
            new Dimension(
            item?.height,
            item?.width,
            item?.length,
            item?.weight
        ));
    }
    async save(item: Item): Promise<void> {
        await this.connection.save('item', {
            'id_item': item.idItem,
            'description': item.description,
            'price': item.price,
            'height':item.dimensions.height, 
            'width':item.dimensions.width,
            'length':item.dimensions.length,
            'weight':item.dimensions.weight
        });
    }

    async close(): Promise<void> {
        await this.connection.close();
    }
}