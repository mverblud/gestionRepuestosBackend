import express   from "express";
import dotenv    from  "dotenv";
import cors      from "cors";
import swaggerUI from 'swagger-ui-express';
import path      from 'path';
import { fileURLToPath } from 'url';

import swaggerSpecs     from './swagger-spec.js';
import conectarDB       from "./database/config.js";
import RouterAuth       from './routes/auth.js';
import RouterCarritos   from './routes/carritos.js';
import RouterCategorias from './routes/categorias.js';
import RouterProductos  from './routes/productos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

// Routes
const routerAuth       = new RouterAuth();
const routerCarritos   = new RouterCarritos();
const routerCategorias = new RouterCategorias();
const routerProductos  = new RouterProductos();

app.use('/api/auth'      , routerAuth.start());
app.use('/api/carritos'  , routerCarritos.start());
app.use('/api/categorias', routerCategorias.start());
app.use('/api/productos' , routerProductos.start());

// Documentacion API
app.use('/api/docs', swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
server.on('error', error => console.log('Servidor con error', error));