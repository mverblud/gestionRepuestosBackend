import request from 'supertest';
import chai from 'chai';
//import faker from 'faker';

const assert = chai.assert;
const expect = chai.expect;

describe('Test API Producto', () => {

    describe('GET obtenerProductos', () => {
        it('Status 200', async () => {
            const respuesta = await request('http://localhost:7000').get('/api/productos');
            expect(respuesta.status).to.eql(200);
            expect(respuesta.body).to.include.keys('total', 'limite', 'desde', 'productos');

        });

        it('Status 200, Paginado', async () => {
            const respuesta = await request('http://localhost:7000').get('/api/productos?limite=5&desde=0');
            const { limite, productos, desde, total } = respuesta.body;
            expect(limite).to.eql('5');
            expect(desde).to.eql('0');
        //    expect(total).to.eql(20169);
            expect(productos.length).to.eql(5);
            expect(productos[0]).to.include.keys('_id', 'codigo', 'nombre', 'marcaProducto', 'marcaAuto', 'categoria', 'stock', 'precio', 'iva', 'precioIva', 'descuento', 'precioFinal', 'habilitado', 'estado', 'img', 'fechaAlta');

        });

        it('Status 200, Paginado por defecto', async () => {
            const respuesta = await request('http://localhost:7000').get('/api/productos');
            const { limite, productos } = respuesta.body;
            expect(limite).to.eql(50);
            expect(productos.length).to.eql(50);
        });

        it('Status 200, Pagina inexistente', async () => {
            const respuesta = await request('http://localhost:7000').get('/api/productos?limite=1&desde=30169');
            const { productos } = respuesta.body;
            expect(productos.length).to.eql(0);
        });
    });

    describe('GET obtenerProducto', () => {
        it('Status 200, obtener producto segun id:', async () => {

            const productoEsperado = {
                _id: "62e1d86dbb6ac178201a5de7",
                codigo: "11226-SER",
                nombre: "CHEVROLET CORSA ABRAZADERA GOMA DERECHA (P/ DIR HIDRAULICA)",
                marcaProducto: "62e1d868bb6ac178201a0eaa",
                marcaAuto: "62e1d862bb6ac178201a0d0c",
                categoria: "62e1d866bb6ac178201a0dd5",
                stock: 0,
                precio: 0,
                iva: 0,
                precioIva: 0,
                descuento: 0,
                precioFinal: 0,
                habilitado: true,
                estado: true,
                img: [],
                fechaAlta: "2022-07-28T00:29:33.164Z",
                __v: 0
            }

            const respuesta = await request('http://localhost:7000').get('/api/productos/62e1d86dbb6ac178201a5de7');
            expect(respuesta.status).to.eql(200);
            expect(respuesta.body).to.eql(productoEsperado);
            expect(respuesta.body).to.include.keys('_id', 'codigo', 'nombre', 'marcaProducto', 'marcaAuto', 'categoria', 'stock', 'precio', 'iva', 'precioIva', 'descuento', 'precioFinal', 'habilitado', 'estado', 'img', 'fechaAlta');
        });

        it('Status 400, El id no existe', async () => {

            const respuesta = await request('http://localhost:7000').get('/api/productos/62e1d86dbb6ac178201a5df8');
            expect(respuesta.status).to.eql(400);
            expect(respuesta.body).to.include.keys('errors');
            expect(respuesta.body.errors[0].msg).to.eql("El id no existe 62e1d86dbb6ac178201a5df8");
        });

        it('Status 400, No es un un ID válido', async () => {

            const respuesta = await request('http://localhost:7000').get('/api/productos/1234');
            expect(respuesta.status).to.eql(400);
            expect(respuesta.body).to.include.keys('errors');
            expect(respuesta.body.errors[0].msg).to.eql("No es un un ID válido");
        });
    });

    describe('POST guardarProducto', () => {
        it('Status 200:', async () => {

            const productoIns = {
                codigo: "PRUEBA0001",
                nombre: "Amortiguador chevrolet celta trasero",
                marcaProducto:"624da7476ba672e3a9d08467",
                marcaAuto: "6251e1955b6c9afd2cdf0a6e",
                categoria: "625335582a3d15040f3e3421",
                stock: 10,
                precio: 10,
                iva: 21,
                precioIva: 15000,
                descuento: 1214,
                precioFinal: 12124,
                habilitado: false,
                estado: false,
                img: ["1.jpg","2jpg","3jpg"],
                fechaAlta: "2022-09-28T11:34:28.148Z"
            }

            const respuesta = await request('http://localhost:7000').post('/api/productos').send(productoIns);
            expect(respuesta.status).to.eql(200);
            //expect(respuesta.body.codigo).to.eql(productoIns.codigo);
            expect(respuesta.body).to.include.keys('_id','__v', 'createdAt','updatedAt','codigo', 'nombre', 'marcaProducto', 'marcaAuto', 'categoria', 'stock', 'precio', 'iva', 'precioIva', 'descuento', 'precioFinal', 'habilitado', 'estado', 'img');
        });
    });

    describe('DELETE BorrarProducto', () => {
        it('Status 200:', async () => {
            const respuesta = await request('http://localhost:7000').delete('/api/productos/633477de6af3f5ce685d34e3');
            expect(respuesta.status).to.eql(200);
            expect(respuesta.body.acknowledged).to.eql(true);
        });
    });

});