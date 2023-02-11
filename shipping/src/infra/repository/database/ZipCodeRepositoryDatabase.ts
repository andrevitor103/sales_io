import ZipcodeRepository from "../../../model/repository/ZipcodeRepository";
import Connection from "../../database/Connection";
import Zipcode from "../../../model/entity/Zipcode";
import Coord from "../../../model/entity/Coord";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {

	constructor (readonly connection: Connection) {
	}

	save(zipcode: Zipcode): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getByCode(code: string): Promise<Zipcode> {
		const zipcodeData = await this.connection.query("select * from salesio.zipcode where code = ?", [code]).then((data) => data[0][0]);
		if (!zipcodeData) throw new Error("Zipcode not found");
		const zipcode = new Zipcode(zipcodeData.code, zipcodeData.street, zipcodeData.neighborhood, new Coord(parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long)));
		return zipcode;
	}
}
