const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = {
	definition: {
		info: {
			title: "Football data API",
			description: "API To retrieve data from football matches"
		},
		servers: ["http://localhost:4300"],
	},
	apis: ["./server/routers/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);



module.exports = swaggerDocs;
