const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 5,
        match: [/^[A-Za-z0-9 ]+$/, "Accessory name is not valid!"],
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        minlength: 20,
        match: [/^[A-Za-z0-9 ]+$/, "Accessory description is not valid!"],
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

AccessorySchema.path("imageUrl").validate(function (url) {       // validation for valid url for the image link
    return url.startsWith("http://") || url.startsWith("https://");
}, "Image url is not valid");

module.exports = mongoose.model("Accessory", AccessorySchema)