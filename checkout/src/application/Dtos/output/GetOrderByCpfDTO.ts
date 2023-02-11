export class GetOrderByCpfDTO {
    constructor( public readonly total: number, public readonly  code: string) {
        this.total = total;
        this.code = code;
    }
}
