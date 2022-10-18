import { Coordinate } from "./Coordinate";

export class Zipcode {
    constructor(readonly code: string, readonly street: string, readonly neighborhood: string, readonly coord: Coordinate) {
    }
}