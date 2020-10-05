"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = __importDefault(require("../../network/response"));
const store_login_1 = __importDefault(require("./store-login"));
const store_usuarios_1 = __importDefault(require("../usuarios/store-usuarios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { comprobar } = require("../util/util-login");
const { config } = require("../../config/index");
class Login {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    validar_vida_token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("validando el tiempo de vida del token, TOKEN ACTIVO");
            try {
                const myUser = yield store_usuarios_1.default.consulta_usuario(res.locals.datos_user.id_user);
                myUser[0].admin = res.locals.datos_user.admin;
                response_1.default.success(req, res, { myUser }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en pedir datos unico user, life token");
            }
        });
    }
    autenticar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body || null;
            const validar = yield store_login_1.default.validar_credenciales(email);
            if (validar.length !== 0) {
                if (yield bcryptjs_1.default.compare(password, validar[0].password)) {
                    let save = {
                        id_user: validar[0].id_user,
                        status: validar[0].status,
                        admin: email === 'administrador@gmail.com' ? true : false,
                    };
                    const token = jsonwebtoken_1.default.sign(save, config.jwtSecret);
                    response_1.default.success(req, res, { token: token }, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: "Los Datos que ingreso son incorrectos" }, 200);
                }
            }
            else {
                response_1.default.success(req, res, { feeback: "Los Datos que ingreso son incorrectos" }, 200);
            }
        });
    }
    ruta() {
        // LOGIN
        this.router.post("/vida-token", comprobar, this.validar_vida_token);
        this.router.post("/autenticacion", this.autenticar);
    }
}
let login = new Login();
exports.default = login.router;
