const Cube = require("../models/cubeModel");

const newCube = new Cube("TestCube4", "This is a default 4 cube", "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg", 1)

// console.log(newCube);

newCube.save()