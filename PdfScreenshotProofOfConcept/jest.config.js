module.exports = {
	setupFiles: [
		"./Scripts/src/tests/jestsetup.js"
	],
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/Scripts/src/components/$1",
		"^.+\\.(css|less|scss)$": "babel-jest",
	}
}
