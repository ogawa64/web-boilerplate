module.exports = {
    "env": {
        "browser": true,
        "es6": true,
				"node": true,
				"commonjs": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
			"indent": [
					"error",
					"tab"
			],
			"linebreak-style": [
					"error",
					"unix"
			],
			"no-console": 1,
			"quotes": [
					"error",
					"single"
			],
			"semi": [
					"error",
					"always"
			]
    }
};
