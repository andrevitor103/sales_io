export class PreviewDTO {
    public readonly preview: Preview
    constructor(preview: Preview) {
        this.preview = preview
    }
}

type Preview = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[]
}
