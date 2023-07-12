const { Schema, model } = require('mongoose');
const usuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // confirmPassword: {
    //     type: String,
    //     required: true,
    // },
    // edad: {
    //     type: Number,
    //     required: true,
    // },
    rol: {
        type: String,
        default: 'usuario',
    },
});
module.exports = model('Usuario', usuarioSchema);
