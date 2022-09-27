import { IShippingCalculator } from "./IShippingCalculator";
import Item from "./Item";

export class ShippingCalculator implements IShippingCalculator {
    private MINUMUM_VALUE: number = 10;
    private distance: number;
    private item: Item;
    constructor(distance: number,item: Item) {
        this.distance = distance;
        this.item = item;
    }
    public calculate(): number {
        //distancia
        //volume
        //densidade
        const volume = this.item.dimensions.getVolume();
        const densidade = this.calculateDensity(this.item.weigth, volume);
        const shippingValue = ( this.distance * volume * ( densidade / 100 ));
        return shippingValue < this.MINUMUM_VALUE ? this.MINUMUM_VALUE : shippingValue;
    }
    
    private calculateDensity(weigth: number, volume: number): number {
		return (weigth / volume);
	}
}
