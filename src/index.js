'use strict';
//helped with the french tuto there : https://www.supinfo.com/articles/single/3246-realisez-bot-facebook-messenger-nodejs
// some code was taken from https://github.com/matthewericfisher/fb-robot

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
//import our own functions
const verifyWebhook = require('./FBCommunications/verify-webhook');
const handleChat = require('./FBCommunications/handleChat');
var app = express();

// Set template engine in Express
app.set("view engine", "ejs");

app.set('port', process.env.PORT || config.get("PORT"));
app.use(bodyParser.json());

app.get('/webhook', function(req, res) {
    verifyWebhook(req, res);
});

app.post('/webhook/',  (req, res) => {
	handleChat(req, res);
})
app.get("/", function(req, res) {
	res.render("index");
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});