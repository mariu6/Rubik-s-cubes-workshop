const fs = require("fs");
// const path = require("path");
const { getCubes } = require("./database");

function getAllCubes(callback) {
    getCubes((cubes) => {
        return callback(cubes);
    })
}

module.exports = {
    getAllCubes,
}