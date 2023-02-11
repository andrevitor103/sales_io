import { Zipcode } from "../entity/Zipcode";

export default interface ZipcodeRepository {
    getByCode(code: string): Promise<Zipcode>;
    save(zipcode: Zipcode): Promise<void>;
}
