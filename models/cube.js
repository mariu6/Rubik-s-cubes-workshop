const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 6,
    },
    accessories: [{
        type: "ObjectId",
        ref: "Accessory",
    }],
})

module.exports = mongoose.model("Cube", CubeSchema)