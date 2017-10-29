// server.js
// call the packages we need
var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var {routefinder} = require("./routefinder.js");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
console.log(port)
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

var sendDirections1 = function(req,res, next){
console.log(req.body);
var obj = new routefinder(8);
res.send("thanks");
}

router.post('/sendDirections' , [sendDirections1], function(req,res, next){
     console.log("user attempting to send directions");
     console.log("directions = ", req.body);
     res.send("thanks, we know where you are!");
     next()
          }, function (req, res) {
               res.send("some type of error");
     });


router.get('/', function(req, res) {
    console.log("here");
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
