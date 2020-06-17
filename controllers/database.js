// Here will be processed the read / write operations
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/user");


const databaseFile = path.join(__dirname, '../config/database.json');

function saveCube(newCube, callback) {              // receives new cube for save from cubeModel

    getCubes((cubes) => {                    // gets the cubes from the function below as array
        cubes.push(newCube);                 // add new cube to the database
        data = JSON.stringify(cubes);        // prepare to export to writeFile

        fs.writeFile(databaseFile, data, (err) => {       // writes the updated database
            if (err) {
                return console.log("Can't read file! Error: ", err);
            }
            console.log("New cube is successfully stored");
            callback();                                      // callback to be callded when the save is done
        })
    })
}

function getCube(id, callback) {
    getCubes((cubes) => {
        const cube = cubes.filter((c) => c.id === id)[0];   // filter returns arr, so [0]
        callback(cube);
    })
}

function getCubes(callbackFn) {                                  // Takes the data from the database, but response with a function(data) 
    fs.readFile(databaseFile, (err, dataBuffer) => {
        if (err) {
            return console.log("Can't read file! Error: ", err);
        }
        const cubes = JSON.parse(dataBuffer);    // array of objects

        callbackFn(cubes);
    })
}

module.exports = {
    saveCube,
    getCube,
    getCubes,
}