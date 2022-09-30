import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import { emailExiste } from "../helpers/dbValidators.js"

const router = express.Router();

import ControllerAuth from '../controllers/auth.js';

export default class RouterAuth {
    constructor() {
        this.controladorAuth = new ControllerAuth();
    }

    start() {
        // Area de acceso publico
        router.post('/registrar', [
            check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
            check('password', 'El Password debe ser mas de 6 letras').isLength({ min: 6 }),
            check('email', 'El Email no es válido').isEmail(),
            check('email').custom(emailExiste),
            validarCampos
        ], this.controladorAuth.registrarUsuario);

        router.get('/confirmar/:token', this.controladorAuth.confirmarUsuario);

        return router;
    }
};