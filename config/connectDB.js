const mongoose = require('mongoose');

const connectDB = async()=> {
    try {
        const options = {
            useUnifiedTopology : true, // to use the new engine of the mongoDB
            useNewUrlParser : true    // to enable the new pareser for parsing the connection string
        };

        await mongoose.connect(process.env.CONNECTION_STRING, options);
        return true;
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = connectDB;