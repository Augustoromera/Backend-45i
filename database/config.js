const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log("conectado a la base de datos");
    } catch (error) {
        console.log(error);
    }

};
module.exports = { dbConnection };