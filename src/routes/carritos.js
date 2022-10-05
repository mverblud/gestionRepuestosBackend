import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import validarJWT from "../middlewares/validarJWT.js";
import { verificarProductos, existeCarrito } from "../helpers/dbValidators.js"

const router = express.Router();

import ControllerCarritos from '../controllers/carritos.js';

export default class RouterCarrito {

    constructor() {
        this.controladorCarrito = new ControllerCarritos();
    }

    start() {

        router.get('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeCarrito),
            validarCampos
        ], this.controladorCarrito.obtenerCarrito);

        router.get('/', validarJWT, this.controladorCarrito.obtenerCarritosUser);

        router.put('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeCarrito),
            validarCampos
        ], this.controladorCarrito.actualizarCarrito);

        router.post('/', [
            validarJWT,
            check('productos', 'El productos es obligatorio').not().isEmpty(),
            check('productos').custom(verificarProductos),
            validarCampos
        ], this.controladorCarrito.guardarCarrito);

        return router;
    }

};