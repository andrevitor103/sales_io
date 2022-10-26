import { Dimension } from "../../../model/entity/Dimension";
import Item from "../../../model/entity/Item";
import ItemRepository from "../../../model/repository/ItemRepository";
import Connection from "../../database/Connection";


export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(readonly connection: Connection) {

    }

    async getItem(idItem: number): Promise<Item> {
        const [item] = await this.connection.query('SELECT * FROM item where id_item = ?', [idItem]);
        return new Item(
            item[0]?.id_item, 
            item[0]?.description, 
            item[0]?.price, 
            new Dimension(
            item[0]?.height,
            item[0]?.width,
            item[0]?.length,
            item[0]?.weight
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

}