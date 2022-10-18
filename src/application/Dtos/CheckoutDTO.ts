export class CheckoutDTO {
    public readonly checkout: Checkout
    constructor(checkout: Checkout) {
        this.checkout = checkout
    }
}

type Checkout = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[],
    date?: Date
}
