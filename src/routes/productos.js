import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import { existeProducto } from "../helpers/dbValidators.js"

/**
 * @swagger
 * components:
 *  schemas:
 *    Producto:
 *     type: object
 *     required:
 *       - _id
 *       - nombre
 *       - precio
 *     properties:
 *       _id:
 *         type: string
 *         description: Autogenerado por moongoDB _id
 *       nombre:
 *         type: string
 *         description: Nombre del producto
 *       precio:
 *         type: integer
 *         description: Precio del producto
 *       img:
 *          type : array
 *          description: Imagen del producto
 *     example:
 *       _id: 62e1d86dbb6ac178201a5de7
 *       nombre: CHEVROLET CORSA ABRAZADERA GOMA DERECHA (P/ DIR HIDRAULICA)
 *       precio: 10000.23
 *       img: https://imagen/producto.jpg
 */

/**
 * @swagger  
 * /api/productos:
 *  get:
 *    description: Retorna todos los productos,
 *    summary: Retorna todos los productos
 *    tags: [Producto]
 *    responses:
 *      '200':
 *        description: Una lista de productos.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                total:
 *                  description : Cantidad total de productos
 *                  type : integer
 *                productos:
 *                  type: array
 *                  items:
 *                     $ref: "#/components/schemas/Producto"
 *                  
 */

const router = express.Router();

import ControllerProductos from '../controllers/productos.js';

export default class RouterProductos {

    constructor() {
        this.controladorProductos = new ControllerProductos();
    }

    start() {
        router.get('/:id', [
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.obtenerProducto);

        router.get('/', this.controladorProductos.obtenerProductos);

        router.put('/:id', [
            //    validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.actualizarProducto);

        router.post('/', [
            //    validarJWT,
            check('codigo', 'El codigo es obligatorio').not().isEmpty(),
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('marcaProducto', 'La marca producto es obligatorio').not().isEmpty(),
            check('marcaProducto', 'No es un un ID válido').isMongoId(),
            //    check('marcaProducto').custom(existeMarcaProducto),
            check('marcaAuto', 'La marca auto es obligatorio').not().isEmpty(),
            check('marcaAuto', 'No es un un ID válido').isMongoId(),
            //    check('marcaAuto').custom(existeMarcaAuto),
            check('categoria', 'La categoria es obligatorio').not().isEmpty(),
            check('categoria', 'No es un un ID válido').isMongoId(),
            //    check('categoria').custom(existeCategoria),
            validarCampos
        ], this.controladorProductos.guardarProducto);

        router.delete('/:id', [
            //    validarJWT,
            //    esAdminRole,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.borrarProducto);

        return router;
    }

};