import swagger from 'swagger-jsdoc';

// __dirname is not defined in ES module scope : Resolve
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specs = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Docs API Gestión de Repuestos',
            description: 'Encontras toda las infomación relacionada a las API existentes',
            contact: {
                name: "API Support",
                email: "marcosverblud@gmail.com"
            },
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:7000',
                description: "Development server"
            },
            {
                url: 'http://localhost:7000',
                description: "Production server"
            }
        ]
    },
    apis: [path.join(__dirname, 'routes/productos.js')]
}

const swaggerSpecs = swagger(specs);

export default swaggerSpecs;