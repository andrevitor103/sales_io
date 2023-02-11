import CalculateFreight from "./application/CalculateShipping";
import KnexConnection from "./infra/database/KnexConnection";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ZipcodeRepositoryDatabase from "./infra/repository/database/ZipCodeRepositoryDatabase";
import RestController from "./infra/controllers/RestController";

const connection = new KnexConnection();
const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
const simulateFreight = new CalculateFreight(zipcodeRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttp();
new RestController(httpServer, simulateFreight);
httpServer.listen(3001);
