const mongoose = require('mongoose');

const planedTrips = mongoose.Schema({
    trip:Array,
    distances:Array,
    email:String,
    topic:String
});

module.exports = mongoose.model('PlanedTrips',planedTrips,'PlanedTrips')