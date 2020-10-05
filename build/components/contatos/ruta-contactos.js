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
const store_contactos_1 = __importDefault(require("./store-contactos"));
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
class Contacto {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_contacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, tema, mensaje, correo } = req.body || null;
            const contacto = {
                nombre,
                tema,
                mensaje,
                correo,
            };
            try {
                const resContacto = yield store_contactos_1.default.insertar_contacto(contacto);
                response_1.default.success(req, res, resContacto, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear contacto');
            }
        });
    }
    obtener_contactos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacto = yield store_contactos_1.default.consulta_contacto();
                response_1.default.success(req, res, contacto, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en obtener personal");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_contactos);
        this.router.post("/", this.crear_contacto);
    }
}
let store = new Contacto();
exports.default = store.router;
