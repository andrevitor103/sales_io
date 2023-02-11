import { Coordinate } from "../../model/entity/Coordinate"

export class CalculateShippingDTO {
    public readonly orderItems: input
    constructor(orderItems: input) {
        this.orderItems = orderItems
    }
}

type input = {
    OrderItems: {
     idItem: number, 
     quantity: number
    }[],
    from: string, 
    to: string
    }