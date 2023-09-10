import mongoose from "mongoose"; //mongoose

//game schema
const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    filesize: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    downloadlink: {
        type: String,
    },
    screenshots: [String],
    platform: {
        type: String,
        enum: ["pc", "playstation", "mobile", "xbox", "nitendo", "neogeo", "others", "action", "online"],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})

mongoose.models = {};

const gameCollection = mongoose.models.game || mongoose.model('game', gameSchema)

export default gameCollection; //export 