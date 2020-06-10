const Accessory = require("../models/accessory");

async function getAccessories() {
    return await Accessory.find().lean();       // returns all the cubes.   .lean() turns the mongoose object to plain js object
}

module.exports = {
    getAccessories,
}