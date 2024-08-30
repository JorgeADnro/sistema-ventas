import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import SwaggerUi from "swagger-ui-express";
import swaggerDocs from "./routes/api.docs";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import usuarioRouter from "./routes/usuario.router";
import rolesRouter from "./routes/roles.router";
import generalRoutes from "./routes/general.routes";

class Server {
    // * Crear la instancia global de nuestra aplicación
    public app: Application;

    // ? Generar el constructor
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // * Generar un método para la configuración
    private config(): void {

        // * Configuración del puerto para el server.
        this.app.set('port', process.env.PORT || 3000);

        // * Mostrar las peticiones en consola
        this.app.use(morgan("dev"));

        // * Uso de CORS(Cross Origin)
        this.app.use(cors());

        // * Generar restricciones a la API
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            console.log(`Incoming request: ${req.method} ${req.url}`);
            next();
        });
    }

    

    // TODO: Generar un método para la configuración de rutas
    private routes(): void {
    this.app.use("/api/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
    this.app.use("/api", indexRoutes);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", usuarioRouter);
    this.app.use("/api/general", generalRoutes);
    this.app.use("/api/roles", rolesRouter);
}

// * Generar un método para inicializar el servicio
start(): void {
    this.app.listen(this.app.get('port'), () => {
        console.log('Server on port ', this.app.get('port'));
    });
}

}

const server = new Server();
server.start();
