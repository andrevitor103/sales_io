
export class Dimension {
    constructor(readonly height: number, readonly width: number,readonly density: number) {
        if (height < 0 || width < 0 || density < 0) {
            throw new Error('Item com dimensões inválidas');
        }
    }
    public getVolume(): number {
		return ((this.height * this.width * this.density)/1000000);
	}
}
