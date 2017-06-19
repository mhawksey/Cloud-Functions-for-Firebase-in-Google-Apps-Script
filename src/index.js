// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// Google APIs client library used to call Google Drive
var google = require('googleapis');

// Google Auth Library for Node.js
var googleAuth = require('google-auth-library');

// Request is designed to be the simplest way possible to make http calls
var request = require('request');

// our cloud function
// Takes a url, token and filename and fetches the file adding to Google Drive returning the file id
// More info on HTTP Triggers https://firebase.google.com/docs/functions/http-events 
exports.answerTheFetch = functions.https.onRequest((req, res) => {

	var token = req.query.token;
	var filename = req.query.filename || "temp_file";
	
	// writing to the Firebase log https://firebase.google.com/docs/functions/writing-and-viewing-logs 
	console.log(filename);
	
	// handling auth to write file to Drive
	var auth = new googleAuth();
	var oauth2Client = new auth.OAuth2();
	oauth2Client.setCredentials({
		access_token: token
	});

	// setting Drive access
	var drive = google.drive('v3');
	
	var media = {
		body: request(req.query.url)  //stream!
	};
	
	// create file on Drive
	drive.files.create({
			resource: {'name': filename},
			media: media,
			fields: 'id',
			auth: oauth2Client
		}, function(err, file) {
			if (err) {
				// Handle error
				console.log(err);
				res.send(err);
			} else {
				res.send(JSON.stringify({
					id: file.id
				}));
			}
		});
});