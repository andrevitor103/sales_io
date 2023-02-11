import CalculateFreight from "../../src/application/CalculateShipping";
import ZipcodeRepositoryInMemory from "../../src/infra/repository/memory/ZipcodeRepositoryInMemory";

test.skip("Deve simular o frete", async function () {
	const zipcodeRepository = new ZipcodeRepositoryInMemory();
	const calculateFreight = new CalculateFreight(zipcodeRepository);
	const input = {
		orderItems: [
			{ volume: 0.03, density:  100, quantity: 1 }
		]
	}
	const freight = await calculateFreight.execute(input);

	expect(freight).toBe(30);
});

test.skip("Deve simular o frete calculando a distância", async function () {
	const zipcodeRepository = new ZipcodeRepositoryInMemory();
	const calculateFreight = new CalculateFreight(zipcodeRepository);
	const input = {
		orderItems: [
			{ volume: 0.03, density: 100, quantity: 1 }
		],
		from: "88015600",
		to: "22060030"
	}
	const freight = await calculateFreight.execute(input);
	expect(freight).toBe(22.446653340244893);
});
