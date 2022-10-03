import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import validarJWT from "../middlewares/validarJWT.js";
import { existeProducto } from "../helpers/dbValidators.js"

/**
 * @swagger
 * components:
 *  schemas:
 *    Producto:
 *     type: object
 *     required:
 *       - codigo
 *       - nombre
 *       - marcaProducto
 *       - marcaAuto
 *       - categoria
 *     properties:
 *       _id:
 *         type: string
 *         description: Autogenerado por mongoDB (_id)
 *       codigo:
 *         type: string
 *         description: Codigo unico del producto
 *       nombre:
 *         type: string
 *         description: Nombre del producto
 *       descripcion:
 *         type: string
 *         description : descripcion del producto
 *       marcaProducto:
 *         type: string
 *         description : _id mongoDB de la marcaProducto
 *       marcaAuto:
 *         type: string
 *         description : _id mongoDB de la marcaAuto
 *       categoria:
 *         type: string
 *         description : _id mongoDB de la categoria
 *       stock:
 *         type: integer
 *         description: Stock del producto
 *       precio:
 *         type: integer
 *         description: Precio del producto
 *       iva:
 *         type: integer
 *         description: Iva del producto
 *       precioIva:
 *         type: integer
 *         description: Precio + Iva del producto
 *       descuento:
 *         type: integer
 *         description: Descuento del producto
 *       precioFinal:
 *         type: integer
 *         description: Precio + Iva - descuento del producto
 *       habilitado:
 *         type: boolean
 *         description: Producto habilitado
 *       estado:
 *         type: boolean
 *         description: Producto estado
 *       img:
 *          type : array
 *          description: Imagen del producto
 *     example:
 *       _id: 62e1d86dbb6ac178201a5de7
 *       codigo: 11226-SER
 *       nombre: CHEVROLET CORSA ABRAZADERA GOMA DERECHA (P/ DIR HIDRAULICA)
 *       marcaProducto: 62e1d868bb6ac178201a0eaa
 *       marcaAuto: 62e1d862bb6ac178201a0d0c
 *       categoria: 62e1d866bb6ac178201a0dd5
 *       stock: 0
 *       precio: 0
 *       iva: 0
 *       precioIva: 0
 *       descuento: 0
 *       precioFinal: 0
 *       habilitado: true
 *       estado: true
 *       img: [img1.jpg,img2.jpg]
 */

/**
 * @swagger  
 * /api/productos:
 *  get:
 *    description: Obtener productos , cantidad total , desde y limite 
 *    summary: Retorna todos los productos paginado.
 *    tags: [Producto]
 *    parameters:
 *    - name: desde
 *      in: query
 *      description: number of items to skip
 *      schema: 
 *        type: integer
 *    - name: limite
 *      in: query
 *      description: max records to return
 *      schema: 
 *        type: integer
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
 *                desde:
 *                  description : numeros de item to skip
 *                  type : integer
 *                limite:
 *                  description : maxima cantidad de registros devueltos
 *                  type : integer
 *                productos:
 *                  type: array
 *                  items:
 *                     $ref: "#/components/schemas/Producto"             
 */

/**
 * @swagger  
 * /api/productos/(id):
 *  get:
 *    description: Obtener todas las caracteristicas del producto por id
 *    summary: Obtener producto por su id.
 *    tags: [Producto]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: _id mongoDB del producto a buscar
 *      required: true
 *      schema: 
 *        type: string
 *    responses:
 *      '200':
 *        description: Detalle del producto.
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Producto"             
 */

/**
 * @swagger  
 * /api/productos:
 *  post:
 *    description: Crear un nuevo producto.
 *    summary: Crear un nuevo producto.
 *    tags: [Producto]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Producto"  
 *    responses:
 *      '201':
 *        description: Detalle del producto.
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Producto"             
 */

/**
 * @swagger  
 * /api/productos/(id):
 *  delete:
 *    description: Eliminar producto por su id.
 *    summary: Eliminar producto por su id.
 *    tags: [Producto]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: _id mongoDB del producto a eliminar
 *      required: true
 *      schema: 
 *        type: string
 *    responses:
 *      '200':
 *        description: Producto Eliminado.
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Producto"             
 */

/**
 * @swagger  
 * /api/productos/(id):
 *  put:
 *    description: Modificar producto por su id.
 *    summary: Modificar producto por su id.
 *    tags: [Producto]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: _id mongoDB del producto a Modificar
 *      required: true
 *      schema: 
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Producto" 
 *    responses:
 *      '200':
 *        description: Producto Modificado.
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Producto"             
 */

const router = express.Router();

import ControllerProductos from '../controllers/productos.js';

export default class RouterProductos {

    constructor() {
        this.controladorProductos = new ControllerProductos();
    }

    start() {
        router.get('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.obtenerProducto);

        router.get('/', validarJWT, this.controladorProductos.obtenerProductos);

        router.put('/:id', [
            validarJWT,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.actualizarProducto);

        router.post('/', [
            validarJWT,
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
            validarJWT,
            //    esAdminRole,
            check('id', 'No es un un ID válido').isMongoId(),
            check('id').custom(existeProducto),
            validarCampos
        ], this.controladorProductos.borrarProducto);

        return router;
    }

};