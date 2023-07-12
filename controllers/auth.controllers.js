const { validationResult } = require("express-validator");
const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');
const crearUsuario = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            errors: errors.mapped(),
        });
    }
    try {
        //validar si el email del usuario existe en la base de datos
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.json({
                msg: 'Un usuario ya existe en este correo',
            })
        }
        usuario = new Usuario(req.body);
        //encriptar la contraseña
        //usaremos la libreria bcrypt
        //cantidad de vueltas que queremos darle a la encriptacion
        //mientras mas vueltas le demos mas el grado de encriptacion
        //y mientras mayor el numero mas consumo de memoria tendra
        //por lo tanto sera menos optimo hay que dejarlo en 10
        const salt = bcrypt.genSaltSync(10);
        //es el hasheo espera la password y las vueltas que dijimos 
        //en la linea de arriba
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar el usuario en la DB
        await usuario.save();
        res.json({
            saludo: 'Usuario creado correctamente',
        });
    } catch (error) {
        console.log(error.mesagge);
        console.log("ya mandamos el error");
        res.json({
            msg: 'por favor contactate con el administrador',
        });
    }
};
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        res.json({
            errors: errors.mapped(),
        });
    }

    try {
        //validacion si existe el usuario
        let usuario = await Usuario.findOne({ email });
        console.log(usuario);
        console.log("onichan");
        if (!usuario) {
            return res.json({
                msg: 'No existe el usuario con ese email bro',
            })
        }
        //comprobacion de la contraseña
        const validarContrasenia = bcrypt.compareSync(password,usuario.password);
        if(!validarContrasenia){
            return res.json({
                msg:'Email o contraseña o ambos icorrecto no puedo decirte que esta mal',
            });
        };
        return res.json({
            msg:'Usuario logueado correctamente',
        });

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'por favor contactate con el administrador',
        });
    }
};
module.exports = {
    crearUsuario,
    loginUsuario,
};