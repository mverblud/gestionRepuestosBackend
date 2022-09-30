import express   from "express";
import dotenv    from  "dotenv";
import cors      from "cors"
import swaggerUI from 'swagger-ui-express';

import swaggerSpecs    from './swagger-spec.js';
import RouterProductos from './routes/productos.js';
import RouterAuth      from './routes/auth.js';
import conectarDB      from "./database/config.js";

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
const routerProductos = new RouterProductos();
const routerAuth      = new RouterAuth();

app.use('/api/auth'     , routerAuth.start());
app.use('/api/productos', routerProductos.start());
// Documentacion API
app.use('/api/docs'     , swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
server.on('error', error => console.log('Servidor con error', error));