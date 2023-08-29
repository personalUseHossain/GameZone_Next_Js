import mongoose from "mongoose"; //mongoose


//user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
})

//user mode
mongoose.models = {};
const userCollection = mongoose.models.user || mongoose.model('users', userSchema);

export default userCollection; //export 
