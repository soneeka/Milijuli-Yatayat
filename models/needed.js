var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// User Schema
var NeededSchema = mongoose.Schema({
	country: {
		type: String,
		index: true
	},
	city: {
		type: String
	},
	pickup: {
		type: Date
	},
	dropoff: {
		type: Date
	},
	fullname:{
		type: String
    },
    vehicleneeded:{
        type: String
    }
});

var Needed = module.exports = mongoose.model('Needed', NeededSchema);

module.exports.createNeeded = function(newNeeded, callback){
	newNeeded.save(callback);
}

