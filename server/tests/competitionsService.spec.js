const competitionsService = require("../services/competitionsService");
const expectCompetitonJson = require("./expects/competitions.json");

describe("Competition Service Test", () => {

	test("Should fetch and show the competition for the 2018 Uefa Champions League with the team of Manchester Untd", async () => {
		const teamMatches = await competitionsService.getMatches(2001, 65, {"season": 2018});
		expect(teamMatches).toEqual(expectCompetitonJson);
	});
});