import { Distance } from "./Distance";
import { IShippingCalculator } from "./IShippingCalculator";
import Item from "./Item";


export class ShippingCalculator implements IShippingCalculator {
    private MINUMUM_VALUE: number = 10;
    public readonly distance: Distance;
    private item: Item;
    constructor(distance: Distance, item: Item) {
        this.distance = distance;
        this.item = item;
    }

    public calculate(): number {
        //distancia
        //volume
        //densidade
        const volume = this.item.dimensions.getVolume();
        const densidade = this.item.dimensions.getDensity();
        const shippingValue = (this.distance.distance * volume * (densidade / 100));
        return shippingValue < this.MINUMUM_VALUE ? this.MINUMUM_VALUE : shippingValue;
    }
}
