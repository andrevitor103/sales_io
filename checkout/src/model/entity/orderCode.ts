
export class OrderCode {
    private code: string = "";
    constructor(date: Date, sequence: number) {
        this.generate(date, sequence);
    }

    public getOrderCode(): string {
        return this.code;
    }

    private generate(date: Date, sequence: number): void {
		const code = sequence.toString().padStart(8, "0");
		this.code = `${date.getFullYear().toString()}${code}`
	}
}