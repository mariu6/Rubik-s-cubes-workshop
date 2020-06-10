const mongoose = requre("mongoose");

const AccessorySchema = new monpgoose.Schema({
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
    cubes: [{
        type: "ObjectId",
        ref: "Cube",   // reference to the cubes model 
    }],
})

module.exports = mongoose.model("Accessory", AccessorySchema)