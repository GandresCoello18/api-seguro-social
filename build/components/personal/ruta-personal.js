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
const store_personal_1 = __importDefault(require("./store-personal"));
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
class Personal {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_personal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellido, cargo, imagen } = req.body || null;
            const personal = {
                nombres,
                apellido,
                cargo,
                imagen,
            };
            try {
                const resPersonal = yield store_personal_1.default.insertar_personal(personal);
                response_1.default.success(req, res, resPersonal, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear usuario');
            }
        });
    }
    obtener_personal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personal = yield store_personal_1.default.consulta_personal();
                response_1.default.success(req, res, personal, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en obtener personal");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_personal);
        this.router.post("/", comprobar, this.crear_personal);
    }
}
let user = new Personal();
exports.default = user.router;
