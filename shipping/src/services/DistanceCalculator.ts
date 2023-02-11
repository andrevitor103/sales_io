import { Coordinate } from "../model/entity/Coordinate";
import { Distance } from "../model/entity/Distance";

export class DistanceCalculator {
    
    public static calculate(from: Coordinate, to: Coordinate): Distance {

        if ( this.isSameCoordinates(from, to) ) return new Distance(0);
        
        const radlat1 = this.calculateRadius(from.latitude);
        const radlat2 = this.calculateRadius(to.latitude);
        const theta = from.longitude - to.longitude;
        const radtheta = this.calculateRadius(theta);
        
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        if (dist > 1) dist = 1;
        
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = this.convertMilesToKm(dist); //convert miles to km
        dist =+ dist.toPrecision(4);
        
        return new Distance(dist);
    }

    private static calculateRadius(value: number): number {
        return ( ( Math.PI * value ) / 180 );
    }

    private static convertMilesToKm(miles: number): number {
        return miles * 1.609344;
    }

    private static isSameCoordinates(from: Coordinate, to: Coordinate): boolean {
        return  ( from.latitude == to.latitude && from.longitude == to.longitude );
    }    
}