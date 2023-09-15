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
    // filesize: {
    //     type: Number,
    //     required: true
    // },
    img: {
        type: Array,
        required: true
    },
    downloadlink: {
        type: String,
    },
    // screenshots: [String],
    // placatgetform: {
    //     type: String,
    //     enum: ["pc", "playstation", "mobile", "xbox", "nitendo", "neogeo", "others", "action", "online"],
    //     required: true
    // },
    category: {
        type: String,
        required: true,
        enum: ['action', 'arcade', 'sports', 'racing', 'adventure', 'shooting', 'puzzle', 'playstation', 'nitendo', 'xbox', 'sega']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})

mongoose.models = {};

const gameCollection = mongoose.models.games || mongoose.model('games', gameSchema)

export default gameCollection; //export 