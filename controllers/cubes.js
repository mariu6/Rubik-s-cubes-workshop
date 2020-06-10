const Cube = require("../models/cube");

async function getAllCubes() {
    return await Cube.find().lean();       // returns all the cubes. .lean() turns the mongoose object to plain js object
}

async function getCube(id) {
    return await Cube.findById(id).lean();
}

module.exports = {
    getAllCubes,
    getCube
}