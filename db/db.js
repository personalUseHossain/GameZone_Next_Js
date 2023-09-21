import mongoose from 'mongoose' //mongoose


//conneting to database
export async function connect() {
    try {
        mongoose.set("bufferTimeoutMS", 30000)
        mongoose.set("maxTimeMS", 30000)
        mongoose.connect(process.env.DB_URL);
        const connetion = mongoose.connection;

        connetion.on('connected', () => {
            console.log("connected with database")
        })
        connetion.on('error', (err) => {
            console.log('error occur when connetion to database', err)
        })
    } catch (err) {
        console.log(err)
    }
}