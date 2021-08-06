const { fetchUrl } = require("../utils/urlFetcher");

const urlBase = "http://api.football-data.org/v2";

const getAll = async function () {
	return fetchUrl("http://api.football-data.org/v2/teams/65");
};

const getTeam = async id => {
	if (!id)  {
		throw new Error("Team ID is invalid");
	} 
	return await fetchUrl(`${urlBase}/teams/${id}`);
};

const teamFilterMatches = async (team, matches) => {
	const teamId = parseInt(team);
	function teamMatches(event) {
		return (parseInt(event.homeTeam.id) === teamId || parseInt(event.awayTeam.id) === teamId);
	}
	const teamFetch = await getTeam(teamId);

	const teamInfo = {
		team: {
			name: teamFetch.name,
			address: teamFetch.address,
			email: teamFetch.email,
			telephone: teamFetch.telephone
		}
	};
	
	//Todo create a object and extend from there
	const teamObject = {
		...teamInfo,
		...teamFilter(teamId, matches.filter(teamMatches))
	};
	
	return teamObject;
};

const teamFilter = (teamId, teamMatches) => {
	let matchesResults = {};
	const scores = {
		"homeMatches" : 0,
		"awayMatches": 0

	};
	let matchWinner = false;
	let homeTeam = false;
	let seasonGoals = 0;

	for (const match of teamMatches) {
		if (match.homeTeam.id === teamId) {
			homeTeam = true;
			scores.homeMatches ++;
			if (match.score.winner.toLowerCase() === "HOME_TEAM".toLowerCase()) {
				matchWinner = true;
			} else {
				matchWinner = false;
			}
		} else if (match.awayTeam.id === teamId) {
			scores.awayMatches ++;
			homeTeam = false;
			if (match.score.winner.toLowerCase() === "AWAYTEAM".toLowerCase()) {
				matchWinner = true;
			} else {
				matchWinner = false;
			}
		}

		seasonGoals += homeTeam ? match.score.fullTime.homeTeam : match.score.fullTime.awayTeam;
		const result = {
			[match.id]: {
				"matchWinner": matchWinner,
				"homeTeam": homeTeam,
				"score": homeTeam ? match.score.fullTime.homeTeam : match.score.fullTime.awayTeam
			}
		};

		matchesResults = {...matchesResults, ...result};
	}
	const averageGoals = (seasonGoals/teamMatches.length).toFixed(2);
	matchesResults = {...matchesResults, ...scores, ...{ "seasonGoals": seasonGoals}, ...{"averageGoals": averageGoals}};
	return matchesResults;

};

module.exports = {
	getAll,
	getTeam,
	teamFilterMatches,
	teamFilter
};