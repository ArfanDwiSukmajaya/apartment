const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try {
        const dbUrI = process.env.MONGODB_URI;
        await mongoose.connect(dbUrI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect to config");
    }catch (error) {
        console.error("Kesalahan koneksi ke config " + error);
    }
}
module.exports =  connectToDatabase;
