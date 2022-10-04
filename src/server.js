import express   from "express";
import dotenv    from  "dotenv";
import cors      from "cors"
import swaggerUI from 'swagger-ui-express';

import swaggerSpecs     from './swagger-spec.js';
import conectarDB       from "./database/config.js";
import RouterAuth       from './routes/auth.js';
import RouterCategorias from './routes/categorias.js';
import RouterProductos  from './routes/productos.js';


// Server
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routerAuth       = new RouterAuth();
const routerCategorias = new RouterCategorias();
const routerProductos  = new RouterProductos();

app.use('/api/auth'      , routerAuth.start());
app.use('/api/categorias', routerCategorias.start());
app.use('/api/productos' , routerProductos.start());

// Documentacion API
app.use('/api/docs', swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
server.on('error', error => console.log('Servidor con error', error));