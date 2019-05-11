var express = require('express');
var router = express.Router();

// var Needed = require('../models/needed');


/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

router.post('/', ensureAuthenticated,function(req, res, next) {
	var country = req.body.country;
	var city = req.body.city;
	var pickup = req.body.pickup;
	var dropoff= req.body.dropoff;
	var fullname = req.body.fullname;
	var vehicleneeded = req.body.vehicleneeded;
	
	// Form Validator
	req.checkBody('country','Country field is required').notEmpty();
	req.checkBody('city','City field is required').notEmpty();
	req.checkBody('pickup','Pickup is not valid').notEmpty();
	req.checkBody('dropoff','DropOff field is required').notEmpty();
	req.checkBody('fullname','FullName field is required').notEmpty();
	req.checkBody('vehicleneeded','VehicleNeeded Field is required').notEmpty();
	
	// Check Errors
	var errors = req.validationErrors();
	
	if(errors){
			res.render('index', {
					errors: errors
			});
	} else{
			var newNeeded = new Needed({
			country: country,
			city: city,
			pickup: pickup,
			dropoff: dropoff,
			fullname: fullname,
			vehicleneeded: vehicleneeded
			});
	
			Needed.createNeeded(newNeeded, function(err, needed){
				console.log('ghgf');
			if(err) throw err;
			console.log(needed);
			});
			req.flash('success', 'You requested a vehicle');
	
			res.location('/');
			res.redirect('/');
	}
	});

module.exports = router;
