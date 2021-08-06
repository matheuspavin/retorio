const router = require("express").Router();
const competitionsService = require("../services/competitionsService");

/**
 * @swagger
 * paths: 
 *  /competitions/{idCompetition}/team/{idTeam}/matches:
 *    get:
 *      parameters:
 *        - in: path
 *          idCompetition: idCompetition
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the competition to get
 *        - in: path
 *          team: idTeam
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the team to get
 *        - in: query
 *          season: seasonYear
 *          schema:
 *            type: integer
 *          required: false
 *          description: Year of the season
 *      responses:
 *          '200': 
 *            description: a competition scores object
 *            content:
 *              'application/json':
 *                schema:
 *                  type: object
 *                  properties:
 *                    matches:
 *                      type: array
 *                      description: the matches that the specific team played
 *                    homeMatches:
 *                      type: integer
 *                      description: How many matches the team played at home
 *                    awayMatches:
 *                      type: integer
 *                      description: How many matches the team played away from home
 *                    seasonGoals:
 *                      type: integer
 *                      description: How many goals the team scored during the season
 *                    averageGoals:
 *                      type: integer
 *                      description: Average of goals during the season
 *                    team:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          description: Name of the team
 *                        address:
 *                          type: string
 *                          description: Address of the team
 *                        email:
 *                          type: string
 *                          description: email of the team
 *                        telephone:
 *                          type: string
 *                          description: telephone of the team
 */

router.get("/:competitionId/team/:idTeam/matches", async (req, res, next) => {
	try {
		const result = await competitionsService.getMatches(req.params.competitionId, req.params.idTeam, req.query);
		return res.send(result);
	} catch (error) {
		next(error);
	}
});


module.exports = router;