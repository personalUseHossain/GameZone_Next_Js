import mongoose from 'mongoose'

export async function connect() {
    try {
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