const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi= require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 4300;


const teamsRouter = require("./server/routers/teamsRouter");
const competitionsRouter = require("./server/routers/competitionsRouter");
const swaggerDocs = require("./docs/basic-info");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/team", express.static("team/"));

app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	next();
});

app.use("/teams", teamsRouter);
app.use("/competitions", competitionsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const errorHandler = function (error, req, res, next) {
	const statusCode = res.statusCode ? res.statusCode : 500;
	res.status(statusCode).send({ message: error.message ? error.message : "server error" });
	next();
};

app.use(errorHandler);
app.listen(port);

console.log("API started on: " + port);