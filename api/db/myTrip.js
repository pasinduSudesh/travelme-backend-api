const mongoose = require('mongoose');

const planedTrips = mongoose.Schema({
    trip:Array,
    dictances:Array,
    email:String,
    topic:String
});

module.exports = mongoose.model('PlanedTrips',planedTrips,'PlanedTrips')