const { v4 } = require("uuid");
const { saveCube } = require("../controllers/database")

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || "No name";
        this.description = description || "No description";
        this.imageUrl = imageUrl || "http://img.1more.com/2014/06/15/08/405c3a214e54408eb05b352096517e63.jpg";
        this.difficulty = difficulty || 1;
    }

    save(callback) {                    //save cube in local db
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }
        saveCube(newCube, callback);   // calling save service in database.js
    }
}

module.exports = Cube;