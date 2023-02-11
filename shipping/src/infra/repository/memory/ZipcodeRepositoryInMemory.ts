import Zipcode from "../../../model/entity/Zipcode";
import ZipcodeRepository from "../../../model/repository/ZipcodeRepository";

export default class ZipcodeRepositoryInMemory implements ZipcodeRepository {
    private zipcodes: Zipcode[]

    constructor(){
        this.zipcodes = [];
    }

    async getByCode(code: string): Promise<Zipcode> {
        const zipcode = this.zipcodes.find(Zipcode => Zipcode.code === code);
        if (!zipcode) throw new Error('Zipcode não encontrado');
        return zipcode;
    }

    async save(zipcode: Zipcode): Promise<void> {
        this.zipcodes.push(zipcode);
    }

}
