const Cube = require("../models/cube");

async function getAllCubes() {
    return await Cube.find().lean();       // returns all the cubes. .lean() turns the mongoose object to plain js object
}

async function getCube(id) {
    return await Cube.findById(id).lean();
}

async function getCubeWithAccessories(id) {
    return await Cube.findById(id).populate("accessories").lean();  // returns the cube with [array of objects] on the place of the array with accessoires's ids
}

async function updateCube(cubeId, accessoryId) {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {                       // mongoose ives us the option to update array as set (no duplication)
            accessories: [accessoryId]
        }
    })
}

module.exports = {
    getAllCubes,
    getCube,
    updateCube,
    getCubeWithAccessories,
}