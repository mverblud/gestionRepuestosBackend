import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import validarJWT from "../middlewares/validarJWT.js";
import { existeCategoria } from "../helpers/dbValidators.js"

const router = express.Router();

import ControllerCategorias from '../controllers/categorias.js';

export default class RouterCategorias {

    constructor() {
        this.controladorCategorias = new ControllerCategorias();
    }

    start() {
        router.get('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeCategoria),
            validarCampos
        ], this.controladorCategorias.obtenerCategoria);

        router.get('/', validarJWT, this.controladorCategorias.obtenerCategorias);

        router.put('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeCategoria),
            validarCampos
        ], this.controladorCategorias.actualizarCategoria);

        router.post('/', [
            validarJWT,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            validarCampos
        ], this.controladorCategorias.guardarCategoria);

        router.delete('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeCategoria),
            validarCampos
        ], this.controladorCategorias.borrarCategoria);

        return router;
    }

};