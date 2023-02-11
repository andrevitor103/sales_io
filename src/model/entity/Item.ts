import { Dimension } from "./Dimension";

export default class Item {
	
	constructor (readonly idItem: number, readonly description: string, readonly price: number, readonly dimensions: Dimension, readonly weigth: number) {
		if (weigth < 0) {
			throw new Error('Item com peso inválido');
		}
	}
}
