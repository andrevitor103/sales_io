export class CalculateShippingDTO {
    public readonly orderItems: OrderItems
    constructor(orderItems: OrderItems) {
        this.orderItems = orderItems
    }
}

type OrderItems = 
    { idItem: number, quantity: number }[]