import CalculateShipping from "../../application/CalculateShipping";
import HttpServer from "../http/HttpServer";

export default class OrderController {

	constructor (
		readonly httpServer: HttpServer,
		readonly CalculateShipping: CalculateShipping
	) {

		httpServer.on("post", "/CalculateShipping", async function (params: any, body: any) {
			console.log(body);
			const shipping = await CalculateShipping.execute(body)
			return shipping;
		});
		
	}
}
