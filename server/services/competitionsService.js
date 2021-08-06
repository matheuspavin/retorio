const { fetchUrl } = require("../utils/urlFetcher");
const  teamsService = require("./teamsService");

const urlBase = "http://api.football-data.org/v2";

const getMatches = async (competitionId, team, query)  => {
	const { season } = query;
	if (!competitionId || !team)  {
		throw new Error();
	}
	const { matches } = await fetchUrl(`${urlBase}/competitions/${competitionId}/matches?season=${season}`);
	return teamsService.teamFilterMatches(team, matches);
};

module.exports = {
	getMatches,
};