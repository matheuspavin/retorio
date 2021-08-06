const router = require("express").Router();
const teamsService = require("../services/teamsService");


/**
 * @swagger
 * paths: 
 *  /tams/{idTeam}/:
 *    get:
 *      parameters:
 *        - in: path
 *          idTeam: idTeam
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the team to get
 *      responses:
 *          200: 
 *            description: 'A successfull request'
 * 				
 */
router.get("/:id", async (req, res, next) => {
	try {
		const result = await teamsService.getTeam(req.params.id);
		return res.send(result);
	} catch (error) {
		console.log("error", error);
		res.status(422);
		next(error);
	}
});

module.exports = router;