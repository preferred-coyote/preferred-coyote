//Create a file named 'local.env.example.js'

'use strict';

// Use local.env.js for environment variables that gulp will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
		FACEBOOK_ID: 'coyotekey',
		FACEBOOK_SECRET: 'coyotesecret',

		// Control debug level for modules using visionmedia/debug
		DEBUG: ''