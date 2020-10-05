"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// puntos de entrada
const rutas_1 = __importDefault(require("./network/rutas"));
const ruta_usuarios_1 = __importDefault(require("./components/usuarios/ruta-usuarios"));
const ruta_login_1 = __importDefault(require("./components/login/ruta-login"));
const ruta_personal_1 = __importDefault(require("./components/personal/ruta-personal"));
const ruta_contactos_1 = __importDefault(require("./components/contatos/ruta-contactos"));
const ruta_pagos_1 = __importDefault(require("./components/pagos/ruta-pagos"));
const { config } = require("./config/index");
const logger_1 = require("./components/util/logger");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", config.port);
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default({
            origin: [
                "https://seguro-social.vercel.app",
                "http://localhost:3000",
            ],
        }));
        this.app.use(express_pino_logger_1.default({ logger: logger_1.logger }));
        this.app.use(cookie_parser_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use("/static", express_1.default.static("public"));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // peticiones de datos con api rest
        this.app.use("/api", rutas_1.default);
        this.app.use("/api/usuario", ruta_usuarios_1.default);
        this.app.use("/api/login", ruta_login_1.default);
        this.app.use("/api/personal", ruta_personal_1.default);
        this.app.use("/api/contacto", ruta_contactos_1.default);
        this.app.use("/api/pagos", ruta_pagos_1.default);
        // se ejecuta si no encuentra la ruta
        this.app.get("*", function (req, res) {
            res.send('RUTA NO EXISTENTE');
        });
    }
    start() {
        this.app.listen(this.app.get("port"), () => console.log("RUN SERVER NODE..."));
    }
}
const server = new Server();
server.start();
