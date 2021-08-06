
const errorDefinitions = {
	400: {
		description: "Bad Request",
		model: "Bad request. The request is not correct, check the parameters and try again",
	},
	401: {
		description: "Unauthorized",
		model: "You are not authorized to access this resource",
	},
	403: {
		description: "Forbidden",
		model: "You are Forbidden to access this resource, check the credentials and try again",
	},
	404: {
		description: "Not Found",
		model: "Resource not found",
	},
	500: {
		description: "Internal Server Error",
		model: "Internal Server Error",
	},
};


const errorResponse = errorCodes =>  {
	const result = {};
	for (const key in errorCodes) {
		if (errorDefinitions[key]) {
			result[key] = errorDefinitions[key];
		}
	}
	return result;
};

module.exports = errorResponse;