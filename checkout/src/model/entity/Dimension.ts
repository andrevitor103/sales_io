
export class Dimension {
    constructor(readonly height: number, readonly width: number, readonly length: number, readonly weight: number) {
        if (height < 0 || width < 0 || length < 0 || weight < 0) {
            throw new Error('Item com dimensões inválidas');
        }
    }
    public getVolume(): number {
        return (this.width/100) * (this.height/100) * (this.length/100);
	}

    public getDensity(): number {
        return (this.weight/this.getVolume());
    }
}
