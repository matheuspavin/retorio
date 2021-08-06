const axios = require("axios");

const headers = {
	headers: {
		"X-Auth-Token":"bc17970f2a5348f893d8850f1fc2c5a9"
	}
};

exports.fetchUrl = async url => {
	try {
		const response = await axios.get(url, headers);
		return response.data;
	} catch (error) {
		console.log("error", error.response);
		throw new Error(error);
	}
};