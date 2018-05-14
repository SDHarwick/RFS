const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();


//any time a PUT, PATCH etc req comes in this will parse the body and 
// assign it to the req.body property of the incoming request object
app.use(bodyParser.json());


// Extract cookie Data
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

//
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Ensure Express will serve up up prod assets i.e. main.js or main.css
	app.use(express.static('client/build'));
	// Express will serve up the main.html file
	// if it doesn't recognize the route
	const path = require('path');

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
